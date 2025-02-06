// /src/routes/blog/+page.server.ts
import type { PageServerLoad } from './$types';
import StoryblokClient from 'storyblok-js-client';
import { PUBLIC_STORYBLOK_ACCESS_TOKEN } from '$env/static/public';

// Initialize the REST client with your access token
const storyblokApi = new StoryblokClient({
	accessToken: PUBLIC_STORYBLOK_ACCESS_TOKEN,
	cache: {
		clear: 'auto',
		type: 'memory'
	}
});

export const load: PageServerLoad = async ({ url }) => {
	// The slug is based on the URL (adjust as needed)
	const slug = url.pathname.slice(1);

	try {
		const dataStory = await storyblokApi.get(`cdn/stories/${slug}`, {
			version: 'draft'
		});

		const tags = await storyblokApi.get('cdn/stories', {
			content_type: 'tag',
			version: 'published'
		});

		const articles = await storyblokApi.get('cdn/stories', {
			content_type: 'article',
			version: 'published',
			resolve_relations: ['article.article_tag']
		});

		return {
			story: dataStory.data.story,
			articles: articles.data.stories,
			tags: tags.data.stories
		};
	} catch (error) {
		console.error('Error loading Storyblok data:', error);
		throw error;
	}
};
