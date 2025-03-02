import { getStripeClient } from './client';
import { findOrCreateCustomer } from './customers';
import type { StripeCheckoutInput } from './types';

/**
 * Create a new Stripe checkout session
 * @param priceId The Stripe price ID
 * @param origin The origin URL for success/cancel redirects
 * @param customerId The Stripe customer ID
 * @returns The created checkout session
 */
export async function createCheckoutSession(
  priceId: string, 
  origin: string, 
  customerId: string
) {
  const stripe = getStripeClient();
  
  // Validate inputs
  if (!priceId || !origin) {
    throw new Error('Missing required parameters: priceId and origin are required');
  }

  try {
    return await stripe.checkout.sessions.create({
      customer: customerId,
      line_items: [
        {
          price: priceId,
          quantity: 1
        }
      ],
      mode: 'payment',
      success_url: `${origin}/successful-purchase?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancel`,
      invoice_creation: {
        enabled: true
      }
    });
  } catch (err) {
    throw new Error(`Failed to create Stripe session: ${err.message}`);
  }
}

/**
 * Handle Stripe checkout flow - find/create customer and create checkout session
 * @param input Checkout input data (priceId, email)
 * @param origin The origin URL for success/cancel redirects
 * @returns The created checkout session with URL
 */
export async function handleCheckout(
  input: StripeCheckoutInput,
  origin: string
) {
  // Validate input
  if (!input.priceId || !input.email || !origin) {
    throw new Error('Missing required parameters: priceId, email, and origin are required');
  }
  
  // Find or create customer
  const customer = await findOrCreateCustomer(input.email);
  
  // Create checkout session with customer ID
  const session = await createCheckoutSession(input.priceId, origin, customer.id);
  
  return session;
}

/**
 * Retrieve an expanded checkout session with all related data
 * @param sessionId The Stripe checkout session ID
 * @returns The expanded session data
 */
export async function retrieveExpandedSession(sessionId: string) {
  const stripe = getStripeClient();
  
  return await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['payment_intent', 'invoice', 'customer', 'line_items', 'line_items.data.price.product']
  });
}