import { INTERNAL_API_KEY } from '$env/static/private';
import { json, error } from '@sveltejs/kit';
import { z } from 'zod';
import type { RequestHandler } from './$types.js';
import {ZOOM_ACCOUNT_ID, ZOOM_CLIENT_ID, ZOOM_CLIENT_SECRET} from '$env/static/private'

export const POST: RequestHandler = async (event) => {
    try {
        // 1. Get Zoom access token
        const authString = Buffer.from(`${ZOOM_CLIENT_ID}:${ZOOM_CLIENT_SECRET}`).toString('base64');
        const tokenResponse = await event.fetch(`https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${ZOOM_ACCOUNT_ID}`, {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${authString}`,
                'Content-Type': 'application/json'
            }
        });
        
        const { access_token } = await tokenResponse.json();

        console.log("Access token from Zoom: ", access_token)

        // 2. Get meeting participants
        // Assuming meetingId comes from request body
        const { zoomCallId } = await event.request.json();

        console.log("Consoling meeting ID from Zoom: ", zoomCallId)
        
        const participantsResponse = await fetch(
            `https://api.zoom.us/v2/past_meetings/${zoomCallId}/participants`, {
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
