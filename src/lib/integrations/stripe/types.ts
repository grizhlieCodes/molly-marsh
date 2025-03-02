import { z } from 'zod';
import { stripeCheckoutSessionSchema, stripeSuccessSessionSchema, stripeCheckoutInputSchema } from './schemas';

/**
 * Types derived from Zod schemas
 */
export type StripeCheckoutSession = z.infer<typeof stripeCheckoutSessionSchema>;
export type StripeSuccessSession = z.infer<typeof stripeSuccessSessionSchema>;
export type StripeCheckoutInput = z.infer<typeof stripeCheckoutInputSchema>;

/**
 * Response type for customer operations
 */
export interface CustomerResponse {
  customer: any;
  status: string;
}

/**
 * Type for successful checkout notification data
 */
export interface CheckoutEmailData {
  customer_name: string;
  customer_email: string;
}

/**
 * Type for Notion response from webhook handler
 */
export interface NotionResponse {
  ok: boolean;
  status?: number;
  message?: string;
}