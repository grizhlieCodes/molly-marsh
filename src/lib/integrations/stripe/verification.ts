import { getStripeClient, isUsingSandbox } from './client';
import { STRIPE_SUCCESSFUL_CHECKOUT_SECRET, STRIPE_SB_SIGNING_SECRET } from '$env/static/private';

/**
 * Get the appropriate webhook secret based on environment
 * @returns The webhook secret for the current environment
 * @throws Error if the webhook secret is not defined
 */
export function getWebhookSecret(): string {
  const webhookSecret = isUsingSandbox() ? STRIPE_SB_SIGNING_SECRET : STRIPE_SUCCESSFUL_CHECKOUT_SECRET;
  
  if (!webhookSecret || webhookSecret.trim() === '') {
    throw new Error(
      `Missing Stripe webhook secret. ${isUsingSandbox() 
        ? 'Make sure STRIPE_SB_SIGNING_SECRET is defined in your .env file.' 
        : 'Make sure STRIPE_SUCCESSFUL_CHECKOUT_SECRET is defined in your .env file.'}`
    );
  }
  
  return webhookSecret;
}

/**
 * Verify a Stripe webhook signature
 * @param body The raw webhook request body
 * @param signature The Stripe signature header
 * @returns The constructed Stripe event if valid
 * @throws Error if signature verification fails
 */
export function verifyStripeWebhook(body: string, signature: string) {
  if (!signature) {
    throw new Error('Missing Stripe signature header');
  }
  
  try {
    const stripe = getStripeClient();
    const webhookSecret = getWebhookSecret();
    
    return stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    // Handle signature verification errors
    if (err.message.includes('No signatures found')) {
      throw new Error('Invalid webhook signature');
    }
    
    console.error('Webhook verification error:', err);
    throw new Error(`Webhook signature verification failed: ${err.message}`);
  }
}

/**
 * Check if a webhook event is of the expected type
 * @param event The Stripe event
 * @param expectedType The expected event type
 * @returns true if event type matches, false otherwise
 */
export function isEventType(event: any, expectedType: string): boolean {
  return event.type === expectedType;
}