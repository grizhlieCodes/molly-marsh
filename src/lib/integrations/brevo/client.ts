import SibApiV3Sdk from 'sib-api-v3-sdk';
import { SECRET_BREVO_KEY } from '$env/static/private';

// Setting up API client for authentication
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = SECRET_BREVO_KEY;

// API client instances (singletons)
let campaignsApiInstance: SibApiV3Sdk.EmailCampaignsApi | null = null;
let contactsApiInstance: SibApiV3Sdk.ContactsApi | null = null;

/**
 * Gets a Brevo Campaigns API client instance (creates one if it doesn't exist)
 * @returns A configured Brevo campaigns API client
 */
export function getBrevoEmailCampaignsClient(): SibApiV3Sdk.EmailCampaignsApi {
  if (!campaignsApiInstance) {
    campaignsApiInstance = new SibApiV3Sdk.EmailCampaignsApi();
  }
  return campaignsApiInstance;
}

/**
 * Gets a Brevo Contacts API client instance (creates one if it doesn't exist)
 * @returns A configured Brevo contacts API client
 */
export function getBrevoContactsClient(): SibApiV3Sdk.ContactsApi {
  if (!contactsApiInstance) {
    contactsApiInstance = new SibApiV3Sdk.ContactsApi();
  }
  return contactsApiInstance;
}

// Contact list ID for newsletter subscribers
export const BREVO_NEWSLETTER_LIST_ID = 3;

// Default sender information
export const DEFAULT_SENDER = {
  name: 'Molly Marsh',
  email: 'molly@mollymarshcoaching.com'
};