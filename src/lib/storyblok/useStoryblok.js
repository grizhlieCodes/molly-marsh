import { PUBLIC_STORYBLOK_ACCESS_TOKEN } from '$env/static/public';
import { apiPlugin, storyblokInit, useStoryblokApi } from '@storyblok/svelte';

// COMPONENTS

//  01 - Layout
import { default as page } from '$lib/components/layout/Page.svelte';
import { default as text } from '$lib/components/ui/Text.svelte';

// COMPONENTS OBJECT
const components = {
	page,
	text
};

export async function useStoryblok(accessToken = '') {
	accessToken = accessToken === '' ? PUBLIC_STORYBLOK_ACCESS_TOKEN : accessToken;

	await storyblokInit({
		accessToken: PUBLIC_STORYBLOK_ACCESS_TOKEN,
		use: [apiPlugin],
		components,
		apiOptions: {
			https: true,
			cache: {
				type: 'memory'
			}
		}
	});

	// let storyblokApi = await useStoryblokApi();

	console.log(storyblokApi);
}
