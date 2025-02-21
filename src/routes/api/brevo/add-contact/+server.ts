import { json, error } from '@sveltejs/kit';
import { SECRET_BREVO_KEY, INTERNAL_API_KEY } from '$env/static/private';
import { z } from 'zod';
import SibApiV3Sdk from 'sib-api-v3-sdk';
import { RequestHandler } from '@sveltejs/kit';

// import { createHmac, timingSafeEqual } from 'crypto';
// import { parse } from 'path';
export const POST: RequestHandler = async (event) => {
	const authHeader = event.request.headers.get('Authorization');
	const token = authHeader?.replace('Bearer ', '');



	if (token !== INTERNAL_API_KEY) {
		return new Response('Unauthorized in brevo-contact handler', { status: 401 });
	}

	try {
		const data = await event.request.json();

		const BREVO_LIST_ID = 3; // newsletter

		// Initialise Brevo
		const defaultClient = SibApiV3Sdk.ApiClient.instance;
		const apiKey = defaultClient.authentications['api-key'];
		apiKey.apiKey = SECRET_BREVO_KEY;

		// Clarify what we're doing with brevo sdk
		let apiInstance = new SibApiV3Sdk.ContactsApi();
		let newContact = new SibApiV3Sdk.CreateContact();

		newContact.email = data.email;
		newContact.listIds = [BREVO_LIST_ID];

		console.log('We shall try to add this now.');
		const brevoContact = await apiInstance.createContact(newContact);
		

		if (!brevoContact.id) {
			console.log('new contact was not created successfully');
		}

		console.log('New Brevo Contact created: ', brevoContact);

		return json({
			message: 'Successfully created contact'
		});

		return json({ status: 'success' });
	} catch (err) {
		console.error('Error processing new brevo contact:', err);
		throw error(500, 'Internal server error');
	}
};
