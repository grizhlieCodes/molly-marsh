// Export all public APIs from Stripe integration

// Client
export { getStripeClient } from './client';

// Types
export type { 
  StripeCheckoutSession,
  StripeSuccessSession,
  StripeCheckoutInput,
  CustomerResponse,
  CheckoutEmailData,
  NotionResponse
} from './types';

// Schemas
export { 
  stripeCheckoutSessionSchema,
  stripeSuccessSessionSchema,
  stripeCheckoutInputSchema
} from './schemas';

// Customer operations
export {
  findCustomerByEmail,
  createCustomer,
  findOrCreateCustomer,
  updateCustomerNameIfMissing
} from './customers';

// Checkout operations
export {
  createCheckoutSession,
  handleCheckout,
  retrieveExpandedSession
} from './checkout';

// Webhook verification
export {
  verifyStripeWebhook,
  isEventType
} from './verification';

// Webhook handlers
export {
  handleSuccessfulCheckout,
  handleNotionIntegration,
  sendCheckoutNotification
} from './handlers';

// Invoice operations (minimal as download functionality will be removed)
export {
  getInvoice,
  getInvoicePdfUrl
} from './invoices';