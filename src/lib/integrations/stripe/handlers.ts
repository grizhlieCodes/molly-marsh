import { error, json } from '@sveltejs/kit';
import { getStripeClient } from './client';
import { updateCustomerNameIfMissing } from './customers';
import { retrieveExpandedSession } from './checkout';
import { verifyStripeWebhook, isEventType } from './verification';
import { stripeCheckoutSessionSchema } from './schemas';
import { sendSuccessfulCheckoutSessionConfirmationEmail } from '$lib/email/serverEmailHandler.js';
import { INTERNAL_API_KEY } from '$env/static/private';
import type { NotionResponse, CheckoutEmailData } from './types';

/**
 * Handle data transfer to Notion for successful checkout
 * @param stripeData The parsed and transformed Stripe checkout data
 * @param requestFetch Fetch function from the request event
 * @returns Response from Notion
 */
export async function handleNotionIntegration(stripeData: any, requestFetch: Function): Promise<NotionResponse> {
  try {
    const notionResponse = await requestFetch('/api/notion/notion-handler', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${INTERNAL_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ triggerEvent: "CHECKOUT_SESSION_COMPLETE", ...stripeData })
    });

    if (!notionResponse.ok) {
      throw new Error(`HTTP ERROR at notionResponse! Status: ${notionResponse.status}`);
    }

    return await notionResponse.json();
  } catch (err) {
    console.error('Error during sending data to notion in checkout handler:', err);
    throw err;
  }
}

/**
 * Process successful checkout notification
 * @param emailData The customer data for the notification
 * @returns Email sending result
 */
export async function sendCheckoutNotification(emailData: CheckoutEmailData) {
  try {
    return await sendSuccessfulCheckoutSessionConfirmationEmail(emailData);
  } catch (err) {
    console.error('Error sending checkout notification email:', err);
    throw err;
  }
}

/**
 * Main webhook handler for successful checkout completion
 * @param requestBody The raw webhook request body
 * @param signature The Stripe signature header
 * @param requestFetch Fetch function from the request event
 * @returns Processing result
 */
export async function handleSuccessfulCheckout(
  requestBody: string,
  signature: string,
  requestFetch: Function
) {
  try {
    // 1. Verify the webhook signature
    const stripeEvent = verifyStripeWebhook(requestBody, signature);
    
    // 2. Check if this is a checkout.session.completed event
    if (!isEventType(stripeEvent, 'checkout.session.completed')) {
      return json({
        received: true,
        message: 'Event type not handled'
      });
    }
    
    // 3. Get the session data from the event
    const sessionData = stripeEvent.data.object;
    
    if (!sessionData) {
      throw error(400, 'No session data in webhook');
    }
    
    if (!sessionData.customer) {
      throw error(400, 'No customer in session');
    }
    
    // 4. Retrieve expanded session data
    const expandedSessionData = await retrieveExpandedSession(sessionData.id);
    
    // 5. Parse and transform the data
    const finalSessionData = stripeCheckoutSessionSchema.parse(expandedSessionData);
    
    // 6. Update customer name if missing
    const customerData = await updateCustomerNameIfMissing(
      finalSessionData.customer_id, 
      finalSessionData.session_customer_name
    );
    
    if (!customerData?.customer?.email || !customerData?.customer?.name) {
      throw error(400, 'Missing required customer data');
    }
    
    // 7. Send data to Notion
    const notionResponse = await handleNotionIntegration(finalSessionData, requestFetch);
    
    if (!notionResponse.ok) {
      throw error(400, `HTTP ERROR at stripe checkout notionResponse! Status: ${notionResponse.status}`);
    }
    
    // 8. Send confirmation email
    await sendCheckoutNotification({
      customer_name: customerData.customer.name,
      customer_email: customerData.customer.email
    });
    
    return json({ 
      received: true, 
      message: 'Webhook processed successfully' 
    });
  } catch (err) {
    // If it's already a SvelteKit error, rethrow it
    if (err.status) {
      throw err;
    }
    
    // For specific known errors, return appropriate errors
    if (err.message.includes('Invalid webhook signature')) {
      throw error(400, 'Invalid webhook signature');
    }
    
    // For unexpected errors
    console.error('Webhook Error:', err);
    throw error(500, 'Internal server error processing webhook');
  }
}