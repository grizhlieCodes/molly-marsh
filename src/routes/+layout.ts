// IMPORTS
import type { LayoutServerLoad } from './$types';
import { PUBLIC_STORYBLOK_ACCESS_TOKEN } from '$env/static/public';
import { apiPlugin, storyblokInit, useStoryblokApi } from '@storyblok/svelte';

// COMPONENTS

//  01 - Layout
import { default as page } from '$lib/components/layout/Page.svelte';

// 02 - UI
import { default as text } from '$lib/components/ui/Text.svelte';

export const load: LayoutServerLoad = async ({ url }) => {
	storyblokInit({
		accessToken: PUBLIC_STORYBLOK_ACCESS_TOKEN,
		use: [apiPlugin],
		components: {
			page,
			text
		},
		apiOptions: {
			https: true
		}
	});

	let storyblokApi = await useStoryblokApi();

	return {
		url: url.pathname,
		storyblokApi: storyblokApi
	};
};

// // Basic version
// export const load: LayoutServerLoad = async ({ url }) => {
// 	return {
// 		url: url.pathname
// 	};
// };
