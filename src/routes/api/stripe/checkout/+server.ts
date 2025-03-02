import { handleCheckout, isUsingSandbox } from '$lib/integrations/stripe';
import { stripeCheckoutInputSchema } from '$lib/integrations/stripe/schemas';
import { dev } from '$app/environment';

export async function POST({ request }) {
	try {
		// Parse and validate request
		const data = await request.json().catch(() => {
			throw new Error('Invalid JSON in request body');
		});

		// Validate input data
		const input = stripeCheckoutInputSchema.parse(data);
		
		// Get origin for success/cancel redirects
		const origin = request.headers.get('origin');
		if (!origin) {
			throw new Error('Origin header is required');
		}

		// Create checkout session
		const session = await handleCheckout(input, origin);

		// Return session URL to client
		return new Response(JSON.stringify({ url: session.url }), {
			headers: { 'content-type': 'application/json' }
		});
	} catch (err) {
		// Detailed error logging in development
		if (dev) {
			console.error('Checkout error details:', err);
		} else {
			console.error('Checkout error:', err.message);
		}

		// Check for specific error types
		let errorMessage = 'An unexpected error occurred';
		let statusCode = 400;
		
		if (err.message.includes('Missing Stripe secret key')) {
			errorMessage = isUsingSandbox() 
				? 'Stripe sandbox configuration is missing. Please check your environment variables.'
				: 'Stripe configuration is missing. Please check your environment variables.';
		} else if (err.message.includes('apiKey')) {
			errorMessage = 'Stripe API key configuration error. Please check your environment setup.';
		} else if (err.message.includes('Invalid JSON')) {
			errorMessage = 'Invalid request format. Please check your input data.';
		} else if (err.name === 'ZodError') {
			errorMessage = 'Invalid input data: ' + err.errors?.[0]?.message || 'Validation failed';
		} else {
			// Use the actual error message if it exists
			errorMessage = err.message || errorMessage;
		}

		return new Response(
			JSON.stringify({
				error: errorMessage,
				details: dev ? err.stack : undefined,
				environment: isUsingSandbox() ? 'sandbox' : 'production'
			}),
			{
				status: statusCode,
				headers: { 'content-type': 'application/json' }
			}
		);
	}
}
