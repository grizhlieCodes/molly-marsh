// PASSED
import { redirect, error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

// REMOVE

import { createFormSchema, getAllFormsDuringLoad, handleFormDuringFormAction } from '$lib/scripts/serverFormHandler';
import { useStoryblokApi } from '@storyblok/svelte';
import { superValidate, message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';
import { SECRET_TRANSPORTER_USER, SECRET_TRANSPORTER_PASS, SECRET_MAILERLITE_KEY, INTERNAL_API_KEY } from '$env/static/private';
import nodemailer from 'nodemailer';
import { useStoryblok } from '$lib/integrations/storyblok/useStoryblok';
import { signatureImage } from '$lib/integrations/email/signature';
import { deepFind, deepFindAll } from '$lib/scripts/search';
import { dev } from '$app/environment'; // Import the 'dev' flag

export const load: PageServerLoad = async ({ parent, params, url }) => {
	const { storyblokApi: layoutApi } = await parent();
	const version = dev || url.searchParams.has('_storyblok') ? 'draft' : 'published';

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

	let dataStory,
		articles = null,
		tags = null;

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

	if (slug.includes('blog')) {
		try {
			tags = await storyblokApi.get('cdn/stories', {
				content_type: 'tag',
				version: 'published'
			});

			articles = await storyblokApi.get('cdn/stories', {
				content_type: 'article',
				version: 'published',
				resolve_relations: ['article.article_tag']
			});
		} catch (err) {
			console.log('err: ', err);
		}
	}

	if (dataStory && dataStory.data && dataStory.data.story) {
		function isComponentForm(item) {
			return item && typeof item === 'object' && item.component === 'form';
		}
		const allForms = await getAllFormsDuringLoad(dataStory.data.story.content, isComponentForm);

		if (allForms && allForms.length > 0) {
			return {
				forms: allForms,
				story: dataStory.data.story,
				...(tags?.data?.stories && { tags: tags?.data?.stories }),
				...(articles?.data?.stories && { articles: articles?.data?.stories }),
				version
			};
		}

		return {
			story: dataStory.data.story,
			...(tags?.data?.stories && { tags: tags?.data?.stories }),
			...(articles?.data?.stories && { articles: articles?.data?.stories }),
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
	sendQuery: async ({ request, fetch }) => {
		try {
			// Move this into an API?
			// api/forms/contact-form-handler
			const reqClone = request.clone();
			const formData = await request.formData();
			const schemaDataString = JSON.parse(formData.get('schemaData'));
			const formSchema = createFormSchema(schemaDataString);
			const form = await superValidate(reqClone, zod(formSchema));

			if (!form.valid) {
				return fail(400, {
					form,
					type: 'failure',
					message: 'Validation failed'
				});
			}

			// Use the new unified email API for contact form emails
			const emailResponse = await fetch('/api/email/send-email', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					type: 'contact-form',
					data: form.data
				})
			});

			if (!emailResponse.ok) {
				const errorData = await emailResponse.json();
				console.error('Email API error:', errorData);
				throw new Error(errorData.message || 'Failed to send email');
			}

			return message(form, 'Form successfully submitted!');
		} catch (error) {
			console.error('Form processing error:', error);
			return fail(500, {
				type: 'failure',
				message: 'An error occurred processing your submission'
			});
		}
	},
	saveNewsletterContact: async ({ request, fetch }) => {
		console.log('Working');
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

			console.log('We have the email boyo ============ ', form.data.email, INTERNAL_API_KEY);
			// Now lets wait for the brevo api
			const newContact = await fetch('/api/brevo/add-contact', {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${INTERNAL_API_KEY}`,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					name: form?.data?.first_name,
					email: form?.data?.email
				})
			});
			console.log('Brevo reply: ', newContact);
		} catch (error) {}
	},
	sendErrorReport: async (event) => {
		console.log('Working baby!!');
		// const formData = await request.formData();
		// const reportData = JSON.parse(formData.get('reportData'));

		// try {
		// 	// Your server-side fetch or email sending logic here
		// 	const response = await fetch('/api/emails/send-error-email-to-rafal', {
		// 		method: 'POST',
		// 		headers: {
		// 			'Content-Type': 'application/json'
		// 		},
		// 		body: JSON.stringify(reportData)
		// 	});

		// 	if (!response.ok) {
		// 		return { success: false, message: 'Failed to send report' };
		// 	}

		// 	return { success: true };
		// } catch (error) {
		// 	console.error('Error sending bug report:', error);
		// 	return { success: false, message: error.message };
		// }
		return { success: true };
	}
};