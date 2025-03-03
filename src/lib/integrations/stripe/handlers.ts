import Stripe from 'stripe';
import type { RequestEvent } from '@sveltejs/kit';
import { INTERNAL_API_KEY } from '$env/static/private';
import { retrieveCheckoutSession, stripeSuccessfulSessionSchema } from '$lib/integrations/stripe';
import { updateCustomerNameIfMissing } from './customers';
import { json, error } from '@sveltejs/kit';
import * as Sentry from '@sentry/sveltekit';

export async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session, event: RequestEvent) {
	try {
		if (!session.customer) {
			Sentry.captureMessage('No customer in session', {
				level: 'error',
				tags: {
					component: 'stripe-integration',
					action: 'handle-checkout-session-completed'
				},
				extra: {
					sessionId: session.id
				}
			});
			throw error(400, 'No customer in session');
		}
		const expandedSessionData = await retrieveCheckoutSession(session.id);
		const finalSessionData = stripeSuccessfulSessionSchema.parse(expandedSessionData);
		const customerData = await updateCustomerNameIfMissing(finalSessionData.customer_id, finalSessionData.session_customer_name);

		if (!customerData?.customer?.email || !customerData?.customer?.name) {
			Sentry.captureMessage('Missing required customer data', {
				level: 'error',
				tags: {
					component: 'stripe-integration',
					action: 'handle-checkout-session-completed'
				},
				extra: {
					sessionId: session.id,
					customerId: finalSessionData.customer_id,
					customerData
				}
			});
			throw error(400, 'Missing required customer data');
		}

		try {
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

			if (!notionResponse.ok) {
				const errorText = await notionResponse.text();
				Sentry.captureMessage('HTTP error from Notion API', {
					level: 'error',
					tags: {
						component: 'stripe-integration',
						action: 'handle-checkout-session-completed',
						status: notionResponse.status.toString()
					},
					extra: {
						sessionId: session.id,
						customerId: finalSessionData.customer_id,
						responseText: errorText
					}
				});
				throw error(400, `HTTP ERROR at stripe checkout notionResponse! Status: ${notionResponse.status}`);
			}

			const responseData = await notionResponse.json();
			// console.log(responseData);

			if (responseData?.data?.invoiceStatus === 'invoice-new') {
				console.log('Emailing client since new invoice.');

				// Use the new email API endpoint
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

				if (!emailResponse.ok) {
					// Log the error but don't fail the whole process
					const errorText = await emailResponse.text();
					console.error('Failed to send checkout confirmation email:', errorText);
					Sentry.captureMessage('Failed to send checkout confirmation email', {
						level: 'warning',
						tags: {
							component: 'stripe-integration',
							action: 'send-confirmation-email',
							status: emailResponse.status.toString()
						},
						extra: {
							sessionId: session.id,
							customerId: customerData.customer.id,
							customerEmail: customerData.customer.email,
							responseText: errorText
						}
					});
				}

				return json({ received: true, message: 'Checkout session completed successfully', customer: customerData.customer });
			} else if (responseData?.data?.invoiceStatus === 'invoice-exists') {
				console.log('Skipping the email, since invoice exists (so the client was already emailed).');
				return json({ received: true, message: 'Checkout session completed successfully', customer: customerData.customer });
			}
		} catch (err) {
			if (err.status) {
				throw err; // Rethrow SvelteKit errors
			}

			// Log any other errors to Sentry
			Sentry.captureException(err, {
				tags: {
					component: 'stripe-integration',
					action: 'notion-or-email-integration'
				},
				extra: {
					sessionId: session.id,
					customerId: customerData?.customer?.id,
					error: err.message
				}
			});

			throw error(500, err.message || 'Error interacting with Notion or email service');
		}

		// Fallback response if invoice status is neither 'new' nor 'exists'
		Sentry.captureMessage('Unexpected invoice status', {
			level: 'warning',
			tags: {
				component: 'stripe-integration',
				action: 'handle-checkout-session-completed'
			},
			extra: {
				sessionId: session.id,
				invoiceStatus: responseData?.data?.invoiceStatus
			}
		});

		return json({
			received: true,
			message: 'Checkout session completed but invoice status unrecognized',
			customer: customerData.customer,
			invoiceStatus: responseData?.data?.invoiceStatus
		});
	} catch (err) {
		console.error('Checkout session completion error:', err);

		// Log to Sentry with detailed context
		Sentry.captureException(err, {
			tags: {
				component: 'stripe-integration',
				action: 'handle-checkout-session-completed',
				status: err.status ? err.status : 'unknown'
			},
			extra: {
				sessionId: session?.id,
				error: err.message,
				stack: err.stack
			}
		});

		// If it's already a SvelteKit error, rethrow it
		if (err.status) {
			throw err;
		}

		throw error(500, `Error processing checkout session: ${err.message}`);
	}
}

/**
 * Route webhook events to the appropriate handler
 * @param stripeEvent The verified Stripe event
 * @param event The SvelteKit request event
 * @returns Result from the appropriate handler
 */
export async function handleStripeEvent(stripeEvent: Stripe.Event, event: RequestEvent) {
	try {
		switch (stripeEvent.type) {
			case 'checkout.session.completed':
				return await handleCheckoutSessionCompleted(stripeEvent.data.object as Stripe.Checkout.Session, event);

			// Add more event handlers as needed

			default:
				// Log unhandled event types
				Sentry.captureMessage(`Unhandled Stripe event type: ${stripeEvent.type}`, {
					level: 'info',
					tags: {
						component: 'stripe-integration',
						action: 'handle-stripe-event',
						eventType: stripeEvent.type
					},
					extra: {
						eventId: stripeEvent.id
					}
				});

				return {
					received: true,
					message: `Event type ${stripeEvent.type} was received but not processed`
				};
		}
	} catch (err) {
		// Log any unexpected errors in the event handler
		Sentry.captureException(err, {
			tags: {
				component: 'stripe-integration',
				action: 'handle-stripe-event',
				eventType: stripeEvent.type
			},
			extra: {
				eventId: stripeEvent.id,
				error: err.message,
				stack: err.stack
			}
		});

		throw err; // Re-throw to be handled by the API endpoint
	}
}
