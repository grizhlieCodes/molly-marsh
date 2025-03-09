import { sequence } from '@sveltejs/kit/hooks';
import * as Sentry from '@sentry/sveltekit';
import type { Handle } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

Sentry.init({
	dsn: 'https://ae687dbada0bbedcdac3699574d62767@o4508886172631040.ingest.de.sentry.io/4508886174269520'
});

export const handle: Handle = sequence(Sentry.sentryHandle(), async ({ event, resolve }) => {
	// Handle storyblok setting pages and return a 404
	if (event.url.pathname.slice(1).startsWith('_')) {
		return redirect(307, '/404');
	}

	const response = await resolve(event);
	return response;
});

export const handleError = Sentry.handleErrorWithSentry();
