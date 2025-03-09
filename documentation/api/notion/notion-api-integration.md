# Notion API Integration

This documentation explains how the application integrates with Notion's API to manage clients, sessions, invoices, and other business data. It serves as the central data repository for the application, receiving data from multiple sources including Cal.com and Stripe.

## Overview

The Notion integration acts as the application's primary database, storing and managing:

1. Client information
2. Session/booking data
3. Invoice records
4. Package/product information
5. Dashboard metrics

The integration is built with a modular architecture that separates client initialization, data querying, record creation, and record updating into distinct functional areas.

## Architecture

```
┌───────────────┐     ┌─────────────────────┐     ┌───────────────────┐
│               │     │                     │     │                   │
│  Cal.com API  │────▶│                     │     │                   │
│               │     │                     │     │                   │
└───────────────┘     │                     │     │                   │
                      │                     │     │                   │
┌───────────────┐     │  Notion API Handler │────▶│  Notion Database  │
│               │     │  /api/notion/       │     │                   │
│  Stripe API   │────▶│  notion-handler     │     │                   │
│               │     │                     │     │                   │
└───────────────┘     │                     │     │                   │
                      │                     │     │                   │
┌───────────────┐     │                     │     │                   │
│               │     │                     │     │                   │
│   Zoom API    │────▶│                     │     │                   │
│               │     │                     │     │                   │
└───────────────┘     └─────────────────────┘     └───────────────────┘
```

## Notion Databases

The integration works with multiple Notion databases, each serving a specific purpose:

1. **Clients Database** - Stores client/customer information
2. **Sessions Database** - Tracks coaching sessions and appointments
3. **Invoices Database** - Records payment information
4. **Packages Database** - Stores product/service offerings
5. **Dashboard Metrics** - Maintains business metrics (revenue, client count, etc.)

Each database is configured in environment variables:

```
NOTION_CLIENTS_DB=...
NOTION_SESSIONS_DB=...
NOTION_INVOICES_DB=...
NOTION_PACKAGES_DB=...
NOTION_DASHBOARD_METRICS_DB=...
```

## API Endpoint

The primary endpoint for the Notion integration is:

```
/api/notion/notion-handler
```

This endpoint:
1. Receives requests from various parts of the application (Cal.com, Stripe, etc.)
2. Verifies the internal API key for security
3. Routes the event to the appropriate handler based on the event type
4. Returns the processed data or error message

## Event Types and Flow

The Notion handler processes various event types:

1. **BOOKING_CREATED** - From Cal.com when a new booking is created
2. **BOOKING_CANCELLED** - From Cal.com when a booking is cancelled
3. **BOOKING_RESCHEDULED** - From Cal.com when a booking is rescheduled
4. **MEETING_ENDED** - From Cal.com when a meeting has concluded
5. **CHECKOUT_SESSION_COMPLETE** - From Stripe when a payment is completed

### Event Flow

```
1. External event occurs (booking/payment/etc.)
2. Request is sent to /api/notion/notion-handler
3. Request is authenticated using INTERNAL_API_KEY
4. Event is routed to the appropriate handler function
5. Handler queries, creates, or updates Notion database records
6. Response is sent back to the caller
```

## Core Modules

The Notion integration is organized into functional modules:

### 1. Client Setup (`client.ts`)

Initializes the Notion client with the API token:

```typescript
export function setupNotionClient() {
  return new Client({
    auth: NOTION_API_TOKEN
  });
}
```

### 2. Queries (`queries.ts`)

Functions for searching and retrieving data from Notion databases:

- **findClientInNotion** - Finds a client by email
- **findSessionInNotion** - Finds a session by booking ID
- **findRelatedPackage** - Finds a package by name
- **findInvoice** - Finds an invoice by ID
- **findTotalClientsMetric**, **findTotalRevenueMetric**, etc. - Retrieve dashboard metrics

### 3. Creators (`creators.ts`)

Functions for creating new records in Notion databases:

- **createClientInNotion** - Creates a new client record
- **createSessionInNotion** - Creates a new session record
- **createInvoiceInNotion** - Creates a new invoice record
- **updateMetricInNotion** - Updates dashboard metrics

### 4. Updaters (`updaters.ts`)

Functions for updating existing records in Notion databases:

- **cancelSessionInNotion** - Marks a session as cancelled
- **updateSessionTimeDateInNotion** - Updates a session's date and time
- **updateSessionStatusBasedOnAttendeesInNotion** - Updates session status based on attendance

### 5. Handlers (`handlers.ts`)

Functions that handle specific event types and orchestrate the necessary operations:

- **handleNewBookingCreated** - Processes new bookings
- **handleBookingCancellation** - Processes booking cancellations
- **handleBookingReschedule** - Processes booking reschedules
- **handleMeetingEnded** - Processes meeting ended events
- **handleSuccessfulStripeCheckout** - Processes completed payments
- **handleNotionEvent** - Main router function that directs to specific handlers

## Security

The Notion integration includes several security measures:

1. **API Key Authentication** - All requests must include the INTERNAL_API_KEY
2. **Environment Variables** - All sensitive information is stored in environment variables
3. **Error Handling** - Comprehensive error handling with appropriate status codes

```typescript
// Authentication check
if (token !== INTERNAL_API_KEY) {
  return new Response('Unauthorized in notion handler', { status: 401 });
}
```

## Integration with Other Services

### Cal.com Integration

The Notion API receives booking data from Cal.com and:

1. Finds or creates the client record
2. Creates a new session record
3. Updates session records for rescheduled or cancelled bookings

### Stripe Integration

When payments are processed through Stripe:

1. The client record is found or created
2. The related package is located
3. A new invoice record is created

### Zoom Integration

After meetings end:

1. The session record is retrieved
2. Attendee data is fetched from Zoom
3. The session status is updated based on attendance

```typescript
// Example of Zoom integration
const zoomAttendeesRes = await event.fetch('/api/zoom/get-meeting-attendees', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${INTERNAL_API_KEY}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ zoomCallId })
});

zoomAttendees = await zoomAttendeesRes.json();
```

## Error Handling

The integration includes comprehensive error handling:

1. **Specific Error Messages** - Detailed error messages for debugging
2. **Appropriate Status Codes** - Correct HTTP status codes for different error types
3. **Error Logging** - All errors are logged for troubleshooting

```typescript
// Example error handling
try {
  // Operation code
} catch (err) {
  console.error('Error processing request:', err);
  
  if (err.status) {
    // Pass through SvelteKit errors
    throw err;
  }
  
  // Handle other errors
  return new Response(
    JSON.stringify({
      error: 'Internal server error',
      message: err.message
    }), 
    { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    }
  );
}
```

## Data Transformations

The integration handles various data transformations:

1. **Date Formatting** - Converts between ISO strings and Notion date objects
2. **Property Mapping** - Maps between different data structures
3. **Rich Text Conversion** - Converts strings to Notion's rich text format

```typescript
// Example of Notion property formatting
properties: {
  'Client Name': {
    title: [
      {
        text: {
          content: data.name
        }
      }
    ]
  },
  'Contact Email': {
    email: data.email
  }
}
```

## Business Logic

The integration implements various business rules:

1. **Client Status** - New clients start as "Prospects"
2. **Session Tracking** - Sessions are tracked through various statuses (Scheduled, Completed, Cancelled)
3. **Attendance Verification** - Session status is updated based on Zoom attendance data
4. **Dashboard Metrics** - Business metrics are automatically updated

## Conclusion

The Notion API integration serves as the backbone of the application's data management. It provides a structured way to store and manage clients, sessions, invoices, and metrics, while integrating with external services like Cal.com, Stripe, and Zoom.

The modular architecture separates concerns into client setup, querying, creation, and updating, making the codebase maintainable and extensible. The integration is secured with API key authentication and includes comprehensive error handling.

This system enables the application to maintain a complete record of business operations with minimal manual intervention, allowing for automated tracking of appointments, payments, and metrics.