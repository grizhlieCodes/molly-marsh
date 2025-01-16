import type { PageServerLoad } from './$types';
// import { apiPlugin, storyblokInit, useStoryblokApi } from '@storyblok/svelte';
// import { PUBLIC_STORYBLOK_ACCESS_TOKEN } from '$env/static/public';

export const load: PageServerLoad = async ({ url, params, parent }) => {
	const { storyblokApi } = await parent();

	const dataStory = await storyblokApi.get(`cdn/stories/home`, {
		version: 'draft',
		resolve_links: 'url'
	});

	return {
		story: dataStory.data.story
	};
};

// import { useStoryblokApi } from '@storyblok/svelte';
// import { useStoryblok } from '$lib/storyblok/useStoryblok.js';

// /** @type {import('./$types').PageLoad} */
// export async function load({ params }) {
// 	// let slug = params.slug ?? 'home';
// 	await useStoryblok();
// 	let storyblokApi = await useStoryblokApi();

// 	return storyblokApi
// 		.get(`cdn/stories/home`, {
// 			version: 'draft'
// 		})
// 		.then((dataStory) => {
// 			return {
// 				story: dataStory.data.story,
// 				error: false
// 			};
// 		})
// 		.catch((error) => {
// 			return {
// 				story: {},
// 				error: error
// 			};
// 		});
// }
