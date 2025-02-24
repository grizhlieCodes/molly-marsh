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

async function findRelatedPackage(item_notion_name: string) {
	const notion = setupNotionClient();
	try {
		const response = await notion.databases.query({
			database_id: NOTION_PACKAGES_DB,
			filter: {
				property: 'Stripe Name',
				rich_text: {
					equals: item_notion_name
				}
			}
		});

		return response.results.length > 0 ? response.results[0].id : null;
	} catch (err) {
		console.error('Error querying Notion:', err);
		throw error(500, 'Failed to query Notion database');
	}
}

async function findSessionInNotion(calSessionId: string, idOnly = true) {
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

		return res.results.length > 0 && idOnly ? res.results[0].id : res.results.length > 0 && !idOnly ? res.results[0] : null;
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

		console.log(response);

		return response.id;
	} catch (error) {
		console.error('Error creating client in Notion:', error);
		const errorMessage = error.message || 'Unknown error occurred while creating client';
		throw error(500, `Failed to create client in Notion: ${errorMessage}`);
	}
}

async function createInvoiceInNotion(data) {
	const { stripeData, customerId, relatedPackageId } = data;
	const notion = setupNotionClient();
	// console.log({stripeData, customerId, relatedPackageId})

	try {
		const totalRevenueResponse = await notion.databases.query({
			database_id: NOTION_DASHBOARD_METRICS_DB,
			filter: {
				property: 'Name',
				title: {
					equals: 'Total Revenue'
				}
			}
		});

		const totalRevenueMetricsId = totalRevenueResponse.results[0]?.id;
		// console.log('CONSOLING HERE ==============', totalRevenueMetricsId);
		if (!totalRevenueMetricsId) {
			throw new Error('Could not find Total Clients reference page');
		}
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

const updateSessionTimeDateInNotion = async (calData, sessionPageId) => {
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
		console.error('Error querying Notion:', err);
		throw error(500, `Failed to update Notion Session time/date page ${err.message}`);
	}
};

const updateSessionStatusBasedOnAttendeesInNotion = async (sessionPageId, attendees) => {
	const notion = setupNotionClient();

	const name = attendees?.participants.length >= 2 ? 'Took Place' : attendees?.participants.length < 1 ? 'Client No Show' : 'Client No Show';
	console.log('Attendees and name: ', { name, attendees });

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
		console.error('Error querying Notion:', err);
		throw error(500, `Failed to update Notion Session time/date page ${err.message}`);
	}
};

const handleNewBookingCreated = async (data, event) => {
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

const handleBookingReschedule = async (calData, event) => {
	try {
		const calSessionIdFromNotion = await findSessionInNotion(calData.bookingId);
		console.log(calData);

		if (!calSessionIdFromNotion) {
			throw new Error('Failed to obtain a valid booking ID');
		}

		const rescheduledSession = await updateSessionTimeDateInNotion(calData, calSessionIdFromNotion);

		return json({
			message: 'All good baby',
			rescheduledSession
		});
	} catch (err) {
		console.log(err);
		throw error(`Error thrown ${err} `);
	}
};

const handleSuccessfulStripeCheckout = async (stripeData, event) => {
	try {
		console.log('Stripe data within handle function: ', stripeData);
		const existingClient = await findClientInNotion(stripeData.customer_email);

		// console.log('EXISTING CLIENT WOOOOOOOOO ============= ', existingClient);
		const customerId = existingClient
			? existingClient.id
			: await createClientInNotion({
					name: stripeData.session_customer_name,
					email: stripeData.session_customer_email
				});
		// console.log('Client id found!!!!!!!!!!', customerId);

		if (!customerId) {
			throw new Error('Failed to obtain or create a valid client ID');
		}

		const relatedPackageId = await findRelatedPackage(stripeData.item_notion_name);

		if (!relatedPackageId) {
			throw error(400, "Couldn't find related package to the stripe session");
		}

		const newInvoice = await createInvoiceInNotion({ stripeData, customerId, relatedPackageId });

		return json({
			message: 'All good baby'
		});
	} catch (err) {
		console.log(err);
		throw error(`Error thrown ${err} `);
	}
};

const handleMeetingEnded = async (calData, event) => {
	try {
		console.log(calData);
		const calSession = await findSessionInNotion(calData.bookingId, false);

		if (!calSession) {
			throw new Error('Failed to obtain a valid booking ID');
		}

		const zoomCallId = calSession.properties['Zoom Meet ID'].rich_text[0].text.content;

		if (!zoomCallId) {
			throw error(400, 'No zoom call id!!');
		}

		const zoomAttendeesRes = await event.fetch('/api/zoom/get-meeting-attendees', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${INTERNAL_API_KEY}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ zoomCallId })
		});

		const zoomAttendees = await zoomAttendeesRes.json()

		console.log('Zoom Attendees here: ', zoomAttendees);

		if (!zoomAttendees) {
			throw error(400, 'no zoom attendees');
		}

		const updatedSession = await updateSessionStatusBasedOnAttendeesInNotion(calSession.id, zoomAttendees);
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
		case 'BOOKING_CANCELLED':
			return await handleBookingCancellation(data, event);
		case 'BOOKING_RESCHEDULED':
			return await handleBookingReschedule(data, event);
		case 'MEETING_ENDED':
			console.log('Meeting ended notion flow runs here');
			return await handleMeetingEnded(data, event);
			break;
		case 'CHECKOUT_SESSION_COMPLETE':
			console.log('CHECKOUT SESSION TIME BABY!!');
			return await handleSuccessfulStripeCheckout(data, event);
		// return json({message: 'success!!'})
		// break;
		// return await handleSuccessfulCheckoutSession(data, event);
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
			ok: true,
			handledResponse
		});
	} catch (err) {
		console.error('Error processing request:', err);
		return new Response('Error processing request', { status: 500 });
	}
};
