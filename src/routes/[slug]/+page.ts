import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, parent }) => {
	const { storyblokApi } = await parent();
	let slug = params.slug;
	console.log(slug);
	const dataStory = await storyblokApi.get(`cdn/stories/${slug}`, {
		version: 'draft'
	});
	console.log("STORY HERE ============================", dataStory);

	try {
		const dataStory = await storyblokApi.get(`cdn/stories/${slug}`, {
			version: 'draft'
		});

		console.log(dataStory);

		if (!dataStory?.data?.story) {
			console.log('Error bro come on');
			throw error(404, 'Story not found');
		}

		return {
			story: dataStory.data.story
		};
	} catch (err) {
		throw redirect(307, '/404');
	}
};
