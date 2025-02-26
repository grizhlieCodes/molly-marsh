import { CAL_WEBHOOK_SECRET, INTERNAL_API_KEY } from '$env/static/private';
import { json, error } from '@sveltejs/kit';
import { parse } from 'path';
import { verifyCalWebhook, handleCalEvent } from '$lib/integrations/cal';


export const POST: RequestHandler = async (event) => {
	const signature = event.request.headers.get('x-cal-signature-256');
	const webhookSecret = CAL_WEBHOOK_SECRET;

	if (!signature) {
		throw error(401, 'Missing signature header');
	}

	if (!webhookSecret) {
		throw error(500, 'Webhook secret not configured');
	}

	try {
		const rawBody = await event.request.text();

		const isValid = verifyCalWebhook(rawBody, signature);

		if (!isValid) {
			console.error('Invalid signature');
			throw error(401, 'Invalid signature');
		}

		const data = JSON.parse(rawBody);

		const handlerResponse = await handleCalEvent(data, event);

		return json({ status: 'success', data: handlerResponse });
	} catch (err) {
		console.error('Error processing webhook:', err);
    
		if (err.status) {
		  // If it's already a SvelteKit error with status, rethrow it
		  throw err;
		}
		
		throw error(500, err.message || 'Internal server error');
	}
};
