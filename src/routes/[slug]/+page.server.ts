import { redirect, error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { createFormSchema } from '$lib/scripts/formSchemaServer';
import { useStoryblokApi } from '@storyblok/svelte';
import { superValidate, message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';
import { SECRET_TRANSPORTER_USER, SECRET_TRANSPORTER_PASS } from '$env/static/private';
import nodemailer from 'nodemailer';
import { useStoryblok } from '$lib/storyblok/useStoryblok';

// Irrelevant for storyblok
function deepFind(data, predicate, visited = new Set()) {
	// Check for null or non-object values
	if (data === null || typeof data !== 'object') {
		return predicate(data) ? data : undefined;
	}

	// Avoid circular references
	if (visited.has(data)) return undefined;
	visited.add(data);

	// If data itself matches, return it.
	if (predicate(data)) return data;

	// If it's an array, iterate over the items.
	if (Array.isArray(data)) {
		for (const item of data) {
			const found = deepFind(item, predicate, visited);
			if (found !== undefined) return found;
		}
	} else {
		// It's an object: iterate over its values.
		for (const key in data) {
			if (Object.prototype.hasOwnProperty.call(data, key)) {
				const found = deepFind(data[key], predicate, visited);
				if (found !== undefined) return found;
			}
		}
	}

	// If nothing found, return undefined.
	return undefined;
}
// Irrelevant for storyblok
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
		console.log('Internal email res: ', res);
		return res;
	} catch (error) {
		console.log('fucked up', error);
		throw error;
	}
};
// Irrelevant for storyblok
const sendConfirmationEmail = async (data) => {
	const mailOptions = {
		from: SECRET_TRANSPORTER_USER,
		to: data.email,
		subject: `Thank you for contacting me!`,
		html: `<!doctype html>
<html>
  <body>
    <div
      style='background-color:#EFF8F6;color:#242424;font-family:"Helvetica Neue", "Arial Nova", "Nimbus Sans", Arial, sans-serif;font-size:16px;font-weight:400;letter-spacing:0.15008px;line-height:1.5;margin:0;padding:32px 0;min-height:100%;width:100%'
    >
      <table
        align="center"
        width="100%"
        style="margin:0 auto;max-width:600px;background-color:#FFFFFF"
        role="presentation"
        cellspacing="0"
        cellpadding="0"
        border="0"
      >
        <tbody>
          <tr style="width:100%">
            <td>
              <div style="height:48px"></div>
              <div style="font-weight:normal;padding:0px 24px 16px 24px">
                Hi ${data.name} 👋,
              </div>
              <div style="font-weight:normal;padding:0px 24px 16px 24px">
                Thank you for contacting me. I will try getting back to you
                within 48 hours. Please keep in mind that this only includes
                working days.
              </div>
              <div style="font-weight:normal;padding:8px 24px 8px 24px">
                Kind regards,
              </div>
              <div style="font-weight:normal;padding:0px 24px 16px 24px">
                Molly
              </div>
              <div style="padding:16px 0px 16px 0px">
                <hr
                  style="width:100%;border:none;border-top:1px solid #CCD6CF;margin:0"
                />
              </div>
              <div style="padding:0px 0px 0px 0px">
                <div style="padding:0px 0px 0px 0px">
                  <table
                    align="center"
                    width="100%"
                    cellpadding="0"
                    border="0"
                    style="table-layout:fixed;border-collapse:collapse"
                  >
                    <tbody style="width:100%">
                      <tr style="width:100%">
                        <td
                          style="box-sizing:content-box;vertical-align:middle;padding-left:0;padding-right:0;width:112px"
                        >
                          <div style="padding:16px 0px 16px 36px">
                            <img
                              alt=""
                              src="https://a.storyblok.com/f/320425/388x388/6d88b78ce7/molly-email-signature-img.png/m/400x0"
                              height="113"
                              width="113"
                              style="outline:none;border:none;text-decoration:none;object-fit:cover;height:113px;width:113px;max-width:100%;display:inline-block;vertical-align:middle;text-align:center;border-radius:113px"
                            />
                          </div>
                        </td>
                        <td
                          style="box-sizing:content-box;vertical-align:middle;padding-left:0;padding-right:0;width:200px"
                        >
                          <div style="padding:16px 0px 16px 0px">
                            <div style="padding:16px 0px 16px 0px">
                              <h2
                                style='font-weight:bold;margin:0;font-family:Charter, "Bitstream Charter", "Sitka Text", Cambria, serif;font-size:24px;padding:0px 0px 0px 0px'
                              >
                                Molly Marsh (She/Her)
                              </h2>
                              <div
                                style="font-weight:normal;padding:0px 0px 0px 0px"
                              >
                                Transformative Life Coach
                              </div>
                              <div style="padding:8px 0px 8px 0px">
                                <hr
                                  style="width:100%;border:none;border-top:1px solid #CCD6CF;margin:0"
                                />
                              </div>
                              <div
                                style="color:#16A34A;font-size:16px;padding:0px 0px 0px 0px"
                              >
                                <a
                                  style="text-decoration: none; color:#3A6A5F;"
                                  href="https://www.mollymarshcoaching.com"
                                  >www.mollymarshcoaching.com</a
                                >
                              </div>
                            </div>
                          </div>
                        </td>
                        <td
                          style="box-sizing:content-box;vertical-align:middle;padding-left:0;padding-right:0;width:80px"
                        ></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
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
		return res;
	} catch (error) {
		console.log('fucked up', error);
		throw error;
	}
};

// Claude solution
export const load: PageServerLoad = async ({ parent, params, url }) => {
	const { storyblokApi: layoutApi } = await parent();
	const slug = params.slug;

	let storyblokApi = layoutApi;

	if (!storyblokApi) {
		const maxRetries = 3;
		for (let i = 0; i < maxRetries; i++) {
			try {
				storyblokApi = await useStoryblokApi();
				if (storyblokApi) {
					console.log(`Storyblok API initialized successfully on attempt ${i + 1} in [slug]/+page.server.ts`);
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
			console.log('Triggering reload to:', url.pathname);
			throw redirect(307, url.pathname);
		}
	}

	let dataStory;

	try {
		dataStory = await storyblokApi.get(`cdn/stories/${slug}`, {
			version: 'draft',
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
		const formDataObject = timedDeepFind(dataStory.data.story.content, isComponentForm);

		if (formDataObject) {
			const formInputs = formDataObject.form_inputs;
			const formSchema = createFormSchema(formInputs);
			await new Promise((resolve) => setTimeout(resolve, 100));
			const form = await superValidate(zod(formSchema));

			return {
				form,
				story: dataStory.data.story
			};
		}

		return {
			story: dataStory.data.story
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
	// stripeCheckout: async ({ request, fetch }) => {
	// 	const formData = await request.formData();
	// 	const priceId = formData.get('priceId');
	// 	const email = formData.get('email');

	// 	// value = price_...

	// 	// console.log('FORM DATA: =========== ', priceId); // WORKING TILL HERE

	// 	// Make request to our webhook endpoint
	// 	const response = await fetch('/api/stripe/checkout', {
	// 		method: 'POST',
	// 		headers: { 'Content-Type': 'application/json' },
	// 		body: JSON.stringify({ priceId, email })
	// 		// Add this for development only
	// 		// rejectUnauthorized: false
	// 	}); // session

	// 	if (!response.ok) {
	// 		const errorData = await response.json();
	// 		// Handle the error appropriately
	// 		// console.log(' ERROR RRRRR ================= AINT WORKING');
	// 		throw new Error(errorData.error);
	// 	}

	// 	const { url } = await response.json();
	// 	throw redirect(303, url);
	// },
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
			// console.log('FORM DATA: ', form);

			if (!form.valid) {
				return fail(400, {
					form,
					type: 'failure',
					message: 'Validation failed'
				});
			}

			console.log('Form data: ', form.data);

			const selfEmail = await sendInternalEmail(form.data);
			const isInternalEmailSuccessful = selfEmail.rejected.length === 0 && selfEmail.accepted.includes(SECRET_TRANSPORTER_USER) && selfEmail.response.startsWith('250');
			console.log({ isInternalEmailSuccessful });

			if (!isInternalEmailSuccessful) {
				throw new Error('Internal email failed to send');
			}

			// Only send confirmation email if internal email was successful
			const confirmationEmail = await sendConfirmationEmail(form.data);
			const isConfirmationEmailSuccessful = confirmationEmail?.rejected.length === 0 && confirmationEmail?.accepted.includes(form.data.email) && confirmationEmail?.response.startsWith('250');
			console.log({ isConfirmationEmailSuccessful });

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
