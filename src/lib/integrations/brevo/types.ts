import type { EmailCampaign } from 'sib-api-v3-sdk';

export interface NewsletterData {
  title: string;
  content: any;
  summary: string;
  storyId?: string;
  fullSlug?: string;
  spaceId?: string;
  action?: string;
  text?: string;
}

export interface CampaignResponse {
  message: string;
  campaignId?: number;
  error?: string;
}

export interface StoryblokWebhook {
  story_id: string;
  full_slug: string;
  space_id: string;
  action: string;
  text?: string;
}

export interface StoryData {
  name: string;
  content: any;
}

export interface CreateCampaignParams {
  name: string;
  subject: string;
  htmlContent: string;
  listIds?: number[];
}

export type BrevoEmailCampaign = EmailCampaign;