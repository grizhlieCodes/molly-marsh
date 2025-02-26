import { redirect, error, json } from '@sveltejs/kit';
import Stripe from 'stripe';
import { STRIPE_SECRET_KEY, STRIPE_SIGNGING_SECRET, INTERNAL_API_KEY } from '$env/static/private';
import { updateCustomerNameIfMissing } from '$lib/stripe/stripe';
import { sendSuccessfulCheckoutSessionConfirmationEmail } from '$lib/email/serverEmailHandler.js';
import { z } from 'zod';

let stripeSessionSchema = z
	.object({
		id: z.string().min(1),
		customer: z.object({
			id: z.string(),
			email: z.string().email().nullable().optional(),
			name: z.string().nullable().optional()
		}),
		customer_details: z.object({
			name: z.string(),
			email: z.string().email()
		}),
		invoice: z.object({
			id: z.string(),
			number: z.string(),
			hosted_invoice_url: z.string().url(),
			created: z.number()
		}),
		line_items: z.object({
			data: z.array(
				z.object({
					amount_total: z.number(),
					description: z.string(),
					price: z.object({
						product: z.object({
							metadata: z.object({
								notion_name: z.string()
							})
						})
					})
				})
			)
		})
	})
	.transform((data) => ({
		session_id: data.id,
		session_customer_name: data.customer_details.name,
		session_customer_email: data.customer_details.email,
		customer_id: data.customer.id,
		customer_email: data.customer.email,
		customer_name: data.customer.name,
		invoice_id: data.invoice.id,
		invoice_url: data.invoice.hosted_invoice_url,
		invoice_number: data.invoice.number,
		invoice_date: new Date(data.invoice.created * 1000).toISOString(),
		item_amount_total: data.line_items.data[0].amount_total,
		item_description: data.line_items.data[0].description,
		item_notion_name: data.line_items.data[0].price.product.metadata.notion_name
	}));

// Input type
type StripeSession = z.infer<typeof stripeSessionSchema>;

// Output type (after transform)
type TransformedStripeSession = z.output<typeof stripeSessionSchema>;

const stripe = new Stripe(STRIPE_SECRET_KEY, {
	apiVersion: '2024-11-20.acacia'
});

const successfulCheckoutNotionHandler = async (stripeData, event) => {
    try {
        const notionResponse = await event.fetch('/api/notion/notion-handler', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${INTERNAL_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({triggerEvent: "CHECKOUT_SESSION_COMPLETE" ,...stripeData})
        });

        if (!notionResponse.ok) {
            throw new Error(`HTTP ERROR at notionResponse! Status:  ${notionResponse.status}`);
        }

        const result = await notionResponse.json();

        return result;
    } catch (err) {
        console.error('Error during sending data to notion in cal handler api:', err);
        throw err;
    }
}

export async function POST(event) {
	const body = await event.request.text();
	const signature = event.request.headers.get('stripe-signature');

	try {
		const stripeEvent = stripe.webhooks.constructEvent(body, signature, STRIPE_SIGNGING_SECRET);

		if (stripeEvent.type !== 'checkout.session.completed') {
			return json({
				received: true,
				message: 'Event type not handled (correctly)'
			});
		}

		const sessionData = stripeEvent.data.object;

		if (!sessionData) {
			throw error(400, 'No session data in webhook');
		}

		if (!sessionData.customer) {
			throw error(400, 'No customer in session');
		}

		const expandedSessionData = await stripe.checkout.sessions.retrieve(sessionData.id, {
			expand: ['payment_intent', 'invoice', 'customer', 'line_items', 'line_items.data.price.product']
		});

		const finalSessionData = stripeSessionSchema.parse(expandedSessionData);

		const customerData = await updateCustomerNameIfMissing(stripe, finalSessionData.customer_id, finalSessionData.session_customer_name);

        console.log(finalSessionData)

		if (!customerData?.customer?.email || !customerData?.customer?.name) {
			throw error(400, 'Missing required customer data');
		}

        const notionResponse = await successfulCheckoutNotionHandler(finalSessionData, event);

        // console.log("Notion response: ", notionResponse)
		if (!notionResponse.ok) {
			throw error(400, `HTTP ERROR at stripe checkout notionResponse! Status:  ${notionResponse.status}`);
		}

		await sendSuccessfulCheckoutSessionConfirmationEmail({
			customer_name: customerData.customer.name,
			customer_email: customerData.customer.email
		});
		return json({ received: true, message: 'Webhook processed successfully' });
	} catch (err) {
		// If it's already a SvelteKit error, rethrow it
		if (err.status) {
			throw err;
		}

		// For Stripe signature verification errors
		if (err.message.includes('No signatures found')) {
			throw error(400, 'Invalid webhook signature');
		}

		// For unexpected errors
		console.error('Webhook Error:', err);
		throw error(500, 'Internal server error processing webhook');
	}
}
