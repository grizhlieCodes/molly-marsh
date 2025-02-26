// src/routes/api/notion/notion-handler/+server.ts
import { json, error } from '@sveltejs/kit';
import { INTERNAL_API_KEY } from '$env/static/private';
import type { RequestHandler } from './$types';
import { handleNotionEvent } from '$lib/integrations/notion';

export const POST: RequestHandler = async (event) => {
  // Verify authorization token
  const authHeader = event.request.headers.get('Authorization');
  const token = authHeader?.replace('Bearer ', '');

  if (token !== INTERNAL_API_KEY) {
    return new Response('Unauthorized in notion handler', { status: 401 });
  }

  try {
    // Parse request body
    const data = await event.request.json();
    
    // Process the event with the appropriate handler
    const handledResponse = await handleNotionEvent(data, event);
    
    // Return success response
    return json({
      message: "Successfully processed request in Notion handler",
      ok: true,
      data: handledResponse
    });
  } catch (err) {
    console.error('Error processing request:', err);
    
    // Handle different types of errors
    if (err.status) {
      // If it's already a SvelteKit error with status, pass it through
      throw err;
    }
    
    // Convert other errors to 500 responses
    return new Response(
      JSON.stringify({
        error: 'Internal server error',
        message: err.message
      }), 
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};