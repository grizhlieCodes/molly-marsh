import Stripe from 'stripe';
import type { RequestEvent } from '@sveltejs/kit';
import { INTERNAL_API_KEY } from '$env/static/private';
import { retrieveCheckoutSession, stripeSuccessfulSessionSchema, updateCustomerNameIfMissing } from '$lib/integrations/stripe';
import { updateCustomerNameIfMissing } from './customers';
import { sendSuccessfulCheckoutSessionConfirmationEmail } from '$lib/email/serverEmailHandler';
import { json, error } from '@sveltejs/kit';

export async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session, event: RequestEvent) {
	try {
		if (!session.customer) {
			throw error(400, 'No customer in session');
		}
		const expandedSessionData = await retrieveCheckoutSession(session.id);
		const finalSessionData = stripeSuccessfulSessionSchema.parse(expandedSessionData);
		const customerData = await updateCustomerNameIfMissing(finalSessionData.customer_id, finalSessionData.session_customer_name);

		if (!customerData?.customer?.email || !customerData?.customer?.name) {
			throw error(400, 'Missing required customer data');
		}

		const notionResponse = await event.fetch('/api/notion/notion-handler', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${INTERNAL_API_KEY}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				triggerEvent: 'CHECKOUT_SESSION_COMPLETE',
				...finalSessionData
			})
		});

		if (!notionResponse.ok) {
			throw error(400, `HTTP ERROR at stripe checkout notionResponse! Status: ${notionResponse.status}`);
		}

		await sendSuccessfulCheckoutSessionConfirmationEmail({
			customer_name: customerData.customer.name,
			customer_email: customerData.customer.email
		});
		return json({ received: true, message: 'Checkout session completed successfully', customer: customerData.customer });
	} catch (err) {
		console.error('Checkout session completion error:', err);

		// If it's already a SvelteKit error, rethrow it
		if (err.status) {
			throw err;
		}

		throw error(500, `Error processing checkout session: ${err.message}`);
	}
}

/**
 * Route webhook events to the appropriate handler
 * @param stripeEvent The verified Stripe event
 * @param event The SvelteKit request event
 * @returns Result from the appropriate handler
 */
export async function handleStripeEvent(stripeEvent: Stripe.Event, event: RequestEvent) {
	switch (stripeEvent.type) {
		case 'checkout.session.completed':
			return await handleCheckoutSessionCompleted(stripeEvent.data.object as Stripe.Checkout.Session, event);

		// Add more event handlers as needed

		default:
			return {
				received: true,
				message: `Event type ${stripeEvent.type} was received but not processed`
			};
	}
}
