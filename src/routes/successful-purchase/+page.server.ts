import { redirect, error } from '@sveltejs/kit';
import { retrieveExpandedSession } from '$lib/integrations/stripe';
import { stripeSuccessSessionSchema } from '$lib/integrations/stripe/schemas';
import type { StripeSuccessSession } from '$lib/integrations/stripe/types';
import { Client } from '@notionhq/client/build/src';
import { NOTION_API_TOKEN, NOTION_CLIENTS_DB, NOTION_PACKAGES_DB, NOTION_INVOICES_DB } from '$env/static/private';

/**
 * Find a client in Notion by email
 * @param email Client email to search for
 * @returns Client page object or null if not found
 */
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

/**
 * Find a package in Notion by name
 * @param packageName Package name to search for
 * @returns Package page object or null if not found
 */
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

/**
 * Wait for session data with retries
 * @param sessionId Stripe session ID
 * @param maxAttempts Maximum number of retry attempts
 * @param delayMs Delay between retries in milliseconds
 * @returns Parsed session data
 */
async function waitForSessionData(sessionId: string, maxAttempts = 5, delayMs = 750): Promise<StripeSuccessSession> {
	let attempts = 0;
	let lastError = null;

	while (attempts < maxAttempts) {
		try {
			// Get expanded session with all needed data
			const session = await retrieveExpandedSession(sessionId);

			// Check if session has required data
			if (session.invoice && session.line_items?.data?.length > 0 && session.customer_details) {
				// Parse and transform the session data
				return stripeSuccessSessionSchema.parse(session);
			}
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

/**
 * Create a new invoice in Notion
 * @param sessionData Stripe session data
 * @param clientId Notion client ID
 * @param relatedPackageId Notion package ID
 * @returns Created invoice page
 */
async function createNewInvoice(sessionData: StripeSuccessSession, clientId: string, relatedPackageId: string) {
	const notion = new Client({
		auth: NOTION_API_TOKEN
	});

	try {
		return await notion.pages.create({
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
						start: sessionData.invoiceDate
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
	} catch (err) {
		console.error('Error creating Notion invoice:', err);
		throw error(500, 'Failed to create invoice in Notion');
	}
}

export async function load(event) {
	const sessionId = event.url.searchParams.get('session_id');

	if (!sessionId) {
		throw redirect(307, '/404');
	}

	const url = event.url.pathname;

	try {
		const sessionData = await waitForSessionData(sessionId);
		
		// Note: Notion integration is commented out for now
		// This could be reactivated later if needed
		// const clientExists = await findClientInNotion(sessionData.customerEmail);
		// const relatedPackage = await findRelatedPackage(sessionData.itemDescription);
		// if (clientExists && relatedPackage) {
		//   await createNewInvoice(sessionData, clientExists.id, relatedPackage.id);
		// }

		return {
			url,
			sessionId,
			sessionData
		};
	} catch (err) {
		return {
			url,
			sessionId,
			error: err.message || 'Failed to load session data'
		};
	}
}
