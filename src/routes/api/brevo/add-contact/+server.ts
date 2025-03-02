import { json, error } from '@sveltejs/kit';
import { INTERNAL_API_KEY } from '$env/static/private';
import type { RequestHandler } from '@sveltejs/kit';
import { addContactToNewsletter } from '$lib/integrations/brevo';
import * as Sentry from '@sentry/sveltekit';

export const POST: RequestHandler = async (event) => {
  // Validate authorization
  const authHeader = event.request.headers.get('Authorization');
  const token = authHeader?.replace('Bearer ', '');

  if (token !== INTERNAL_API_KEY) {
    return new Response('Unauthorized in brevo-contact handler', { status: 401 });
  }

  try {
    const data = await event.request.json();
    
    // Validate required data
    if (!data.email) {
      return json({
        success: false,
        message: 'Email is required'
      }, { status: 400 });
    }

    // Use the integration to add contact to newsletter
    const result = await addContactToNewsletter(data.email, data.name);
    
    if (!result.success) {
      return json({
        success: false,
        message: result.message
      }, { status: 400 });
    }
    
    // Log success but don't expose all data
    console.log('New Brevo Contact created successfully');
    
    return json({
      success: true,
      message: 'Successfully created contact',
      alreadyExists: result.alreadyExists
    });
  } catch (err) {
    // Log error to Sentry
    Sentry.captureException(err, {
      tags: {
        endpoint: 'brevo-add-contact'
      }
    });
    
    console.error('Error processing new brevo contact:', err);
    return json({
      success: false,
      message: err instanceof Error ? err.message : 'Internal server error'
    }, { status: 500 });
  }
};
