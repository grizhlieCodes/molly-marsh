import type { PageServerLoad } from './$types';

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
