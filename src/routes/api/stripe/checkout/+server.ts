import { handleCheckout } from '$lib/integrations/stripe';
import { stripeCheckoutInputSchema } from '$lib/integrations/stripe/schemas';

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
		// Error handling
		console.error('Checkout error:', err);

		return new Response(
			JSON.stringify({
				error: err.message || 'An unexpected error occurred',
				details: process.env.NODE_ENV === 'development' ? err.stack : undefined
			}),
			{
				status: 400,
				headers: { 'content-type': 'application/json' }
			}
		);
	}
}
