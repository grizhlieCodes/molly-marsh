import { redirect, error } from '@sveltejs/kit';
import { z } from 'zod';
import Stripe from 'stripe';
import { Client } from '@notionhq/client/build/src';
import { NOTION_API_TOKEN, NOTION_CLIENTS_DB, NOTION_SESSIONS_DB, STRIPE_SECRET_KEY, NOTION_PACKAGES_DB, NOTION_INVOICES_DB } from '$env/static/private';

async function findClientInNotion(email: string) {
	const notion = new Client({
		auth: NOTION_API_TOKEN
	});
	try {
		const response = await notion.databases.query({
			database_id: NOTION_CLIENTS_DB,
			filter: {
				property: 'Contact Email',
				email: {
					equals: email
				}
			}
		});

		return response.results.length > 0 ? response.results[0] : null;
	} catch (error) {
		console.error('Error querying Notion:', error);
		throw error(500, 'Failed to query Notion database');
	}
}

async function findRelatedPackage(packageName: string) {
	const notion = new Client({
		auth: NOTION_API_TOKEN
	});
	try {
		const response = await notion.databases.query({
			database_id: NOTION_PACKAGES_DB,
			filter: {
				property: 'Name',
				title: {
					equals: packageName
				}
			}
		});

		return response.results.length > 0 ? response.results[0] : null;
	} catch (err) {
		console.error('Error querying Notion:', err);
		throw error(500, 'Failed to query Notion database');
	}
}

// First, let's define the schema that matches your requirements
const StripeSessionSchema = z
	.object({
		// Basic customer information from customer_details
		customer_details: z.object({
			name: z.string(),
			email: z.string().email()
		}),

		// Invoice information
		invoice: z.object({
			id: z.string(),
			number: z.string(),
			invoice_pdf: z.string().url(),
			created: z.number()
		}),

		// Line items information
		line_items: z.object({
			data: z
				.array(
					z.object({
						amount_total: z.number(),
						description: z.string(),
						price: z.object({
							product: z.object({
								images: z.array(z.string())
							})
						})
					})
				)
				.min(1) // Ensure at least one line item exists
		})
	})
	.transform((data) => {
		// Transform the nested data into a flat object
		return {
			customerName: data.customer_details.name,
			customerEmail: data.customer_details.email,
			invoiceId: data.invoice.id,
			invoiceNumber: data.invoice.number,
			invoicePdfUrl: data.invoice.invoice_pdf,
			invoiceDate: new Date(data.invoice.created * 1000).toISOString(),
			products: data.line_items,
			itemAmount: data.line_items.data[0].amount_total,
			itemDescription: data.line_items.data[0].description,
			itemImage: data.line_items.data[0].price.product.images[0]
			// Convert Unix timestamp to ISO string for better readability
		};
	});

// console.log("HERE=============================", {  items: checkoutSession?.line_items.data });

// Define the type that represents our transformed data
export type StripeSessionData = z.infer<typeof StripeSessionSchema>;

// async function waitForSessionData(sessionId: string, maxAttempts = 5) {
// 	const stripe = new Stripe(STRIPE_SECRET_KEY, {
// 		apiVersion: '2024-11-20.acacia'
// 	});
// 	let attempts = 0;

// 	while (attempts < maxAttempts) {
// 		const session = await stripe.checkout.sessions.retrieve(sessionId, {
// 			expand: [
// 				'payment_intent', // Gets the payment details
// 				'invoice', // Gets the invoice if one was created
// 				'line_items', // Gets the items that were purchased
// 				'line_items.data.price.product'
// 			]
// 		});

// 		if (session.invoice) {
// 			return session;
// 		}

// 		await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait 2 seconds
// 		attempts++;
// 	}

// 	return null;
// }
async function waitForSessionData(sessionId: string, maxAttempts = 5, delayMs = 750) {
	const stripe = new Stripe(STRIPE_SECRET_KEY, {
		apiVersion: '2024-11-20.acacia'
	});

	let attempts = 0;
	let lastError = null;

	while (attempts < maxAttempts) {

		try {
			const session = await stripe.checkout.sessions.retrieve(sessionId, {
				expand: ['payment_intent', 'invoice', 'line_items', 'line_items.data.price.product']
			});

			if (session.invoice && session.line_items?.data?.length > 0 && session.customer_details) {
				return session;
			}

			// console.log(`Attempt ${attempts + 1}/${maxAttempts}: Waiting for complete session data...`);
		} catch (err) {
			console.error(`Attempt ${attempts + 1}/${maxAttempts} failed:`, err);
			lastError = err;
		}

		await new Promise((resolve) => setTimeout(resolve, delayMs));
		attempts++;
	}

	throw error(500, {
		message: `Failed to retrieve complete session data after ${maxAttempts} attempts. ${lastError ? `Last error: ${lastError.message}` : ''}`
	});
}

async function returnSessionData(sessionId: string) {
	if (!sessionId) {
		throw new Error('Missing required parameters: sessionId');
	}

	const checkoutSession = await waitForSessionData(sessionId);
	// console.log({ checkoutSession });

	try {
		// console.log({ checkoutSession, items: checkoutSession?.line_items });
		// console.log('HERE=============================', { session: checkoutSession });
		// console.log('HERE=============================', { images: checkoutSession?.line_items.data[0].price?.product.images });
		const parsedData = StripeSessionSchema.parse(checkoutSession);
		// console.log({ data: parsedData });
		return parsedData;
	} catch (error) {
		if (error instanceof z.ZodError) {
			console.error('Validation failed:', error.errors);
			throw new Error('Invalid session data structure');
		}
		throw error;
	}

	return checkoutSession;
}

async function createNewInvoice(sessionData: StripeSessionData, clientId: string, relatedPackageId: string) {
	const notion = new Client({
		auth: NOTION_API_TOKEN
	});

	try {
		const res = await notion.pages.create({
			parent: {
				database_id: NOTION_INVOICES_DB
			},
			properties: {
				Clients: {
					relation: [{ id: clientId }]
				},
				Packages: {
					relation: [{ id: relatedPackageId }]
				},
				'Total Paid': {
					number: sessionData.itemAmount / 100
				},
				'Payment Date': {
					date: {
						start: sessionData.paymentDate
					}
				},
				'Stripe Invoice ID': {
					rich_text: [
						{
							text: {
								content: sessionData.invoiceId
							}
						}
					]
				},
				'Invoice URL': {
					url: sessionData.invoicePdfUrl
				},
				'Name (Default)': {
					title: [
						{
							text: {
								content: sessionData.itemDescription
							}
						}
					]
				}
			}
		});

		return res;
	} catch (err) {
		console.error('Error querying Notion:', err);
		throw error(500, 'Failed to query Notion database');
	}
}

export async function load(event) {
	const sessionId = event.url.searchParams.get('session_id');

	if (!sessionId) {
		throw redirect(307, '/404');
	}

	const url = event.url.pathname;

	try {
		const sessionData = await returnSessionData(sessionId);

		return {
			url,
			sessionId,
			sessionData
		};
	} catch (err) {
		// console.error('Error loading session data:', err);
		// throw error(500, 'Failed to load session data. Please refresh the page.');
		return {
			url,
			sessionId,
			error: err.message || 'Failed to load session data'
		};
	}

	// const clientExists = await findClientInNotion(sessionData.customerEmail);
	// const relatedPackage = await findRelatedPackage(sessionData.itemDescription);
	// console.log({ sessionData, clientExists, relatedPackage });

	// if (clientExists && relatedPackage) {
	// Create New Invoice
	// Link to Existing Client
	// Link to Related Package
	// const newInvoice = await createNewInvoice(sessionData, clientExists.id, relatedPackage.id);
	// console.log({ newInvoice });
	// } else if (!clientExists && relatedPackage) {
	// Create New Client
	// Find Related Package // packageObject.id
	// Create New Invoice
	// Link to New Client
	// Link to Related Package
	// }
	// if client exists, create new invoice, link with client
	// if client does not exist, create new client, create new invoice, link
	// with newly created client

	// console.log(clientExists);
}
