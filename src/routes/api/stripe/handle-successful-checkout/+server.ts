import { json } from '@sveltejs/kit';
import { handleSuccessfulCheckout } from '$lib/integrations/stripe';

export async function POST(event) {
	const body = await event.request.text();
	const signature = event.request.headers.get('stripe-signature');
	
	// Use the refactored handler to process the webhook
	return await handleSuccessfulCheckout(body, signature, event.fetch);
}
