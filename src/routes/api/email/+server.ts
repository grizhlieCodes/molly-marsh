import { redirect, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import * as Sentry from '@sentry/sveltekit';

/**
 * Legacy endpoint - redirects to the new unified email API
 */
export const POST: RequestHandler = async ({ request, fetch }) => {
  try {
    // Forward to the new endpoint
    const response = await fetch('/api/email/send-email', {
      method: 'POST',
      headers: request.headers,
      body: request.body
    });
    
    // Pass through the response
    const result = await response.json();
    return json(result, { status: response.status });
  } catch (err) {
    console.error('Error forwarding email request:', err);
    
    // Log to Sentry
    Sentry.captureException(err, {
      tags: {
        endpoint: 'email-legacy'
      }
    });
    
    return json({ 
      success: false, 
      message: err instanceof Error ? err.message : 'Unknown error' 
    }, { status: 500 });
  }
};

