import SibApiV3Sdk from 'sib-api-v3-sdk';
import { getBrevoClient, BREVO_NEWSLETTER_LIST_ID, DEFAULT_SENDER } from './client';
import type { CreateCampaignParams, CampaignResponse } from './types';
import * as Sentry from '@sentry/sveltekit';

/**
 * Creates a new email campaign in Brevo
 * @param params Campaign parameters
 * @returns Promise with campaign creation response
 */
export async function createCampaign(params: CreateCampaignParams): Promise<CampaignResponse> {
  try {
    const apiInstance = getBrevoClient();
    const emailCampaigns = new SibApiV3Sdk.CreateEmailCampaign();

    // Set up email campaign
    emailCampaigns.name = params.name;
    emailCampaigns.subject = params.subject;
    emailCampaigns.sender = DEFAULT_SENDER;
    emailCampaigns.type = 'classic';
    emailCampaigns.htmlContent = params.htmlContent;
    emailCampaigns.recipients = { 
      listIds: params.listIds || [BREVO_NEWSLETTER_LIST_ID] 
    };

    // Create the campaign
    const campaignData = await apiInstance.createEmailCampaign(emailCampaigns);
    
    return {
      message: 'Email campaign created successfully!',
      campaignId: campaignData.id
    };
  } catch (error) {
    // Log error to Sentry
    Sentry.captureException(error, {
      tags: {
        component: 'brevo-integration',
        action: 'create-campaign'
      },
      extra: {
        campaignName: params.name,
        subject: params.subject
      }
    });

    // Extract error message from Brevo response
    const errorMessage = error.response?.body?.message || error.message;
    
    return {
      message: 'Failed to create email campaign',
      error: `Brevo API error: ${errorMessage}`
    };
  }
}

/**
 * Gets a campaign by ID
 * @param campaignId Campaign ID
 * @returns Campaign details
 */
export async function getCampaign(campaignId: number) {
  try {
    const apiInstance = getBrevoClient();
    return await apiInstance.getEmailCampaign(campaignId);
  } catch (error) {
    Sentry.captureException(error, {
      tags: {
        component: 'brevo-integration',
        action: 'get-campaign'
      },
      extra: { campaignId }
    });
    throw error;
  }
}