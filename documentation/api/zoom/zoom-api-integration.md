# Zoom API Integration

This documentation explains how the application integrates with Zoom's API to retrieve meeting attendance data. The integration is primarily used to track client attendance at coaching sessions, which helps maintain accurate session records in Notion.

## Overview

The Zoom integration serves a specific purpose in the application:

- Retrieving attendance data for completed meetings
- Supporting the session status tracking workflow
- Helping determine if sessions actually took place

Unlike other integrations in the application, the Zoom integration is minimal and focused on this single use case, consisting of a single API endpoint that retrieves meeting participants.

## Architecture

```
┌───────────────┐     ┌──────────────────────┐     ┌───────────────┐
│               │     │                      │     │               │
│   Cal.com     │     │  Notion Integration  │     │   Zoom API    │
│  (Meeting     │────▶│  (Meeting Ended      │────▶│  (Attendees)  │
│   Ended)      │     │   Handler)           │     │               │
│               │     │                      │     │               │
└───────────────┘     └──────────────────────┘     └───────┬───────┘
                                │                          │
                                │                          │
                                │                          │
                                ▼                          ▼
                      ┌──────────────────┐      ┌───────────────────┐
                      │                  │      │                   │
                      │ Notion Database  │◀─────┤ /api/zoom/get-    │
                      │ (Session Status) │      │ meeting-attendees │
                      │                  │      │                   │
                      └──────────────────┘      └───────────────────┘
```

## API Endpoint

The application exposes a single Zoom API endpoint:

```
/api/zoom/get-meeting-attendees
```

This endpoint:
1. Accepts a Zoom meeting ID via POST request
2. Authenticates with Zoom using OAuth 2.0 client credentials
3. Fetches participant data for the specified meeting
4. Returns the participant list as JSON

## Implementation

The endpoint is implemented in `/src/routes/api/zoom/get-meeting-attendees/+server.ts`:

```typescript
import { INTERNAL_API_KEY } from '$env/static/private';
import { json, error } from '@sveltejs/kit';
import { z } from 'zod';
import type { RequestHandler } from './$types.js';
import {ZOOM_ACCOUNT_ID, ZOOM_CLIENT_ID, ZOOM_CLIENT_SECRET} from '$env/static/private'

export const POST: RequestHandler = async (event) => {
    try {
        // 1. Get Zoom access token
        const authString = Buffer.from(`${ZOOM_CLIENT_ID}:${ZOOM_CLIENT_SECRET}`).toString('base64');
        const tokenResponse = await event.fetch(
            `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${ZOOM_ACCOUNT_ID}`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Basic ${authString}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        
        const { access_token } = await tokenResponse.json();

        // 2. Get meeting participants using the token
        const { zoomCallId } = await event.request.json();
        
        const participantsResponse = await fetch(
            `https://api.zoom.us/v2/past_meetings/${zoomCallId}/participants`, 
            {
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        const participants = await participantsResponse.json();
        
        return json(participants);

    } catch (error) {
        console.error('Error fetching meeting participants:', error);
        return json({ error: 'Failed to fetch participants' }, { status: 500 });
    }
};
```

## Authentication Flow

The integration uses OAuth 2.0 with the account credentials flow:

1. Base64 encode the client ID and secret
2. Request an access token from Zoom's OAuth endpoint
3. Use the token for subsequent API requests

```typescript
// Create authorization string
const authString = Buffer.from(`${ZOOM_CLIENT_ID}:${ZOOM_CLIENT_SECRET}`).toString('base64');

// Request access token
const tokenResponse = await event.fetch(
    `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${ZOOM_ACCOUNT_ID}`,
    {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${authString}`,
            'Content-Type': 'application/json'
        }
    }
);

const { access_token } = await tokenResponse.json();
```

## Integration with Notion

This API endpoint is primarily called from the Notion integration's meeting ended handler:

```typescript
// From Notion's handleMeetingEnded function
const zoomCallId = calSession.properties['Zoom Meet ID'].rich_text[0].text.content;

if (!zoomCallId) {
    throw error(400, 'No Zoom call ID found');
}

// Get Zoom meeting attendees
let zoomAttendees;
try {
    const zoomAttendeesRes = await event.fetch('/api/zoom/get-meeting-attendees', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${INTERNAL_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ zoomCallId })
    });

    zoomAttendees = await zoomAttendeesRes.json();
} catch (err) {
    console.error('Error fetching Zoom attendees:', err);
    // Continue execution instead of throwing an error
}

// Update session status based on attendees
const updatedSession = await updateSessionStatusBasedOnAttendeesInNotion(calSession.id, zoomAttendees);
```

## Use in Session Status Workflow

The attendance data is used to determine the session status in Notion:

1. When Cal.com sends a "meeting ended" event, the application retrieves the associated Zoom call ID from Notion
2. The application calls the Zoom API to get attendance data
3. Based on the attendance data, the session status in Notion is updated:
   - If both the coach and client attended, status is "Completed"
   - If only the coach attended, status is "No Show"
   - If neither attended, status is "Session Never Took Place"

## Configuration

The integration requires the following environment variables:

1. **ZOOM_ACCOUNT_ID** - Zoom account ID for client credentials flow
2. **ZOOM_CLIENT_ID** - Client ID from Zoom App credentials
3. **ZOOM_CLIENT_SECRET** - Client secret from Zoom App credentials

## Error Handling

The integration includes basic error handling:

1. Catches and logs errors during token acquisition and API calls
2. Returns a 500 status with generic error message on failure
3. The Notion integration is designed to continue even if Zoom data retrieval fails

## Security Considerations

Although this is a simple integration, it implements several security best practices:

1. **No token caching** - Fetches a fresh token for each request
2. **Environment variables** - All credentials stored as environment variables
3. **Minimal scope** - Only implements the specific API call needed
4. **Error handling** - Does not expose sensitive information in error responses

## Limitations

The current implementation has some limitations:

1. **No token caching** - Gets a new token for each request, which is less efficient
2. **Limited error handling** - Could be enhanced with more detailed error responses
3. **No retry logic** - Does not retry failed requests
4. **Single purpose** - Only retrieves meeting participants, no other Zoom functionality

## Conclusion

The Zoom API integration provides a focused solution for retrieving attendance data from Zoom meetings. This data is critical for the session status workflow, helping to automatically determine whether sessions took place and updating Notion records accordingly.

The integration is minimal but effective, implementing the OAuth 2.0 client credentials flow and making a single API call to retrieve participant data. While there are opportunities for enhancement (such as token caching and improved error handling), the current implementation meets the application's needs for tracking session attendance.