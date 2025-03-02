import { redirect, error } from '@sveltejs/kit';
import { findCustomerByEmail, stripeSuccessfulSessionSchema } from '$lib/integrations/stripe';
import { getStripeClient } from './client';
import type Stripe from 'stripe';
/**
 * Create a Stripe checkout session
 * @param priceId Stripe price ID
 * @param origin Website origin for success/cancel URLs
 * @param customerId Stripe customer ID
 * @returns Created checkout session
 */

export async function createCheckoutSession(priceId: string, origin: string, customerId: string): Promise<Stripe.Checkout.Session> {
	// First safety net: validate inputs before even trying Stripe
	const stripe = getStripeClient();

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
			cancel_url: `${origin}`,
			invoice_creation: {
				enabled: true
			}
		});
	} catch (err) {
		console.error('Failed to create Stripe session:', err);
		throw new Error(`Failed to create Stripe session: ${err.message}`);
	}
}

/**
 * Handle a checkout request
 * @param priceId Checkout input data (priceId and email)
 * @param email Email address of the new or existing customer
 * @param origin Website origin
 * @returns Checkout session with URL
 */

export async function handleCheckout(priceId: string, email: string, origin: string): Promise<{ url: string }> {
	// Find or create customer
	let customer = await findCustomerByEmail(email);
	if (!customer) {
		customer = await createCustomer(email);
	}

	// Create checkout session with customer ID
	return await createCheckoutSession(priceId, origin, customer.id);
}

export async function retrieveCheckoutSession(sessionId: string): Promise<Stripe.Checkout.Session> {
	const stripe = getStripeClient();

	try {
		const sess = await stripe.checkout.sessions.retrieve(sessionId, {
			expand: ['payment_intent', 'invoice', 'customer', 'line_items', 'line_items.data.price.product', 'payment_intent.latest_charge']
		});
		// console.log("sess: ", sess)
		return sess;
	} catch (err) {
		console.error('Failed to retrieve checkout session:', err);
		throw new Error(`Failed to retrieve checkout session: ${err.message}`);
	}
}

/**
 * Wait for session data to be fully available
 * This is useful because sometimes the session data isn't immediately available after checkout
 * @param sessionId Stripe session ID
 * @param maxAttempts Maximum number of attempts to retrieve data
 * @param delayMs Delay between attempts in milliseconds
 * @returns Complete session data
 */

export async function waitForSessionData(sessionId: string, maxAttempts = 5, delayMs = 750) {
	let attempts = 0;
	let lastError = null;

	while (attempts < maxAttempts) {
		try {
			console.log('sessionId: ', sessionId);
			const session = await retrieveCheckoutSession(sessionId);
			const parsedSession = stripeSuccessfulSessionSchema.parse(session);
			console.log('We got the parsed session ', parsedSession);

			if (parsedSession.invoice_id && parsedSession?.products?.data?.length > 0 && parsedSession.session_customer_name) {
				return parsedSession;
			}

			// console.log(`Attempt ${attempts + 1}/${maxAttempts}: Waiting for complete session data...`);
		} catch (err) {
			console.error(`Attempt ${attempts + 1}/${maxAttempts} failed:`, err);
			lastError = err;
		}

		await new Promise((resolve) => setTimeout(resolve, delayMs));
		attempts++;
	}

	throw error(500, {
		message: `Failed to retrieve complete session data after ${maxAttempts} attempts. ${lastError ? `Last error: ${lastError.message}` : ''}`
	});
}
