import type { PageServerLoad } from './$types';
import { createFormValidation } from '$lib/stores/contactFormValidationStore.svelte.js';

export const load: PageServerLoad = async ({ url }) => {
	// console.log(createFormValidation.createFormSchema);
	return {
		serverMessage: url.pathname.slice(1),
		formVali: JSON.stringify(createFormValidation)
	};
};
