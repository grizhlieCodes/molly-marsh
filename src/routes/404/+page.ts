import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, parent }) => {
	const { storyblokApi } = await parent();

	try {
		const dataStory = await storyblokApi.get(`cdn/stories/not-found`, {
			version: 'draft'
		});

		return {
			story: dataStory.data.story
		};
	} catch (err) {
		throw redirect(307, '/404');
	}
};
