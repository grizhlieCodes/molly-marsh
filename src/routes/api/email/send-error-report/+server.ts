import { sendErrorReport } from '$lib/email/serverEmailHandler';
import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, getClientAddress }) => {
	console.log('received some data, lets try sending it to the email function');
	try {
		const clientIp = getClientAddress();
		const data = await request.json();

		console.log('data: ', data);

		if (!data.url) {
			console.log('No damn data');
			return json({ success: false, message: 'Missing URL' }, { status: 400 });
		}

		const allData = { ...data, clientIp };

		console.log({ allData });

		const emailSent = await sendErrorReport({ ...data, clientIp });

		// Return a response
		return json({ success: true });
	} catch (err) {
		console.error('Error processing bug report:', err);
		return json(
			{
				success: false,
				message: err instanceof Error ? err.message : 'Unknown error'
			},
			{ status: 500 }
		);
	}
};
