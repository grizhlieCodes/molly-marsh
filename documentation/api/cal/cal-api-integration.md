# Cal.com API Integration

This documentation explains how the application integrates with Cal.com's booking system through webhooks and handles various event types (bookings, reschedules, cancellations, and meeting end events).

## Overview

The Cal.com integration enables the application to automatically process booking events and synchronize them with other systems, primarily Notion. When events occur in Cal.com (like new bookings or cancellations), webhooks send these events to the application, which then processes them and updates corresponding records in Notion.

## Architecture

```
┌─────────────────┐     ┌──────────────────────┐     ┌────────────────────┐
│                 │     │                      │     │                    │
│    Cal.com      │────▶│ /api/cal/handle-cal- │────▶│  Notion Database   │
│ (Webhook Events)│     │       event          │     │                    │
│                 │     │                      │     │                    │
└─────────────────┘     └──────────────────────┘     └────────────────────┘
                               │
                               │ (Security)
                               ▼
                        ┌──────────────────┐
                        │                  │
                        │  Signature       │
                        │  Verification    │
                        │                  │
                        └──────────────────┘
```

## Cal.com Webhook Endpoint

The primary endpoint for receiving Cal.com webhook events is:

```
/api/cal/handle-cal-event
```

This endpoint:
1. Receives webhook events from Cal.com
2. Verifies the webhook signature for security
3. Routes the event to the appropriate handler based on the event type
4. Communicates with Notion to update relevant records

## Event Types and Handlers

The integration handles four main event types from Cal.com:

1. **BOOKING_CREATED** - When a new booking is created
2. **BOOKING_RESCHEDULED** - When a booking's time is changed
3. **BOOKING_CANCELLED** - When a booking is cancelled
4. **MEETING_ENDED** - When a meeting has concluded

Each event type has a dedicated handler function that processes the specific requirements of that event.

### Event Flow

```
1. Cal.com event occurs (booking/reschedule/cancel/meeting end)
2. Cal.com sends webhook to /api/cal/handle-cal-event
3. Signature is verified using CAL_WEBHOOK_SECRET
4. Event payload is validated using Zod schemas
5. Event is routed to the appropriate handler
6. Handler communicates with Notion API
7. Response is sent back to Cal.com
```

## Security

The integration implements strong security measures to ensure that only legitimate requests from Cal.com are processed:

1. **Signature Verification** - Each webhook request includes an `x-cal-signature-256` header that is verified using HMAC-SHA256
2. **Timing-Safe Comparison** - Prevents timing attacks during signature verification
3. **Environment Variables** - Secrets are stored in environment variables, not in code
4. **Schema Validation** - All incoming data is strictly validated using Zod schemas

## Data Schemas

The integration uses Zod schemas to validate and transform the data received from Cal.com:

1. **calBookingSchema** - For new booking events
2. **calRescheduledSchema** - For rescheduled booking events
3. **calCancellationSchema** - For cancelled booking events
4. **calMeetEndedSchema** - For meeting ended events

These schemas ensure that the data is properly structured before processing and transform the raw Cal.com format into a more usable format for the application.

### Example Schema (Simplified)

```typescript
export const calBookingSchema = z
  .object({
    triggerEvent: z.string(),
    payload: z.object({
      // Fields from Cal.com
    })
  })
  .transform((data) => ({
    // Transformed fields for the application
    triggerEvent: data.triggerEvent,
    bookingType: data.payload.type,
    bookingTitle: data.payload.title,
    clientName: data.payload.responses.name.value,
    clientEmail: data.payload.responses.email.value,
    // Additional transformed fields...
  }));
```

## Integration with Notion

After processing Cal.com events, the integration communicates with Notion to:

1. **Create or find clients** - Look up existing clients or create new ones
2. **Create sessions** - Create new session records for bookings
3. **Update sessions** - Update session details for rescheduled bookings
4. **Cancel sessions** - Mark sessions as cancelled
5. **Update meeting status** - Update session status when meetings end

This is done by sending requests to the Notion API handler:

```typescript
const notionResponse = await event.fetch('/api/notion/notion-handler', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${INTERNAL_API_KEY}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(parsedData)
});
```

## Notion API Handler

The Notion API handler (`/api/notion/notion-handler`) receives requests from the Cal.com integration and performs the necessary operations in Notion:

1. **Authentication** - Verifies the internal API key
2. **Event Routing** - Routes to the appropriate Notion handler based on the event type
3. **Database Operations** - Performs the necessary operations in the Notion database
4. **Response** - Returns the result to the calling function

## Implementation Details

### Webhook Verification

```typescript
export function verifyCalWebhook(payload: string, signature: string): boolean {
  const hmac = createHmac('sha256', CAL_WEBHOOK_SECRET);
  const minifiedPayload = JSON.stringify(JSON.parse(payload));
  hmac.update(minifiedPayload);
  const calculatedSignature = hmac.digest('hex');
  try {
    return timingSafeEqual(Buffer.from(calculatedSignature, 'hex'), Buffer.from(signature, 'hex'));
  } catch (err) {
    console.error('Signature comparison error:', err);
    return false;
  }
}
```

### Event Routing

```typescript
export const handleCalEvent = async (calData: any, event: RequestEvent) => {
  const eventName = calData.triggerEvent as string;

  switch (eventName) {
    case 'BOOKING_CREATED':
      return await handleBookingCreated(calData, event);
    case 'BOOKING_RESCHEDULED':
      return await handleBookingRescheduled(calData, event);
    case 'BOOKING_CANCELLED':
      return await handleBookingCancelled(calData, event);
    case 'MEETING_ENDED':
      return await handleMeetingEnded(calData, event);
    default:
      throw error(400, `Unsupported Event Type: ${eventName} `);
  }
};
```

## Configuration

The integration requires the following environment variables:

1. **CAL_WEBHOOK_SECRET** - The secret used to verify webhook signatures
2. **INTERNAL_API_KEY** - Used for internal API communication

## Error Handling

The integration includes comprehensive error handling:

1. **Validation Errors** - Handled by Zod schema validation
2. **Signature Errors** - Return 401 Unauthorized responses
3. **Processing Errors** - Return appropriate error status codes and messages
4. **Logging** - All errors are logged for debugging

## Conclusion

The Cal.com API integration provides a robust system for managing booking events and synchronizing them with Notion. The architecture follows best practices for webhooks, including security verification, data validation, and clear error handling. The modular design allows for easy extension to handle additional event types or integrations with other systems beyond Notion.