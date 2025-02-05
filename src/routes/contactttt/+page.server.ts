import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { createFormSchema } from '$lib/scripts/formSchemaServer';
import { useStoryblokApi } from '@storyblok/svelte';
import { superValidate, message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import { fail } from '@sveltejs/kit';
import nodemailer from 'nodemailer';

export const load: PageServerLoad = async ({ parent, url, params }) => {
	const link = url.pathname.slice(1);
	if (link === 'contact') {
		let storyblokApi = await useStoryblokApi();
		// const { storyblokApi } = await parent();
		// console.log(storyblokApi);
		// let slug = params.slug;
		const dataStory = await storyblokApi.get(`cdn/stories/${link}`, {
			version: 'draft'
		});

		const contactFormPageData = dataStory.data.story.content.blocks[0].blocks[0].blocks[0];
		const contactFormData = dataStory.data.story.content.blocks[0].blocks[0].blocks[0].form_inputs;
		// console.log('FORM INPUTS', contactFormData);
		// console.log('DATA STORY HERE ============================== ', contactFormData);
		const formSchema = createFormSchema(contactFormData);
		// console.log('Form One: running on server load: zod schema: ---', formSchema);
		// const form = await superValidate(zod(formSchema));
		// return {
		// 	form,
		// };
		const form = await superValidate(zod(formSchema));
		// console.log('Form One: running on server load: super schema: ---', form);

		return {
			form,
			contactFormPageData
		};
	}
};

export const actions = {
	sendQuery: async ({ request }) => {
		try {
			// Clone the request for Superforms so the original body is still available for us
			const reqClone = request.clone();

			// Consume the original request to get our dynamic schema data
			const data = await request.formData();
			console.log("REQUEST DATA:", Object.fromEntries(data.entries()));

			const schemaDataString = JSON.parse(data.get('schemaData'));
			const formSchema = createFormSchema(schemaDataString);

			// Now pass the cloned request to superValidate so it can read the form data properly
			const form = await superValidate(reqClone, zod(formSchema));
			console.log('FORM DATA: ', form);

			if (!form.valid) {
				return fail(400, {
					form,
					type: 'failure',
					message: 'Validation failed'
				});
			}

			// Process the form submission (e.g., save data, send email, etc.)
			return {
				form,
				type: 'success',
				message: 'Form successfully submitted!'
			};
		} catch (error) {
			console.error('Form processing error:', error);
			return fail(500, {
				type: 'failure',
				message: 'An error occurred processing your submission'
			});
		}
	}
};