import { redirect, error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { handleStripeEvent, verifyStripeWebhook } from '$lib/integrations/stripe';
import * as Sentry from '@sentry/sveltekit';

export const POST: RequestHandler = async (event) => {
	const body = await event.request.text(); // ✅
	const signature = event.request.headers.get('stripe-signature'); // ✅

	if (!signature) {
		Sentry.captureMessage('Missing Stripe signature', {
			level: 'error',
			tags: {
				endpoint: 'stripe-webhook',
				url: event.url.href
			},
			extra: {
				requestHeaders: Object.fromEntries(event.request.headers)
			}
		});
		throw error(400, 'Missing Stripe signature');
	}

	try {
		const stripeEvent = verifyStripeWebhook(body, signature);
		const result = await handleStripeEvent(stripeEvent, event);
		return json({ received: true, ...result });
	} catch (err) {
		// Log detailed error to Sentry with context
		Sentry.captureException(err, {
			tags: {
				endpoint: 'stripe-webhook',
				url: event.url.href,
				eventType: body && JSON.parse(body)?.type
			},
			extra: {
				requestHeaders: Object.fromEntries(event.request.headers),
				error: err.message,
				stack: err.stack,
				eventId: body && JSON.parse(body)?.id
			}
		});

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
