import type Stripe from 'stripe';
import { getStripeClient } from '$lib/integrations/stripe';
import { dev } from '$app/environment';
import { STRIPE_SB_SIGNING_SECRET, STRIPE_SIGNING_SECRET } from '$env/static/private';

/**
 * Verify a Stripe webhook signature
 * @param body Raw webhook request body as a string
 * @param signature Stripe signature from headers
 * @returns Constructed Stripe event if signature is valid
 */

export function verifyStripeWebhook(body: string, signature: string): Stripe.Event {
	const stripe = getStripeClient();
	const stripeSigningSecret = dev ? STRIPE_SB_SIGNING_SECRET : STRIPE_SIGNING_SECRET;
	try {
		return stripe.webhooks.constructEvent(body, signature, stripeSigningSecret);
	} catch (err) {
		console.error('Webhook signature verification error:', err);
		throw new Error(`Webhook signature verification failed: ${err.message}`);
	}
}
