import type { PageServerLoad } from './$types';
import { useStoryblokApi } from '@storyblok/svelte';
import StoryblokClient from 'storyblok-js-client';
import { PUBLIC_STORYBLOK_ACCESS_TOKEN } from '$env/static/public';

const sbJsClient = new StoryblokClient({
	accessToken: PUBLIC_STORYBLOK_ACCESS_TOKEN
});

export const load: PageServerLoad = async ({ parent, url, params }) => {
	const slug = url.pathname.slice(1);
	const version = dev || url.searchParams.has('_storyblok') ? 'draft' : 'published';
	// let storyblokApi = await useStoryblokApi();
	const article = await sbJsClient.get(`cdn/stories/${slug}`, {
		content_type: 'article',
		version,
		resolve_relations: ['article.article_tag']
	});

	return {
		article: article.data.story
	};
};
