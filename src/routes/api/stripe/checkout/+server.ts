import { handleCheckout } from '$lib/integrations/stripe';
import { stripeCheckoutInputSchema } from '$lib/integrations/stripe';

export async function POST({ request }) {
	try {
		// Third safety net: handle request parsing errors
		const data = await request.json().catch(() => {
			throw new Error('Invalid JSON in request body');
		});

		const { priceId, email } = stripeCheckoutInputSchema.parse(data);
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
