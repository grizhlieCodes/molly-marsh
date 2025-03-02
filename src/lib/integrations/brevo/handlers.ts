import StoryblokClient from 'storyblok-js-client';
import { PUBLIC_STORYBLOK_ACCESS_TOKEN } from '$env/static/public';
import { createNewsletterMjml, convertMjmlToHtml } from './templates/newsletter';
import { createCampaign } from './campaigns';
import type { StoryblokWebhook, StoryData, NewsletterData, CampaignResponse } from './types';
import * as Sentry from '@sentry/sveltekit';

// Initialize Storyblok client
const Storyblok = new StoryblokClient({
  accessToken: PUBLIC_STORYBLOK_ACCESS_TOKEN
});

/**
 * Gets a story from Storyblok
 * @param storyId The story ID to retrieve
 * @returns Story data
 */
export async function getStoryData(storyId: string): Promise<StoryData> {
  try {
    const storyRes = await Storyblok.getStory(storyId, {
      version: 'published'
    });
    return storyRes.data.story;
  } catch (error) {
    Sentry.captureException(error, {
      tags: {
        component: 'brevo-integration',
        action: 'get-story'
      },
      extra: { storyId }
    });
    throw error;
  }
}

/**
 * Checks if story is a valid article
 * @param storyData Story data from Storyblok
 * @returns Boolean indicating if it's a valid article
 */
export function isValidArticle(storyData: StoryData): boolean {
  return storyData?.content?.component === 'article';
}

/**
 * Creates newsletter data from webhook and story data
 * @param webhook Webhook data from Storyblok
 * @param storyData Story data from Storyblok
 * @returns Newsletter data object
 */
export function createNewsletterData(webhook: StoryblokWebhook, storyData: StoryData): NewsletterData {
  return {
    title: storyData.name,
    content: storyData.content.article_content,
    summary: storyData.content.article_summary,
    storyId: webhook.story_id,
    fullSlug: webhook.full_slug,
    spaceId: webhook.space_id,
    action: webhook.action,
    text: webhook.text
  };
}

/**
 * Handle article publication webhook to create newsletter campaign
 * @param webhook Article publication webhook from Storyblok
 * @returns Response with campaign creation status
 */
export async function handleArticlePublication(webhook: StoryblokWebhook): Promise<CampaignResponse> {
  try {
    // Get story data from Storyblok
    const storyData = await getStoryData(webhook.story_id);
    
    // Check if it's a valid article
    if (!isValidArticle(storyData)) {
      return {
        message: 'Not an article, ignoring webhook'
      };
    }
    
    // Create newsletter data
    console.log(storyData)
    const newsletterData = createNewsletterData(webhook, storyData);
    
    // Create email template
    const mjmlTemplate = createNewsletterMjml(
      newsletterData.title, 
      newsletterData.content, 
      newsletterData.summary
    );
    
    // Convert MJML to HTML
    const { html, errors } = convertMjmlToHtml(mjmlTemplate);
    
    if (errors && errors.length > 0) {
      Sentry.captureMessage('MJML template errors', {
        level: 'error',
        tags: {
          component: 'brevo-integration',
          action: 'convert-mjml'
        },
        extra: {
          errors,
          storyId: webhook.story_id
        }
      });
      
      return {
        message: 'Failed to create email campaign: MJML conversion error',
        error: errors.map((e) => e.formattedMessage).join('\n')
      };
    }
    
    // Create campaign in Brevo
    return await createCampaign({
      name: `Newsletter - ${newsletterData.title}`,
      subject: newsletterData.title,
      htmlContent: html
    });
  } catch (error) {
    Sentry.captureException(error, {
      tags: {
        component: 'brevo-integration',
        action: 'handle-article-publication'
      },
      extra: {
        webhook
      }
    });
    
    return {
      message: 'Failed to process article publication',
      error: error.message
    };
  }
}