import type { PageServerLoad } from './$types';
import { useStoryblokApi } from '@storyblok/svelte';
// import StoryblokClient from 'storyblok-js-client';
import { PUBLIC_STORYBLOK_ACCESS_TOKEN } from '$env/static/public';

// const sbJsClient = new StoryblokClient({
// 	accessToken: PUBLIC_STORYBLOK_ACCESS_TOKEN
// });

export const load: PageServerLoad = async ({ parent, url, params }) => {
	const slug = url.pathname.slice(1);
	let storyblokApi = await useStoryblokApi();

	const dataStory = await storyblokApi.get(`cdn/stories/${slug}`, {
		version: 'draft'
	});

	const tags = await storyblokApi.get('cdn/stories', {
		content_type: 'tag',
		version: 'published'
		// starts_with: '_data/_tags'
	});

	const articles = await storyblokApi.get('cdn/stories', {
		content_type: 'article',
		version: 'published'
		// starts_with: 'blog'
	});

	return {
		story: dataStory.data.story,
		articles: articles.data.stories,
		tags: tags.data.stories
	};
};
