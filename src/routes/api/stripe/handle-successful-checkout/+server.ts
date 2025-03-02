import { redirect, error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { handleStripeEvent, verifyStripeWebhook } from '$lib/integrations/stripe';

export const POST: RequestHandler = async (event) => {
	const body = await event.request.text(); // ✅
	const signature = event.request.headers.get('stripe-signature'); // ✅

	if (!signature) {
		throw error(400, 'Missing Stripe signature');
	}

	try {
		const stripeEvent = verifyStripeWebhook(body, signature);
		const result = await handleStripeEvent(stripeEvent, event);
		return json({ received: true, ...result });
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
};
