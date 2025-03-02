import { redirect, error } from '@sveltejs/kit';
import { waitForSessionData } from '$lib/integrations/stripe';

export async function load(event) {
	const sessionId = event.url.searchParams.get('session_id');

	if (!sessionId) {
		throw redirect(307, '/404');
	}

	const url = event.url.pathname;

	try {
		console.log('trying to get the session now: ', sessionId);
		const sessionData = await waitForSessionData(sessionId);

		return {
			url,
			sessionId,
			sessionData
		};
	} catch (err) {
		console.error('Error loading session data:', err);
		// throw error(500, 'Failed to load session data. Please refresh the page.');
		return {
			url,
			sessionId,
			error: err.message || 'Failed to load session data'
		};
	}
}
