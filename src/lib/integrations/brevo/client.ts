import SibApiV3Sdk from 'sib-api-v3-sdk';
import { SECRET_BREVO_KEY } from '$env/static/private';

let apiInstance: SibApiV3Sdk.EmailCampaignsApi | null = null;

/**
 * Setup the Brevo API client
 * @returns Configured Brevo API client
 */
export function setupBrevoClient(): SibApiV3Sdk.EmailCampaignsApi {
  const defaultClient = SibApiV3Sdk.ApiClient.instance;
  const apiKey = defaultClient.authentications['api-key'];
  apiKey.apiKey = SECRET_BREVO_KEY;
  
  return new SibApiV3Sdk.EmailCampaignsApi();
}

/**
 * Gets a Brevo API client instance (creates one if it doesn't exist)
 * @returns A configured Brevo API client
 */
export function getBrevoClient(): SibApiV3Sdk.EmailCampaignsApi {
  if (!apiInstance) {
    apiInstance = setupBrevoClient();
  }
  return apiInstance;
}

// Contact list ID for newsletter subscribers
export const BREVO_NEWSLETTER_LIST_ID = 3;

// Default sender information
export const DEFAULT_SENDER = {
  name: 'Molly Marsh',
  email: 'molly@mollymarshcoaching.com'
};