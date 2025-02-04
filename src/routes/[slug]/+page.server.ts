import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { createFormSchema } from '$lib/scripts/formSchemaServer';
import { useStoryblokApi } from '@storyblok/svelte';
import { superValidate, message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';

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
	stripeCheckout: async ({ request, fetch }) => {
		const formData = await request.formData();
		const priceId = formData.get('priceId'); // value = price_...

		// console.log('FORM DATA: =========== ', priceId); // WORKING TILL HERE

		// Make request to our webhook endpoint
		const response = await fetch('/api/stripe/checkout', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ priceId })
			// Add this for development only
			// rejectUnauthorized: false
		}); // session

		if (!response.ok) {
			const errorData = await response.json();
			// Handle the error appropriately
			// console.log(' ERROR RRRRR ================= AINT WORKING');
			throw new Error(errorData.error);
		}

		const { url } = await response.json();
		throw redirect(303, url);
	},
	sendQuery: async ({ request }) => {
		const data = await request.formData();
		const schemaDataString = JSON.parse(data.get('schemaData'));
		const formSchema = createFormSchema(schemaDataString);
		const form = await superValidate(request, zod(formSchema));
		if (!form.valid) {
			return fail(400, { form });
		}
		return message(form, 'Form successfully submitted!');
	}
};
