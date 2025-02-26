import { z } from 'zod';

export const calBookingSchema = z
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
			iCalUID: z.string()
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
		bookingId: data.payload.iCalUID
	}));

export const calRescheduledSchema = z
	.object({
		triggerEvent: z.string(),
		payload: z.object({
			startTime: z.string(),
			endTime: z.string(),
			iCalUID: z.string()
		})
	})
	.transform((data) => ({
		triggerEvent: data.triggerEvent,
		bookingStartTime: data.payload.startTime,
		bookingEndTime: data.payload.endTime,
		bookingId: data.payload.iCalUID
	}));

export const calCancellationSchema = z
	.object({
		triggerEvent: z.string(),
		payload: z.object({
			iCalUID: z.string(),
			cancellationReason: z.string().nullable().optional()
		})
	})
	.transform((data) => ({
		triggerEvent: data.triggerEvent,
		bookingId: data.payload.iCalUID,
		cancellationReason: data.payload.cancellationReason
	}));

export const calMeetEndedSchema = z
	.object({
		triggerEvent: z.string(),
		iCalUID: z.string()
	})
	.transform((data) => ({
		triggerEvent: data.triggerEvent,
		bookingId: data.iCalUID
	}));

const calBookingSchemaType = z.infer<typeof calBookingSchema>;
const calCancellationSchemaType = z.infer<typeof calCancellationSchema>;
const calRescheduleSchemaType = z.infer<typeof calRescheduledSchema>;
const calMeetingEndedSchemaType = z.infer<typeof calMeetEndedSchema>;
