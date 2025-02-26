import { error } from '@sveltejs/kit';
import { setupNotionClient } from './client';
import { 
  NOTION_CLIENTS_DB, 
  NOTION_SESSIONS_DB, 
  NOTION_PACKAGES_DB,
  NOTION_DASHBOARD_METRICS_DB
} from '$env/static/private';

/**
 * Finds a client in Notion by email
 * @param email Client email address
 * @returns Client record or null if not found
 */
export async function findClientInNotion(email: string) {
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
  } catch (err) {
    console.error('Error querying Notion:', err);
    throw error(500, 'Failed to query Notion database');
  }
}

/**
 * Finds a related package by name in Notion
 * @param item_notion_name Package name in Notion
 * @returns Package ID or null if not found
 */
export async function findRelatedPackage(item_notion_name: string) {
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

/**
 * Finds a session in Notion by Cal booking ID
 * @param calSessionId Cal.com booking ID
 * @param idOnly Whether to return just the ID (true) or the full record (false)
 * @returns Session ID, record, or null if not found
 */
export async function findSessionInNotion(calSessionId: string, idOnly = true) {
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

    if (res.results.length === 0) {
      return null;
    }
    
    return idOnly ? res.results[0].id : res.results[0];
  } catch (err) {
    console.error('Error querying Notion:', err);
    throw error(500, 'Failed to query Notion database');
  }
}

/**
 * Find total clients reference for dashboard metrics
 * @returns Reference page ID for total clients metric
 */
export async function findTotalClientsMetric() {
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
    if (!totalClientsId) {
      throw new Error('Could not find Total Clients reference page');
    }
    
    return totalClientsId;
  } catch (err) {
    console.error('Error finding total clients metric:', err);
    throw error(500, 'Failed to find total clients metric');
  }
}

/**
 * Find total revenue reference for dashboard metrics
 * @returns Reference page ID for total revenue metric
 */
export async function findTotalRevenueMetric() {
  const notion = setupNotionClient();
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
    if (!totalRevenueMetricsId) {
      throw new Error('Could not find Total Revenue reference page');
    }
    
    return totalRevenueMetricsId;
  } catch (err) {
    console.error('Error finding total revenue metric:', err);
    throw error(500, 'Failed to find total revenue metric');
  }
}

/**
 * Find past sessions counter reference for dashboard metrics
 * @returns Reference page ID for past sessions counter
 */
export async function findPastSessionsMetric() {
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
    if (!pastSessionsId) {
      throw new Error('Could not find Past Sessions reference page');
    }
    
    return pastSessionsId;
  } catch (err) {
    console.error('Error finding past sessions metric:', err);
    throw error(500, 'Failed to find past sessions metric');
  }
}