import { CAL_WEBHOOK_SECRET, INTERNAL_API_KEY } from '$env/static/private';
import { json, error } from '@sveltejs/kit';
import { createHmac, timingSafeEqual } from 'crypto';
import { parse } from 'path';
import { z } from 'zod';

const calCancellationSchema = z
	.object({
		triggerEvent: z.string(),
		payload: z.object({
			uid: z.string(),
			cancellationReason: z.string().nullable().optional()
		})
	})
	.transform((data) => ({
		triggerEvent: data.triggerEvent,
		bookingId: data.payload.uid,
		cancellationReason: data.payload.cancellationReason
	}));

const calBookingSchema = z
	.object({
		triggerEvent: z.string(),
		payload: z.object({
			type: z.string(),
			title: z.string(),
			startTime: z.string(),
			endTime: z.string(),
			responses: z.object({
				name: z.object({
					value: z.string()
				}),
				email: z.object({
					value: z.string().email()
				}),
				instrument: z
					.object({
						value: z.string().optional().nullable()
					})
					.optional()
					.nullable(),
				'performance-type': z
					.object({
						value: z.string().optional().nullable()
					})
					.optional()
					.nullable(),
				notes: z
					.object({
						value: z.string().optional().nullable()
					})
					.optional()
					.nullable()
			}),
			videoCallData: z.object({
				id: z.string(),
				url: z.string().url()
			}),
			uid: z.string()
		})
	})
	.transform((data) => ({
		triggerEvent: data.triggerEvent,
		bookingType: data.payload.type,
		bookingTitle: data.payload.title,
		bookingStartTime: data.payload.startTime,
		bookingEndTime: data.payload.endTime,
		clientName: data.payload.responses.name.value,
		clientEmail: data.payload.responses.email.value,
		clientInstrument: data.payload.responses.instrument?.value ?? null,
		clientPerformanceType: data.payload.responses['performance-type']?.value ?? null,
		bookingNotes: data.payload.responses.notes?.value ?? null,
		zoomCallId: data.payload.videoCallData.id,
		zoomCallUrl: data.payload.videoCallData.url,
		bookingId: data.payload.uid
	}));

const calBookingSchemaType = z.infer<typeof calBookingSchema>;

function verifyCalWebhook(payload: string, signature: string): boolean {
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

const bookingCancelledHandler = async (calData, event) => {
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

const bookingCreatedHandler = async (calData, event) => {
	const parsedCreatedBooking = calBookingSchema.parse(calData);
	console.log('INTERNAL_API_KEY: ', INTERNAL_API_KEY);

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
	} catch (error) {
		console.error('Error during sending data to notion in cal handler api:', error);
		throw error;
	}
};

const calAllEventsHandler = async (calData, event) => {
	const eventName = <string>calData.triggerEvent;
	console.log(eventName);

	switch (eventName) {
		case 'BOOKING_CREATED':
			console.log('Booking has been created.');
			return await bookingCreatedHandler(calData, event);
		case 'BOOKING_CANCELLED':
			console.log('Booking has been cancelled.');
			return await bookingCancelledHandler(calData, event);
		case 'BOOKING_RESCHEDULED':
			console.log('Booking has been rescheduled.');
			break;
		case 'MEETING_ENDED':
			console.log('Meeting has ended.');
			break;
	}
};

export const POST: RequestHandler = async (event) => {
	const signature = event.request.headers.get('x-cal-signature-256');
	const webhookSecret = CAL_WEBHOOK_SECRET;

	if (!signature) {
		throw error(401, 'Missing signature header');
	}

	if (!webhookSecret) {
		throw error(500, 'Webhook secret not configured');
	}

	try {
		const rawBody = await event.request.text();

		const isValid = verifyCalWebhook(rawBody, signature);

		if (!isValid) {
			console.error('Invalid signature');
			throw error(401, 'Invalid signature');
		}

		const data = JSON.parse(rawBody);

		const eventsHandlerResponse = await calAllEventsHandler(data, event);

		return json({ status: 'success' });
	} catch (err) {
		console.error('Error processing webhook:', err);
		throw error(500, 'Internal server error');
	}
};
