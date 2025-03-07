// src/lib/integrations/notion/updaters.ts
import { error } from '@sveltejs/kit';
import { setupNotionClient } from './client';

/**
 * Updates a session in Notion to mark it as cancelled
 * @param calData Cancellation data from Cal.com
 * @param pageId Notion page ID for the session
 * @returns Updated page data
 */
export async function cancelSessionInNotion(calData, pageId) {
  const notion = setupNotionClient();

  try {
    const res = await notion.pages.update({
      page_id: pageId,
      properties: {
        'Meeting Status': {
          select: {
            name: 'Cancelled'
          }
        },
        'Cancellation Reason': {
          rich_text: [
            {
              text: {
                content: calData.cancellationReason || ''
              }
            }
          ]
        }
      }
    });

    return res;
  } catch (err) {
    console.error('Error updating Notion session:', err);
    throw error(500, `Failed to update Notion Session page: ${err.message}`);
  }
}

/**
 * Updates a session's date and time in Notion
 * @param calData Rescheduling data from Cal.com
 * @param sessionPageId Notion page ID for the session
 * @returns Updated page data
 */
export async function updateSessionTimeDateInNotion(calData, sessionPageId) {
  const notion = setupNotionClient();

  try {
    const res = await notion.pages.update({
      page_id: sessionPageId,
      properties: {
        'Date of Session': {
          date: {
            start: calData.bookingStartTime,
            end: calData.bookingEndTime
          }
        }
      }
    });

    return res;
  } catch (err) {
    console.error('Error updating Notion session:', err);
    throw error(500, `Failed to update Notion Session time/date page: ${err.message}`);
  }
}

/**
 * Updates a session's status based on meeting attendees
 * @param sessionPageId Notion page ID for the session
 * @param attendees Zoom meeting attendees data
 * @returns Updated page data
 */
export async function updateSessionStatusBasedOnAttendeesInNotion(sessionPageId, attendees) {
  const notion = setupNotionClient();

  // Determine meeting status:
  // - "Session Never Took Place" if attendees is undefined or missing participants
  // - "Took Place" if 2+ participants
  // - "Client No Show" if fewer than 2 participants
  let name = 'Session Never Took Place';
  
  if (attendees && attendees.participants) {
    name = attendees.participants.length >= 2 ? 'Took Place' : 'Client No Show';
  }
  
  try {
    const res = await notion.pages.update({
      page_id: sessionPageId,
      properties: {
        'Meeting Status': {
          select: {
            name
          }
        }
      }
    });

    return res;
  } catch (err) {
    console.error('Error updating Notion session:', err);
    throw error(500, `Failed to update Notion Session status: ${err.message}`);
  }
}