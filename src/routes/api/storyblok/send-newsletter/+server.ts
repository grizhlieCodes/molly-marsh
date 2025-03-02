import { json } from '@sveltejs/kit';
import * as Sentry from '@sentry/sveltekit';

/**
 * Legacy endpoint that forwards requests to the new Brevo API endpoint
 */
export async function POST({ request, fetch }) {
  try {
    console.log('Forwarding request to new Brevo API endpoint');
    
    // Forward the request to the new endpoint
    const response = await fetch('/api/brevo/create-campaign', {
      method: 'POST',
      headers: request.headers,
      body: request.body,
      duplex: 'half' // Required when forwarding a request body
    });
    
    // Get the response
    const responseData = await response.json();
    
    // Return the response from the new endpoint
    return json(responseData, { status: response.status });
  } catch (err) {
    // Log error to Sentry
    Sentry.captureException(err, {
      tags: {
        endpoint: 'storyblok-send-newsletter-legacy'
      }
    });
    
    console.error('Error forwarding request:', err);
    return json(
      {
        error: 'Internal server error',
        details: err instanceof Error ? err.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
