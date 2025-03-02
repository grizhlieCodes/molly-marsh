import SibApiV3Sdk from 'sib-api-v3-sdk';
import { SECRET_BREVO_KEY } from '$env/static/private';
import { BREVO_NEWSLETTER_LIST_ID } from './client';
import * as Sentry from '@sentry/sveltekit';

/**
 * Adds a contact to the Brevo newsletter list
 * @param email Email of the contact to add
 * @param name Name of the contact
 * @returns Response from Brevo API
 */
export async function addContactToNewsletter(email: string, name?: string) {
  try {
    // Initialize Brevo contacts API client
    const defaultClient = SibApiV3Sdk.ApiClient.instance;
    const apiKey = defaultClient.authentications['api-key'];
    apiKey.apiKey = SECRET_BREVO_KEY;
    
    const apiInstance = new SibApiV3Sdk.ContactsApi();
    const createContact = new SibApiV3Sdk.CreateContact();
    
    // Create contact object
    createContact.email = email;
    createContact.listIds = [BREVO_NEWSLETTER_LIST_ID];
    
    if (name) {
      createContact.attributes = {
        FIRSTNAME: name
      };
    }
    
    // Create the contact
    const result = await apiInstance.createContact(createContact);
    return {
      success: true,
      message: 'Contact added to newsletter',
      data: result
    };
  } catch (error) {
    // Handle possible duplicate contact error
    if (error.status === 400 && error.response?.body?.message?.includes('Contact already exist')) {
      return {
        success: true,
        message: 'Contact already subscribed',
        alreadyExists: true
      };
    }
    
    // Log other errors to Sentry
    Sentry.captureException(error, {
      tags: {
        component: 'brevo-integration',
        action: 'add-contact'
      },
      extra: { email, name }
    });
    
    const errorMessage = error.response?.body?.message || error.message;
    return {
      success: false,
      message: `Failed to add contact: ${errorMessage}`
    };
  }
}