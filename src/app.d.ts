// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		interface Locals {
			// your locals types
		}
		interface PageData {
			// your page data types
		}
		interface Platform {
			env: {
				PUBLIC_STORYBLOK_ACCESS_TOKEN: string;
				STRIPE_SECRET_KEY: string;
				ALLOWED_ORIGINS: string;
				NOTION_API_TOKEN: string;
				NOTION_CLIENTS_DB: string;
				NOTION_SESSIONS_DB: string;
				NOTION_INVOICES_DB: string;
				NOTION_PACKAGES_DB: string;
			};
		}
	}
}

export {};
