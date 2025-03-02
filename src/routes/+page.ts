import type { PageServerLoad } from './$types';

import { dev } from '$app/environment';

export const load: PageServerLoad = async ({ url, params, parent }) => {
	const { storyblokApi } = await parent();

	const version = dev || url.searchParams.has('_storyblok') ? 'draft' : 'published';

	const dataStory = await storyblokApi.get(`cdn/stories/home`, {
		version,
		resolve_links: 'url'
	});

	return {
		story: dataStory.data.story
		
	};
};
