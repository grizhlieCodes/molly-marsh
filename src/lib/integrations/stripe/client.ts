import Stripe from 'stripe';
import { STRIPE_SECRET_KEY, STRIPE_SB_SECRET_KEY } from '$env/static/private';
import { dev } from '$app/environment';

/**
 * Creates and returns a configured Stripe client
 * @returns A configured Stripe client instance
 * @throws Error if no valid API key is available
 */
export function setupStripeClient() {
	// Use sandbox key in development, production key in production
	const secretKey = dev ? STRIPE_SB_SECRET_KEY : STRIPE_SECRET_KEY;
	
	// Validate that we have a secret key
	if (!secretKey || secretKey.trim() === '') {
		throw new Error(
			`Missing Stripe secret key. ${dev 
				? 'Make sure STRIPE_SB_SECRET_KEY is defined in your .env file.' 
				: 'Make sure STRIPE_SECRET_KEY is defined in your .env file.'}`
		);
	}
	
	// Log the environment mode for easier debugging
	if (dev) {
		console.log('🧪 Using Stripe SANDBOX environment');
	} else {
		console.log('🚀 Using Stripe PRODUCTION environment');
	}
	
	try {
		return new Stripe(secretKey, {
			apiVersion: '2024-11-20.acacia'
		});
	} catch (error) {
		console.error('Error initializing Stripe client:', error);
		throw new Error(`Failed to initialize Stripe client: ${error.message}`);
	}
}

// Create a singleton instance for reuse
let stripeClient: Stripe | null = null;

/**
 * Gets a Stripe client instance (creates one if it doesn't exist)
 * @returns A configured Stripe client instance
 * @throws Error if client initialization fails
 */
export function getStripeClient() {
	if (!stripeClient) {
		try {
			stripeClient = setupStripeClient();
		} catch (error) {
			console.error('Error getting Stripe client:', error);
			throw error; // Re-throw to allow proper error handling upstream
		}
	}
	return stripeClient;
}

/**
 * Returns true if the app is using sandbox environment
 */
export function isUsingSandbox(): boolean {
	return dev;
}
