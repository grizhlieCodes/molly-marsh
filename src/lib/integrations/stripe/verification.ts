import { getStripeClient } from './client';
import { STRIPE_SUCCESSFUL_CHECKOUT_SECRET } from '$env/static/private';

/**
 * Verify a Stripe webhook signature
 * @param body The raw webhook request body
 * @param signature The Stripe signature header
 * @returns The constructed Stripe event if valid
 * @throws Error if signature verification fails
 */
export function verifyStripeWebhook(body: string, signature: string) {
  const stripe = getStripeClient();
  
  if (!signature) {
    throw new Error('Missing Stripe signature header');
  }
  
  try {
    return stripe.webhooks.constructEvent(body, signature, STRIPE_SUCCESSFUL_CHECKOUT_SECRET);
  } catch (err) {
    // Handle signature verification errors
    if (err.message.includes('No signatures found')) {
      throw new Error('Invalid webhook signature');
    }
    
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