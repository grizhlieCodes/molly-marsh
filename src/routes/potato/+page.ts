import type { PageLoad } from './$types';
export const load: PageLoad = async ({ data }) => {
	return {
		serverMessage: data.serverMessage,
		universalMessage: 'hello from universal load function',
		formVali: data.formVali
	};
};
