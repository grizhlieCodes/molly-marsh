import type { Handle } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	// Handle storyblok setting pages and return a 404
	if (event.url.pathname.slice(1).startsWith('_')) {
		return redirect(307, '/404');
	}

	const response = await resolve(event);
	return response;
};
