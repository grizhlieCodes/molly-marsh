import { Client } from '@notionhq/client';
import { NOTION_API_TOKEN } from '$env/static/private';

/**
 * Creates and returns a configured Notion client
 * @returns A configured Notion client instance
 */
export function setupNotionClient() {
  return new Client({
    auth: NOTION_API_TOKEN
  });
}