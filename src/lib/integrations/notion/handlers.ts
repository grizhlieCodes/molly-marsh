// src/lib/integrations/notion/handlers.ts
import { error, json } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';
import { INTERNAL_API_KEY } from '$env/static/private';
import { findClientInNotion, findRelatedPackage, findSessionInNotion, findInvoice } from './queries';
import { createClientInNotion, createSessionInNotion, createInvoiceInNotion } from './creators';
import { cancelSessionInNotion, updateSessionTimeDateInNotion, updateSessionStatusBasedOnAttendeesInNotion } from './updaters';

/**
 * Handles a new booking created event
 * @param data Booking data from Cal.com
 * @param event SvelteKit RequestEvent
 * @returns Response data
 */
export async function handleNewBookingCreated(data, event: RequestEvent) {
	try {
		// Check if client exists in Notion
		const existingClient = await findClientInNotion(data.clientEmail);

		// Create client if it doesn't exist
		const clientId = existingClient
			? existingClient.id
			: await createClientInNotion({
					name: data.clientName,
					email: data.clientEmail,
					instrument: data.clientInstrument,
					performanceType: data.clientPerformanceType
				});

		if (!clientId) {
			throw new Error('Failed to obtain or create a valid client ID');
		}

		// Create the session in Notion
		const newSession = await createSessionInNotion(data, clientId);

		return {
			message: 'Booking created successfully',
			session: newSession
		};
	} catch (err) {
		console.error('Error handling new booking:', err);
		throw error(500, `Error processing booking creation: ${err.message}`);
	}
}

/**
 * Handles a booking cancellation event
 * @param data Cancellation data from Cal.com
 * @param event SvelteKit RequestEvent
 * @returns Response data
 */
export async function handleBookingCancellation(data, event: RequestEvent) {
	try {
		const calSessionIdFromNotion = await findSessionInNotion(data.bookingId);

		if (!calSessionIdFromNotion) {
			throw new Error('Failed to find booking in Notion');
		}

		const cancelledSession = await cancelSessionInNotion(data, calSessionIdFromNotion);

		return {
			message: 'Booking cancelled successfully',
			session: cancelledSession
		};
	} catch (err) {
		console.error('Error handling booking cancellation:', err);
		throw error(500, `Error processing booking cancellation: ${err.message}`);
	}
}

/**
 * Handles a booking reschedule event
 * @param calData Rescheduling data from Cal.com
 * @param event SvelteKit RequestEvent
 * @returns Response data
 */
export async function handleBookingReschedule(calData, event: RequestEvent) {
	try {
		const calSessionIdFromNotion = await findSessionInNotion(calData.bookingId);

		if (!calSessionIdFromNotion) {
			throw new Error('Failed to find booking in Notion');
		}

		const rescheduledSession = await updateSessionTimeDateInNotion(calData, calSessionIdFromNotion);

		return {
			message: 'Booking rescheduled successfully',
			session: rescheduledSession
		};
	} catch (err) {
		console.error('Error handling booking reschedule:', err);
		throw error(500, `Error processing booking reschedule: ${err.message}`);
	}
}

/**
 * Handles a successful Stripe checkout event
 * @param stripeData Stripe checkout data
 * @param event SvelteKit RequestEvent
 * @returns Response data
 */
export async function handleSuccessfulStripeCheckout(stripeData, event: RequestEvent) {
	try {
		// Find or create client in Notion
		const existingClient = await findClientInNotion(stripeData.customer_email);

		const customerId = existingClient
			? existingClient.id
			: await createClientInNotion({
					name: stripeData.session_customer_name,
					email: stripeData.session_customer_email
				});

		if (!customerId) {
			throw new Error('Failed to obtain or create a valid client ID');
		}

		// Find related package in Notion
		const relatedPackageId = await findRelatedPackage(stripeData.item_notion_name);

		if (!relatedPackageId) {
			throw error(400, "Couldn't find related package to the stripe session");
		}

		let invoice = null;
    let invoiceStatus = null;
		const invoiceExists = await findInvoice(stripeData.invoice_id);

		if (invoiceExists && invoiceExists.length > 0) {
			console.log('Invoice already exists: ', invoiceExists);
      invoiceStatus = "invoice-exists"
			invoice = invoiceExists;
		}

		if (!invoiceExists || invoiceExists.length === 0) {
			const newInvoice = await createInvoiceInNotion({
				stripeData,
				customerId,
				relatedPackageId
			});

			invoice = newInvoice;
      invoiceStatus = "invoice-new"
			console.log('New invoice created: ', invoice);
		}

		// Create invoice in Notion

		return {
			message: 'Checkout processed successfully',
			invoice,
      invoiceStatus
		};
	} catch (err) {
		console.error('Error handling Stripe checkout:', err);
		throw error(500, `Error processing Stripe checkout: ${err.message}`);
	}
}

/**
 * Handles a meeting ended event
 * @param calData Meeting ended data from Cal.com
 * @param event SvelteKit RequestEvent
 * @returns Response data
 */
export async function handleMeetingEnded(calData, event: RequestEvent) {
	try {
		// Get session from Notion
		const calSession = await findSessionInNotion(calData.bookingId, false);

		if (!calSession) {
			throw new Error('Failed to find booking in Notion');
		}

		const zoomCallId = calSession.properties['Zoom Meet ID'].rich_text[0].text.content;

		if (!zoomCallId) {
			throw error(400, 'No Zoom call ID found');
		}

		// Get Zoom meeting attendees
		const zoomAttendeesRes = await event.fetch('/api/zoom/get-meeting-attendees', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${INTERNAL_API_KEY}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ zoomCallId })
		});

		const zoomAttendees = await zoomAttendeesRes.json();

		if (!zoomAttendees) {
			throw error(400, 'Failed to get Zoom attendees data');
		}

		// Update session status based on attendees
		const updatedSession = await updateSessionStatusBasedOnAttendeesInNotion(calSession.id, zoomAttendees);

		return {
			message: 'Meeting ended processed successfully',
			session: updatedSession
		};
	} catch (err) {
		console.error('Error handling meeting ended:', err);
		throw error(500, `Error processing meeting ended: ${err.message}`);
	}
}

/**
 * Routes the event to the appropriate handler based on the event type
 * @param data Event data
 * @param event SvelteKit RequestEvent
 * @returns Response from the appropriate handler
 */
export async function handleNotionEvent(data, event: RequestEvent) {
	const actionType = data.triggerEvent;

	switch (actionType) {
		case 'BOOKING_CREATED':
			return await handleNewBookingCreated(data, event);

		case 'BOOKING_CANCELLED':
			return await handleBookingCancellation(data, event);

		case 'BOOKING_RESCHEDULED':
			return await handleBookingReschedule(data, event);

		case 'MEETING_ENDED':
			return await handleMeetingEnded(data, event);

		case 'CHECKOUT_SESSION_COMPLETE':
			return await handleSuccessfulStripeCheckout(data, event);

		default:
			throw error(400, `Unsupported event type: ${actionType}`);
	}
}
