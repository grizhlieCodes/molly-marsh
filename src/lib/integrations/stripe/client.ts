import Stripe from 'stripe';
import { STRIPE_SECRET_KEY, STRIPE_SB_SECRET_KEY } from '$env/static/private';
import { dev } from '$app/environment';

/**
 * Creates and returns a configured Stripe client
 * @returns A configured Stripe client instance
 */
export function setupStripeClient() {
	const secretKey = dev ? STRIPE_SB_SECRET_KEY : STRIPE_SECRET_KEY;
	return new Stripe(secretKey, {
		apiVersion: '2024-11-20.acacia'
	});
}

// Create a singleton instance for reuse
let stripeClient: Stripe | null = null;

/**
 * Gets a Stripe client instance (creates one if it doesn't exist)
 * @returns A configured Stripe client instance
 */
export function getStripeClient() {
	if (!stripeClient) {
		stripeClient = setupStripeClient();
	}
	return stripeClient;
}
