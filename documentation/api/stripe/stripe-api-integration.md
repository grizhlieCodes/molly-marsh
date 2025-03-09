# Stripe API Integration

This documentation explains how the application integrates with Stripe for payment processing, checkout flows, and webhook handling. The integration provides secure payment processing for customers while maintaining records in Notion.

## Overview

The Stripe integration serves several core functions in the application:

1. **Checkout Process** - Creating and managing checkout sessions
2. **Customer Management** - Creating and updating customer records
3. **Webhook Handling** - Processing post-payment events
4. **Integration with Notion** - Synchronizing payment data to Notion
5. **Email Notifications** - Sending confirmation emails after successful purchases

The integration leverages Stripe's official Node.js SDK and implements industry-standard security practices.

## Architecture

```
┌───────────────┐     ┌──────────────────────┐     ┌───────────────┐
│               │     │                      │     │               │
│  Client-side  │────▶│ /api/stripe/checkout │────▶│  Stripe API   │
│  Checkout     │     │                      │     │               │
│               │     └──────────────────────┘     └───────┬───────┘
└───────────────┘                                         │
                                                          │
                                                          ▼
                  ┌──────────────────────┐     ┌───────────────────┐
                  │                      │     │                   │
                  │ /api/stripe/handle-  │◀────┤  Stripe Webhooks  │
                  │ successful-checkout  │     │                   │
                  │                      │     └───────────────────┘
                  └──────────┬───────────┘
                             │
                ┌────────────┼───────────┐
                │            │           │
                ▼            ▼           ▼
        ┌──────────────┐ ┌────────┐ ┌─────────┐
        │              │ │        │ │         │
        │  Notion API  │ │ Emails │ │ Receipt │
        │              │ │        │ │         │
        └──────────────┘ └────────┘ └─────────┘
```

## Core Components

### Client Setup

The integration sets up the Stripe client with appropriate API keys based on the environment:

```typescript
export function setupStripeClient() {
  const secretKey = dev ? STRIPE_SB_SECRET_KEY : STRIPE_SECRET_KEY;
  return new Stripe(secretKey, {
    apiVersion: '2024-11-20.acacia'
  });
}

// Singleton pattern for efficiency
let stripeClient: Stripe | null = null;

export function getStripeClient() {
  if (!stripeClient) {
    stripeClient = setupStripeClient();
  }
  return stripeClient;
}
```

### API Endpoints

The integration exposes two primary API endpoints:

1. **`/api/stripe/checkout`** - Creates checkout sessions
   - Validates the request data (price ID and email)
   - Finds or creates a Stripe customer
   - Creates a checkout session
   - Returns a URL for the client to redirect to Stripe's hosted checkout

2. **`/api/stripe/handle-successful-checkout`** - Processes webhook events
   - Verifies the webhook signature
   - Routes the event to the appropriate handler
   - Updates Notion records
   - Sends confirmation emails

### Checkout Flow

The checkout process follows these steps:

1. **Customer lookup** - Find existing customer or create a new one
2. **Session creation** - Create a Stripe checkout session with product details
3. **Client redirect** - Return checkout URL for client-side redirect
4. **Webhook processing** - Handle the completed checkout via webhook
5. **Data synchronization** - Update Notion with payment details
6. **Email confirmation** - Send purchase confirmation email

```typescript
// Example of checkout session creation
export async function createCheckoutSession(priceId: string, origin: string, customerId: string): Promise<Stripe.Checkout.Session> {
  const stripe = getStripeClient();

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
    cancel_url: `${origin}`,
    invoice_creation: {
      enabled: true
    }
  });
}
```

### Customer Management

The integration includes functionality for customer management:

1. **Finding customers** - Looking up customers by email
2. **Creating customers** - Creating new customers with email and optional name
3. **Updating customers** - Updating customer records with additional information

```typescript
export async function findCustomerByEmail(email: string): Promise<Stripe.Customer | null> {
  const stripe = getStripeClient();

  try {
    const customers = await stripe.customers.list({ email });
    return customers.data.length > 0 ? customers.data[0] : null;
  } catch (err) {
    // Error handling...
  }
}

export async function createCustomer(email: string, name?: string): Promise<Stripe.Customer> {
  const stripe = getStripeClient();

  try {
    let customerData = { email };
    if (name) {
      customerData.name = name;
    }
    return await stripe.customers.create(customerData);
  } catch (err) {
    // Error handling...
  }
}
```

## Webhook Handling

Webhooks are a critical part of the Stripe integration, allowing the application to react to payment events:

### Signature Verification

All webhooks are verified using Stripe's signature verification:

```typescript
export function verifyStripeWebhook(body: string, signature: string): Stripe.Event {
  const stripe = getStripeClient();
  const stripeSigningSecret = dev ? STRIPE_SB_SIGNING_SECRET : STRIPE_SIGNING_SECRET;
  
  return stripe.webhooks.constructEvent(body, signature, stripeSigningSecret);
}
```

### Event Router

The webhook handler routes events to specific handlers based on the event type:

```typescript
export async function handleStripeEvent(stripeEvent: Stripe.Event, event: RequestEvent) {
  try {
    switch (stripeEvent.type) {
      case 'checkout.session.completed':
        return await handleCheckoutSessionCompleted(stripeEvent.data.object as Stripe.Checkout.Session, event);
      
      // Additional event handlers...
      
      default:
        // Log unhandled event types
        return {
          received: true,
          message: `Event type ${stripeEvent.type} was received but not processed`
        };
    }
  } catch (err) {
    // Error handling...
  }
}
```

### Checkout Session Completion

The most important webhook event is `checkout.session.completed`, which:

1. Retrieves detailed session data
2. Updates customer information if needed
3. Creates records in Notion
4. Sends confirmation emails to customers

## Integration with Notion

After successful payments, the Stripe integration creates records in Notion:

1. **Creates/Updates Customer** - Maintains customer data in Notion
2. **Creates Invoice Record** - Records payment details
3. **Links to Products** - Associates payments with product records

```typescript
// Sending checkout data to Notion
const notionResponse = await event.fetch('/api/notion/notion-handler', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${INTERNAL_API_KEY}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    triggerEvent: 'CHECKOUT_SESSION_COMPLETE',
    ...finalSessionData
  })
});
```

## Email Notifications

After successful checkout and Notion record creation, confirmation emails are sent:

```typescript
// Sending checkout confirmation email
const emailResponse = await event.fetch('/api/email/send-email', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    type: 'checkout-confirmation',
    data: {
      customer_name: customerData.customer.name,
      customer_email: customerData.customer.email
    }
  }),
  duplex: 'half'
});
```

## Data Schemas

The integration uses Zod schemas for data validation:

### Checkout Input Schema

```typescript
export const stripeCheckoutInputSchema = z.object({
  priceId: z.string().min(1, 'Price ID is required'),
  email: z.string().email('Valid email is required')
});
```

### Session Data Schema

```typescript
export const stripeSuccessfulSessionSchema = z
  .object({
    // Schema definition...
  })
  .transform((data) => ({
    session_id: data.id,
    session_customer_name: data.customer_details.name,
    session_customer_email: data.customer_details.email,
    // Additional transformed fields...
  }));
```

## Security

The integration implements several security measures:

1. **Environment-Specific Keys** - Different keys for development and production
2. **Webhook Signature Verification** - Validating that webhooks come from Stripe
3. **Data Validation** - Strict validation of input and output data
4. **Error Handling** - Comprehensive error handling with minimal information exposure

## Error Handling and Monitoring

The integration includes robust error handling and monitoring:

1. **Multiple Safety Nets** - Multiple layers of error checking and validation
2. **Sentry Integration** - Detailed error logging to Sentry
3. **Contextual Error Information** - Rich context for debugging
4. **User-Friendly Errors** - Appropriate error messages for users

```typescript
// Example of error handling with Sentry
try {
  // Operation code
} catch (err) {
  // Log to Sentry with detailed context
  Sentry.captureException(err, {
    tags: {
      component: 'stripe-integration',
      action: 'create-checkout-session'
    },
    extra: {
      priceId,
      origin,
      customerId
    }
  });
  
  throw new Error(`Failed to create Stripe session: ${err.message}`);
}
```

## Retry Logic

The integration includes retry logic for certain operations:

```typescript
// Example of retry logic for session data
export async function waitForSessionData(sessionId: string, maxAttempts = 5, delayMs = 750) {
  let attempts = 0;
  let lastError = null;

  while (attempts < maxAttempts) {
    try {
      const session = await retrieveCheckoutSession(sessionId);
      const parsedSession = stripeSuccessfulSessionSchema.parse(session);
      
      if (parsedSession.invoice_id && parsedSession?.products?.data?.length > 0) {
        return parsedSession;
      }
    } catch (err) {
      // Handle errors during retry
      lastError = err;
    }

    await new Promise((resolve) => setTimeout(resolve, delayMs));
    attempts++;
  }
  
  // Handle failure after all attempts
  throw error(500, {
    message: `Failed to retrieve complete session data after ${maxAttempts} attempts.`
  });
}
```

## Configuration

The integration requires the following environment variables:

### Production Variables
- **STRIPE_SECRET_KEY** - Production API key
- **STRIPE_SIGNING_SECRET** - Production webhook signing secret

### Development Variables
- **STRIPE_SB_SECRET_KEY** - Sandbox/test API key
- **STRIPE_SB_SIGNING_SECRET** - Sandbox/test webhook signing secret

### Internal Communication
- **INTERNAL_API_KEY** - Key for secure internal API communication

## Conclusion

The Stripe API integration provides secure and reliable payment processing for the application. The integration follows best practices for security, error handling, and reliability, leveraging Stripe's official SDK and webhook system.

The modular architecture separates concerns into client setup, checkout, customer management, and webhook handling, making the codebase maintainable and extensible. The integration with Notion and email services ensures that payment information is properly recorded and customers are notified of successful purchases.

By implementing comprehensive monitoring and error handling with Sentry, the system is designed to provide valuable debugging information while maintaining security and user privacy.