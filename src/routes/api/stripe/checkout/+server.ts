import Stripe from 'stripe';
import { redirect } from '@sveltejs/kit';
import { STRIPE_SECRET_KEY } from '$env/static/private';

// console.log('SECRET KEY HERE ==================', STRIPE_SECRET_KEY);

const stripe = new Stripe(STRIPE_SECRET_KEY, {
	apiVersion: '2024-11-20.acacia'
});

// Find existing Stripe customer by email
async function findCustomerByEmail(email: string) {
	try {
		const customers = await stripe.customers.list({ email });
		return customers.data.length > 0 ? customers.data[0] : null;
	} catch (err) {
		throw new Error(`Failed to find customer: ${err.message}`);
	}
}

// Create new Stripe customer
async function createCustomer(email: string) {
	try {
		const newCustomer = await stripe.customers.create({ email });
		// console.log('Created new Customer: ', newCustomer);
		return newCustomer;
	} catch (err) {
		throw new Error(`Failed to create customer: ${err.message}`);
	}
}

async function createCheckoutSession(priceId: string, origin: string, customerId: string) {
	// First safety net: validate inputs before even trying Stripe
	if (!priceId || !origin) {
		throw new Error('Missing required parameters: priceId and origin are required');
	}

	try {
		// Second safety net: handle Stripe-specific errors
		return await stripe.checkout.sessions.create({
			customer: customerId,
			line_items: [
				{
					price: priceId,
					quantity: 1
				}
			],
			mode: 'payment',
			success_url: `${origin}/successful-purchase?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${origin}/cancel`,
			invoice_creation: {
				enabled: true
			}
		});
	} catch (err) {
		// Enhance the error with more context
		throw new Error(`Failed to create Stripe session: ${err.message}`);
	}
}

// Main checkout handler that manages customer creation/lookup
async function handleCheckout(priceId: string, email: string, origin: string) {
	// Find or create customer
	let customer = await findCustomerByEmail(email);
	if (!customer) {
		customer = await createCustomer(email);
	}

	// Create checkout session with customer ID
	return await createCheckoutSession(priceId, origin, customer.id);
}

export async function POST({ request }) {
	try {
		// Third safety net: handle request parsing errors
		const data = await request.json().catch(() => {
			throw new Error('Invalid JSON in request body');
		});

		const { priceId, email } = data;
		// console.log({ priceId, email });

		if (!priceId || !email) {
			throw new Error('priceId and Email are required');
		}

		const origin = request.headers.get('origin');
		if (!origin) {
			throw new Error('Origin header is required');
		}

		// Fourth safety net: handle checkout session creation
		const session = await handleCheckout(priceId, email, origin);

		// If we get here, everything worked!
		return new Response(JSON.stringify({ url: session.url }), {
			headers: { 'content-type': 'application/json' }
		});
	} catch (err) {
		// Final safety net: convert all errors to proper HTTP responses
		console.error('Checkout error:', err);

		return new Response(
			JSON.stringify({
				error: err.message || 'An unexpected error occurred',
				// Don't expose internal error details in production!
				details: process.env.NODE_ENV === 'development' ? err.stack : undefined
			}),
			{
				status: 400,
				headers: { 'content-type': 'application/json' }
			}
		);
	}
}
