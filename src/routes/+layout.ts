// IMPORTS
import type { LayoutLoad } from './$types';
import { useStoryblokApi } from '@storyblok/svelte';
import { useStoryblok } from '$lib/integrations/storyblok/useStoryblok';
import { dev } from '$app/environment'; // Import the 'dev' flag

export const load: LayoutLoad = async ({ url }) => {
	let storyblokApi;
	let initError = null;

	try {
		await useStoryblok();
		storyblokApi = await useStoryblokApi();
	} catch (initializationError) {
		console.error('Error initializing Storyblok API in +layout.ts:', initializationError);
		initError = initializationError;
	}

	let navData = null;

	const version = dev || url.searchParams.has('_storyblok') ? 'draft' : 'published';
	console.log(version)

	if (storyblokApi) {
		try {
			const navResponse = await storyblokApi.get('cdn/stories/_navigation', {
				version: 'published',
				cv: Date.now()
			});
			navData = navResponse?.data?.story?.content;
		} catch (error) {
			console.error('Navigation fetch error:', error);
		}
	}

	return {
		url: url.pathname,
		storyblokApi,
		initError: initError?.message,
		navData,
		storyblokInitialized: !!storyblokApi, // Add this flag
		version
	};
};
