import { error } from '@sveltejs/kit';
import { setupNotionClient } from './client';
import { findTotalClientsMetric, findTotalRevenueMetric, findPastSessionsMetric } from './queries';
import { NOTION_CLIENTS_DB, NOTION_SESSIONS_DB, NOTION_INVOICES_DB } from '$env/static/private';

/**
 * Creates a new client in Notion
 * @param data Client data
 * @returns ID of the newly created client
 */
export async function createClientInNotion(data) {
	const notion = setupNotionClient();

	try {
		const totalClientsId = await findTotalClientsMetric();

		const response = await notion.pages.create({
			parent: {
				type: 'database_id',
				database_id: NOTION_CLIENTS_DB
			},
			properties: {
				'Client Name': {
					title: [
						{
							text: {
								content: data.name
							}
						}
					]
				},
				'Contact Email': {
					email: data.email
				},
				'Client Status': {
					select: {
						name: 'Prospect' // Default status for new clients
					}
				},
				'Agreement Signed': {
					select: {
						name: 'Not Signed' // Default agreement status
					}
				},
				Instrument: {
					rich_text: [
						{
							text: {
								content: data?.instrument || ''
							}
						}
					]
				},
				'Performance Type': {
					rich_text: [
						{
							text: {
								content: data?.performanceType || ''
							}
						}
					]
				},
				'All Clients Count': {
					relation: [
						{
							id: totalClientsId
						}
					]
				}
			}
		});

		return response.id;
	} catch (error) {
		console.error('Error creating client in Notion:', error);
		const errorMessage = error.message || 'Unknown error occurred while creating client';
		throw error(500, `Failed to create client in Notion: ${errorMessage}`);
	}
}

/**
 * Creates a new invoice in Notion
 * @param data Invoice data including Stripe data, customer ID, and related package ID
 * @returns ID of the newly created invoice
 */
export async function createInvoiceInNotion(data) {
	const { stripeData, customerId, relatedPackageId } = data;
	const notion = setupNotionClient();

	try {
		const totalRevenueMetricsId = await findTotalRevenueMetric();

		const response = await notion.pages.create({
			parent: {
				type: 'database_id',
				database_id: NOTION_INVOICES_DB
			},
			properties: {
				Name: {
					title: [
						{
							text: {
								content: stripeData.item_description
							}
						}
					]
				},
				Clients: {
					relation: [
						{
							id: customerId
						}
					]
				},
				'Total Paid': {
					number: stripeData.item_amount_total / 100
				},
				'Date Created': {
					date: {
						start: stripeData.invoice_date
					}
				},
				'Stripe Invoice ID': {
					rich_text: [
						{
							text: {
								content: stripeData.invoice_id
							}
						}
					]
				},
				'Invoice URL': {
					url: stripeData.invoice_url
				},
				'Dashboard Sums': {
					relation: [
						{
							id: totalRevenueMetricsId
						}
					]
				},
				Status: {
					select: {
						name: 'Paid'
					}
				},
				Packages: {
					relation: [
						{
							id: relatedPackageId
						}
					]
				}
			}
		});

		return response.id;
	} catch (error) {
		console.error('Error creating invoice in Notion:', error);
		const errorMessage = error.message || 'Unknown error occurred while creating invoice';
		throw error(500, `Failed to create invoice in Notion: ${errorMessage}`);
	}
}

/**
 * Creates a new session in Notion
 * @param data Session data from Cal.com
 * @param clientId Client ID in Notion
 * @returns ID of the newly created session
 */
export async function createSessionInNotion(data, clientId) {
	const notion = setupNotionClient();

	try {
		const pastSessionsId = await findPastSessionsMetric();

		const newSession = await notion.pages.create({
			parent: {
				type: 'database_id',
				database_id: NOTION_SESSIONS_DB
			},
			properties: {
				Name: {
					title: [
						{
							text: {
								content: data.bookingTitle
							}
						}
					]
				},
				'Booking Type': {
					select: {
						name: data.bookingType === 'discovery-session' ? 'Discovery Session' : 'Coaching Session'
					}
				},
				'Meeting Status': {
					select: {
						name: 'Pending'
					}
				},
				'Date of Session': {
					date: {
						start: data.bookingStartTime,
						end: data.bookingEndTime
					}
				},
				Client: {
					relation: [
						{
							id: clientId
						}
					]
				},
				'Template Added': {
					checkbox: true
				},
				'Past Session Counter': {
					relation: [
						{
							id: pastSessionsId
						}
					]
				},
				'Zoom Meet URL': {
					url: data.zoomCallUrl
				},
				'Zoom Meet ID': {
					rich_text: [
						{
							text: {
								content: data.zoomCallId
							}
						}
					]
				},
				'Cal Booking ID': {
					rich_text: [
						{
							text: {
								content: data.bookingId
							}
						}
					]
				}
			}
		});

		return newSession.id;
	} catch (err) {
		console.log('Error during creating session: ', err);
		throw error(500, `Failed to create session in Notion: ${err.message}`);
	}
}
