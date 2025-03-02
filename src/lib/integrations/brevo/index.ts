// Client exports
export { 
  getBrevoEmailCampaignsClient,
  getBrevoContactsClient,
  BREVO_NEWSLETTER_LIST_ID, 
  DEFAULT_SENDER 
} from './client';

// Campaign exports
export { 
  createCampaign, 
  getCampaign 
} from './campaigns';

// Contact exports
export { 
  addContactToNewsletter 
} from './contacts';

// Handler exports
export {
  handleArticlePublication,
  getStoryData,
  isValidArticle,
  createNewsletterData
} from './handlers';

// Template exports
export {
  createNewsletterMjml,
  convertMjmlToHtml
} from './templates/newsletter';

// Type exports
export type {
  NewsletterData,
  CampaignResponse,
  StoryblokWebhook,
  StoryData,
  CreateCampaignParams,
  BrevoEmailCampaign
} from './types';