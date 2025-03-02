import { json, error, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import * as Sentry from '@sentry/sveltekit';

/**
 * Legacy endpoint - now redirects to the main email endpoint
 */
export const POST: RequestHandler = async ({ request, getClientAddress, fetch }) => {
	try {
		const clientIp = getClientAddress();
		const data = await request.json();

		if (!data.url) {
			console.log('Missing URL in error report');
			return json({ success: false, message: 'Missing URL' }, { status: 400 });
		}

		// Add timestamp if not provided
		if (!data.timestamp) {
			data.timestamp = new Date().toISOString();
		}

		// Forward to the new unified email endpoint
		const response = await fetch('/api/email/send-email', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				type: 'error-report',
				data: { ...data, clientIp }
			})
		});

		// Return the response from the email endpoint
		const result = await response.json();
		return json(result, { status: response.status });
	} catch (err) {
		console.error('Error processing bug report:', err);
		
		// Log to Sentry
		Sentry.captureException(err, {
			tags: {
				endpoint: 'send-error-report-legacy'
			}
		});
		
		return json(
			{
				success: false,
				message: err instanceof Error ? err.message : 'Unknown error'
			},
			{ status: 500 }
		);
	}
};
