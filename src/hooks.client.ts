import { handleErrorWithSentry, replayIntegration } from '@sentry/sveltekit';
import * as Sentry from '@sentry/sveltekit';
import { beforeSend } from '$lib/integrations/sentry';

Sentry.init({
	dsn: 'https://ae687dbada0bbedcdac3699574d62767@o4508886172631040.ingest.de.sentry.io/4508886174269520',
	beforeSend
});

// If you have a custom error handler, pass it to `handleErrorWithSentry`
export const handleError = handleErrorWithSentry();
