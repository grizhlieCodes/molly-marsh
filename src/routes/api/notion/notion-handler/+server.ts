import { NOTION_API_TOKEN, NOTION_CLIENTS_DB, NOTION_SESSIONS_DB, NOTION_INVOICES_DB, NOTION_PACKAGES_DB, NOTION_DASHBOARD_METRICS_DB, INTERNAL_API_KEY } from '$env/static/private';
import { json, error } from '@sveltejs/kit';
import { Client } from '@notionhq/client';

const setupNotionClient = () => {
	return new Client({
		auth: NOTION_API_TOKEN
	});
};

async function findClientInNotion(email: string) {
	const notion = setupNotionClient();
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
		console.error('Error querying Notion:', err);
		throw error(500, 'Failed to query Notion database');
	}
}

async function findRelatedPackage(packageName: string) {
	const notion = setupNotionClient();
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

async function findSessionInNotion(calSessionId: string) {
	const notion = setupNotionClient();
	try {
		const res = await notion.databases.query({
			database_id: NOTION_SESSIONS_DB,
			filter: {
				property: 'Cal Booking ID',
				rich_text: {
					equals: calSessionId
				}
			}
		});

		return res.results.length > 0 ? res.results[0].id : null;
	} catch (err) {
		console.error('Error querying Notion:', err);
		throw error(500, 'Failed to query Notion database');
	}
}

async function createClientInNotion(data) {
	// Data
	//  name: data.clientName,
	// email: data.clientEmail,
	// instrument: data.clientInstrument,
	// performanceType: data.clientPerformanceType
	const notion = setupNotionClient();

	try {
		const totalClientsResponse = await notion.databases.query({
			database_id: NOTION_DASHBOARD_METRICS_DB,
			filter: {
				property: 'Name',
				title: {
					equals: 'Total Clients'
				}
			}
		});

		const totalClientsId = totalClientsResponse.results[0]?.id;
		console.log('CONSOLING HERE ==============', totalClientsId);
		if (!totalClientsId) {
			throw new Error('Could not find Total Clients reference page');
		}
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
								content: data.instrument || ''
							}
						}
					]
				},
				'Performance Type': {
					rich_text: [
						{
							text: {
								content: data.performanceType || ''
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

		console.log(response);

		return response.id;
	} catch (error) {
		console.error('Error creating client in Notion:', error);
		const errorMessage = error.message || 'Unknown error occurred while creating client';
		throw error(500, `Failed to create client in Notion: ${errorMessage}`);
	}
}

async function createSessionInNotion(data, clientId) {
	const notion = setupNotionClient();

	try {
		const pastSessionCounterResponse = await notion.databases.query({
			database_id: NOTION_DASHBOARD_METRICS_DB,
			filter: {
				property: 'Name',
				title: {
					equals: 'Past Sessions'
				}
			}
		});

		const pastSessionsId = pastSessionCounterResponse.results[0]?.id;

		console.log('CONSOLING HERE ==============', pastSessionsId);

		if (!pastSessionsId) {
			throw new Error('Could not find Past Sessions reference page');
		}

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
	} catch (err) {
		console.log('Error during creating session: ', err);
		throw error(500, `Failed to create session in Notion: ${err.message}`);
	}
}

async function cancelSessionInNotion(calData, pageId) {
	// bookingId, cancellationReason
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
		console.error('Error querying Notion:', err);
		throw error(500, `Failed to update Notion Session page ${err.message}`);
	}
}

const handleNewBookingCreated =	 async (data, event) => {
	console.log(data);
	try {
		// Check if client exists
		// if client exists, save it
		// if client does not exist, create it, then save it
		// Then create the session in sessions_db
		const existingClient = await findClientInNotion(data.clientEmail);
		// console.log('EXISTING CLIENT WOOOOOOOOO ============= ', existingClient);
		const clientId = existingClient
			? existingClient.id
			: await createClientInNotion({
					name: data.clientName,
					email: data.clientEmail,
					instrument: data.clientInstrument,
					performanceType: data.clientPerformanceType
				});
		console.log('Client id found!!!!!!!!!!', clientId);

		if (!clientId) {
			throw new Error('Failed to obtain or create a valid client ID');
		}

		const newSession = await createSessionInNotion(data, clientId);
		return json({
			message: 'All good baby'
		});
	} catch (err) {
		console.log(err);
		throw error(`Error thrown ${err} `);
	}
};

const handleBookingCancellation = async (data, event) => {
	try {
		const calSessionIdFromNotion = await findSessionInNotion(data.bookingId);

		if (!calSessionIdFromNotion) {
			throw new Error('Failed to obtain a valid booking ID');
		}

		const cancelledSession = await cancelSessionInNotion(data, calSessionIdFromNotion);

		return json({
			message: 'All good baby',
			cancelledSession
		});
	} catch (err) {
		console.log(err);
		throw error(`Error thrown ${err} `);
	}
};

const notionAllEventsHandler = async (data, event) => {
	const actionType = data.triggerEvent;

	switch (actionType) {
		case 'BOOKING_CREATED':
			return await handleNewBookingCreated(data, event);
		case 'BOOKING_CANCELLED': {
			return await handleBookingCancellation(data, event);
		}
	}
};

export const POST: RequestHandler = async (event) => {
	const authHeader = event.request.headers.get('Authorization');
	const token = authHeader?.replace('Bearer ', '');

	if (token !== INTERNAL_API_KEY) {
		return new Response('Unauthorized in notion handler', { status: 401 });
	}

	try {
		const data = await event.request.json();

		const handledResponse = await notionAllEventsHandler(data, event);
		// console.log('NOTION API DATA: ', data);

		return json({
			message: "Woo, i've arrived from Notion!!",
			handledResponse
		});
	} catch (err) {
		console.error('Error processing request:', err);
		return new Response('Error processing request', { status: 500 });
	}
};
