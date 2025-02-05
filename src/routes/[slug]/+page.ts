import { error, redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageServerLoad = async ({ params, parent, data }) => {
	const { storyblokApi } = await parent();
	let slug = params.slug;
	const dataStory = await storyblokApi.get(`cdn/stories/${slug}`, {
		version: 'draft'
	});
	console.log(dataStory);

	try {
		const dataStory = await storyblokApi.get(`cdn/stories/${slug}`, {
			version: 'draft'
		});

		if (!dataStory?.data?.story) {
			console.log('throwing error apparently')
			throw error(404, 'Story not found');
		}

		let formExists = await data?.form

		if (formExists) {
			return {
				story: dataStory.data.story,
				form: data.form
			};
		} else {
			return {
				story: dataStory.data.story
			};
		}
	} catch (err) {
		console.log('throwing error apparently as well')
		console.log("Error message:", err)
		throw redirect(307, '/404');
	}
};
