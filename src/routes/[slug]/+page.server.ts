import { redirect, error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { createFormSchema } from '$lib/scripts/formSchemaServer';
import { useStoryblokApi } from '@storyblok/svelte';
import { superValidate, message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';
import { SECRET_TRANSPORTER_USER, SECRET_TRANSPORTER_PASS, SECRET_MAILERLITE_KEY } from '$env/static/private';
import nodemailer from 'nodemailer';
import { useStoryblok } from '$lib/storyblok/useStoryblok';
import { signatureImage } from '$lib/email/molly-email-signature-for-nodemailer';
// import { signatureImage } from '$lib/email/molly-email-signature-for-nodemailer';
import { insertEmailWithTemplate } from '$lib/email/email-template';
import { deepFind, deepFindAll } from '$lib/scripts/search';
import { dev } from '$app/environment'; // Import the 'dev' flag

// IF we find a form, we include it.
function isComponentForm(item) {
	return item && typeof item === 'object' && item.component === 'form';
}
// Irrelevant for storyblok
function timedDeepFind(data, predicate) {
	// Use performance.now() if available (e.g. in browsers) or fallback to Date.now()
	const now = typeof performance !== 'undefined' && performance.now ? performance.now.bind(performance) : Date.now;

	const startTime = now();
	const result = deepFind(data, predicate);
	const endTime = now();
	const elapsed = endTime - startTime;
	// console.log(`deepFind took ${elapsed.toFixed(2)} ms to run.`);
	return result;
}

function timedDeepFindAll(data, predicate) {
	const now = typeof performance !== 'undefined' && performance.now ? performance.now.bind(performance) : Date.now;
	const startTime = now();
	const results = deepFindAll(data, predicate);
	const endTime = now();
	return results;
}

// Irrelevant for storyblok
const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: SECRET_TRANSPORTER_USER,
		pass: SECRET_TRANSPORTER_PASS
	}
});
// Irrelevant for storyblok
const sendInternalEmail = async (data) => {
	// console.log({ SECRET_TRANSPORTER_USER, SECRET_TRANSPORTER_PASS });
	const mailOptions = {
		from: SECRET_TRANSPORTER_USER,
		to: SECRET_TRANSPORTER_USER,
		subject: `New Form Submission from: ${data.name}`,
		html: `<!doctype html>
        <html>
        <body>
            <div
            style='background-color:#ffffff;color:#242424;font-family:"Helvetica Neue", "Arial Nova", "Nimbus Sans", Arial, sans-serif;font-size:16px;font-weight:400;letter-spacing:0.15008px;line-height:1.5;margin:0;padding:32px 0;min-height:100%;width:100%'
            >
            <table
                align="center"
                width="100%"
                style="margin:0 auto;max-width:600px;background-color:#f2fbff"
                role="presentation"
                cellspacing="0"
                cellpadding="0"
                border="0"
            >
                <tbody>
                <tr style="width:100%">
                    <td>
                    <div style="border-radius:0;padding:16px 24px 16px 24px">
                        <h2
                        style="color:#191919;font-weight:bold;text-align:left;margin:0;font-size:24px;padding:16px 24px 28px 24px"
                        >
                        New Submission from: ${data.name}
                        </h2>
                    </div>
                    <div style="font-size:16px;padding:16px 24px 16px 24px">
                        <table
                        style="width: 100%; border-collapse: collapse; font-size: 16px; font-family: Arial, sans-serif; margin: 20px 0;"
                        >
                        <tbody>
                            <tr>
                            <th
                                style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2; text-align: left;"
                            >
                                Name
                            </th>
                            <td style="border: 1px solid #ddd; padding: 8px;">
                                ${data.name}
                            </td>
                            </tr>
                            <tr>
                            <th
                                style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2; text-align: left;"
                            >
                                Subject
                            </th>
                            <td style="border: 1px solid #ddd; padding: 8px;">
                                ${data.subject}
                            </td>
                            </tr>
                            <tr>
                            <th
                                style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2; text-align: left;"
                            >
                                Email
                            </th>
                            <td style="border: 1px solid #ddd; padding: 8px;">
                                ${data.email}
                            </td>
                            </tr>
                            <tr>
                            <th
                                style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2; text-align: left;"
                            >
                                Message
                            </th>
                            <td style="border: 1px solid #ddd; padding: 8px;">
                            ${data.message}
                            </td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                    </td>
                </tr>
                </tbody>
            </table>
            </div>
        </body>
        </html>` // I need to create this template
	};

	try {
		let res = await transporter.sendMail(mailOptions);
		// console.log('Internal email res: ', res);
		return res;
	} catch (error) {
		// console.log('fucked up', error);
		throw error;
	}
};
// Irrelevant for storyblok
const sendConfirmationEmail = async (data) => {
	const emailContent = `
		<h2
			class="mobile-text"
			style="
			color: #3a6a5f;
			font-family: TimesNewRoman, 'Times New Roman', Times,
				Baskerville, Georgia, serif;
			font-size: 30px;
			font-weight: 400;
			margin: 0 0 20px 0;
			line-height: 120%;
			"
		>
			Hello ${data.name},
		</h2>

		<p
			style="
			color: #101112;
			font-family: Arial, Helvetica, sans-serif;
			font-size: 16px;
			line-height: 1.5;
			margin: 0 0 16px 0;
			"
		>
			Thank you for contacting me. I will try getting back to you
			within 48 hours. Please keep in mind that this only includes
			working days.
		</p>
	`;
	const mailOptions = {
		from: `Molly Marsh <${SECRET_TRANSPORTER_USER}>`,
		to: data.email,
		subject: `Thank you for contacting me!`,
		replyTo: SECRET_TRANSPORTER_USER,
		priority: 'high',
		attachments: [
			{
				filename: 'signature.jpg',
				path: signatureImage,
				cid: 'unique@signature.img'
			}
		],
		html: insertEmailWithTemplate(emailContent)
	};

	try {
		let res = await transporter.sendMail(mailOptions);
		return res;
	} catch (error) {
		// console.log('fucked up', error);
		throw error;
	}
};

const getForms = async (formObjects) => {
	const parsedForms = await Promise.all(
		formObjects.map(async (form, index) => {
			const tempFormInputs = form.form_inputs;
			const tempFormSchema = createFormSchema(tempFormInputs);
			await new Promise((resolve) => setTimeout(resolve, 100));
			// console.log({ index, form });
			const newForm = await superValidate(zod(tempFormSchema), { id: form.form_name });
			return newForm;
		})
	);
	return parsedForms;
};

export const load: PageServerLoad = async ({ parent, params, url }) => {
	// console.log({parent, params, url})
	const { storyblokApi: layoutApi } = await parent();
	const version = dev || url.searchParams.has('_storyblok') ? 'draft' : 'published';

	console.log(version);
	const slug = params.slug;

	let storyblokApi = layoutApi;

	if (!storyblokApi) {
		const maxRetries = 3;
		for (let i = 0; i < maxRetries; i++) {
			try {
				storyblokApi = await useStoryblokApi();
				if (storyblokApi) {
					break;
				}
			} catch (error) {
				console.error(`Attempt ${i + 1} to get API instance failed in [slug]/+page.server.ts:`, error);
				if (i < maxRetries - 1) {
					await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1)));
				}
			}
		}

		if (!storyblokApi) {
			await useStoryblok();
			storyblokApi = await useStoryblokApi();
		}

		if (!storyblokApi) {
			throw redirect(307, url.pathname);
		}
	}

	let dataStory;

	try {
		dataStory = await storyblokApi.get(`cdn/stories/${slug}`, {
			version,
			cv: Date.now()
		});
	} catch (err) {
		console.error('Error fetching story from Storyblok in [slug]/+page.server.ts:', err);
		throw error(500, {
			message: 'Failed to load page content in [slug]/+page.server.ts',
			slug
		});
	}

	if (dataStory && dataStory.data && dataStory.data.story) {
		const formsDataObjects = timedDeepFindAll(dataStory.data.story.content, isComponentForm);

		if (formsDataObjects.length >= 1) {
			let parsedForms = [];
			parsedForms = await getForms(formsDataObjects);

			return {
				forms: parsedForms,
				story: dataStory.data.story,
				version
			};
		}

		return {
			story: dataStory.data.story,
			version
		};
	} else {
		console.error('DataStory structure is invalid or missing after API call, even after API initialization was successful (which is unexpected if the API init was truly successful) in [slug]/+page.server.ts. Slug:', slug);
		throw error(500, {
			message: 'Failed to load page content - invalid data structure from API in [slug]/+page.server.ts',
			slug: slug
		});
	}
};

export const actions = {
	stripeCheckout: async ({ request, fetch }) => {
		try {
			const formData = await request.formData();
			const priceId = formData.get('priceId');
			const email = formData.get('email');

			if (!priceId || !email) {
				console.error('Missing required fields:', { priceId, email });
				return fail(400, {
					success: false,
					message: 'Missing required fields'
				});
			}

			const response = await fetch('/api/stripe/checkout', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ priceId, email })
			});

			if (!response.ok) {
				let errorMessage = 'Failed to create checkout session';
				try {
					const errorData = await response.json();
					errorMessage = errorData.error || errorMessage;
				} catch (parseError) {
					console.error('Failed to parse error response:', parseError);
				}

				return fail(response.status, {
					success: false,
					message: errorMessage
				});
			}

			const data = await response.json();
			if (!data.url) {
				return fail(500, {
					success: false,
					message: 'Invalid checkout response: missing URL'
				});
			}

			throw redirect(303, data.url);
		} catch (error) {
			if (error instanceof Response || error.status === 303) {
				throw error; // Rethrow redirects
			}

			console.error('Stripe checkout error:', error);
			return fail(500, {
				success: false,
				message: 'Internal server error during checkout'
			});
		}
	},
	sendQuery: async ({ request }) => {
		try {
			const reqClone = request.clone();
			const data = await request.formData();
			const schemaDataString = JSON.parse(data.get('schemaData'));
			const formSchema = createFormSchema(schemaDataString);
			const form = await superValidate(reqClone, zod(formSchema));

			if (!form.valid) {
				return fail(400, {
					form,
					type: 'failure',
					message: 'Validation failed'
				});
			}

			// console.log('Form data: ', form.data);

			const selfEmail = await sendInternalEmail(form.data);
			const isInternalEmailSuccessful = selfEmail.rejected.length === 0 && selfEmail.accepted.includes(SECRET_TRANSPORTER_USER) && selfEmail.response.startsWith('250');
			// console.log({ isInternalEmailSuccessful });

			if (!isInternalEmailSuccessful) {
				throw new Error('Internal email failed to send');
			}

			// Only send confirmation email if internal email was successful
			const confirmationEmail = await sendConfirmationEmail(form.data);
			const isConfirmationEmailSuccessful = confirmationEmail?.rejected.length === 0 && confirmationEmail?.accepted.includes(form.data.email) && confirmationEmail?.response.startsWith('250');
			// console.log({ isConfirmationEmailSuccessful });

			if (!isConfirmationEmailSuccessful) {
				throw new Error('Confirmation email failed to send');
			}

			return message(form, 'Form successfully submitted!');
		} catch (error) {
			console.error('Form processing error:', error);
			return fail(500, {
				type: 'failure',
				message: 'An error occurred processing your submission'
			});
		}
	}
};
