import { json, error } from '@sveltejs/kit';
import { handleArticlePublication } from '$lib/integrations/brevo';
import type { StoryblokWebhook } from '$lib/integrations/brevo';
import * as Sentry from '@sentry/sveltekit';

/**
 * Endpoint to handle Storyblok webhooks and create Brevo campaigns
 */
export async function POST({ request }) {
  try {
    const topic = request.headers.get('x-storyblok-topic');
    const body = await request.json() as StoryblokWebhook;

    // Only process publication events
    if (topic !== 'story.published') {
      return json({
        message: 'Webhook received but ignored - not a publication event'
      });
    }

    // Handle article publication with Brevo integration
    const result = await handleArticlePublication(body);
    
    if (result.error) {
      console.error('Error creating email campaign:', result.error);
      return json(
        {
          message: result.message,
          error: result.error
        },
        { status: 400 }
      );
    }

    return json({
      message: result.message,
      campaignId: result.campaignId
    });
  } catch (err) {
    // Log error to Sentry
    Sentry.captureException(err, {
      tags: {
        endpoint: 'brevo-create-campaign'
      }
    });
    
    console.error('Error processing webhook:', err);
    return json(
      {
        message: 'Internal server error',
        error: err instanceof Error ? err.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}