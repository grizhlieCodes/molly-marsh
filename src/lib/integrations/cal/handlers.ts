import { error } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';
import { INTERNAL_API_KEY } from '$env/static/private';
import { calBookingSchema, calCancellationSchema, calRescheduledSchema, calMeetEndedSchema } from './schemas';

/**
 * Handles a booking created webhook event
 */

export const handleBookingCreated = async (calData, event) => {
	const parsedCreatedBooking = calBookingSchema.parse(calData);

	try {
		const notionResponse = await event.fetch('/api/notion/notion-handler', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${INTERNAL_API_KEY}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(parsedCreatedBooking)
		});

		if (!notionResponse.ok) {
			throw new Error(`HTTP ERROR at notionResponse! Status:  ${notionResponse.status}`);
		}

		const result = await notionResponse.json();

		return result;
	} catch (err) {
		console.error('Error during sending data to notion in cal handler api:', err);
		throw err;
	}
};
/**
 * Handles a booking rescheduled webhook event
 */
export const handleBookingRescheduled = async (calData, event) => {
	const parsedRescheduledBooking = calRescheduledSchema.parse(calData);
	try {
		const notionResponse = await event.fetch('/api/notion/notion-handler', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${INTERNAL_API_KEY}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(parsedRescheduledBooking)
		});

		if (!notionResponse.ok) {
			throw new Error(`HTTP ERROR at notionResponse! Status:  ${notionResponse.status}`);
		}

		const result = await notionResponse.json();

		return result;
	} catch (err) {
		console.error('Error during sending data to notion during booking reschedule:', err);
		throw err;
	}
};

export const handleBookingCancelled = async (calData, event) => {
	const parsedCancellationData = calCancellationSchema.parse(calData);

	try {
		const notionResponse = await event.fetch('/api/notion/notion-handler', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${INTERNAL_API_KEY}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(parsedCancellationData)
		});

		if (!notionResponse.ok) {
			throw new Error(`HTTP ERROR at notionResponse! Status:  ${notionResponse.status}`);
		}

		const result = await notionResponse.json();

		return result;
	} catch (error) {
		console.error('Error during sending data to notion in cal handler api:', error);
		throw error;
	}
};
/**
 * Handles a meeting ended webhook event
 */
export const handleMeetingEnded = async (calData, event) => {
	// console.log('Meet ended cal data', calData);
	const parsedMeetingEnded = calMeetEndedSchema.parse(calData);
	console.log('meet cal parsed Data', parsedMeetingEnded);
	try {
		const notionResponse = await event.fetch('/api/notion/notion-handler', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${INTERNAL_API_KEY}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(parsedMeetingEnded)
		});

		if (!notionResponse.ok) {
			throw new Error(`HTTP ERROR at notionResponse! Status:  ${notionResponse.status}`);
		}

		const result = await notionResponse.json();

		return result;
	} catch (err) {
		console.error('Error during sending data to notion during booking reschedule:', err);
		throw err;
	}
};

/**
 * Routes the webhook event to the appropriate handler based on the event type
 */
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
