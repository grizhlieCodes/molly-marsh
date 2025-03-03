import { DOMAIN } from '$env/static/private'; // Or use PUBLIC_ variables if appropriate
import { useStoryblokApi } from '@storyblok/svelte';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	try {
		// Initialize Storyblok
		const storyblokApi = await useStoryblokApi();

		// Get all published stories from Storyblok
		const { data } = await storyblokApi.get('cdn/stories', {
			version: 'published',
			// Exclude stories you don't want in the sitemap
			excluding_slugs: '404,not-found'
		});

		const stories = data.stories;

		// Get the current date in ISO format for the lastmod field
		const lastMod = new Date().toISOString();

		// Filter out any stories with paths starting with "_"
		const filteredStories = stories.filter((story) => {
			// Exclude any story where the full_slug or any part of it starts with "_"
			return !story.full_slug.split('/').some((part) => part.startsWith('_'));
		});

		// Create the XML sitemap with proper headers
		const sitemap = `<?xml version="1.0" encoding="UTF-8" ?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
    <!-- Home page -->
    <url>
        <loc>https://www.mollymarshcoaching.com/</loc>
        <lastmod>${lastMod}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>
    
    ${filteredStories
			.map((story) => {
				// Skip home page as it's already added
				if (story.full_slug === 'home') return '';

				return `
    <url>
        <loc>https://www.mollymarshcoaching.com/${story.full_slug}</loc>
        <lastmod>${new Date(story.published_at || story.created_at).toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>${story.content?.component === 'article' ? '0.8' : '0.6'}</priority>
    </url>`;
			})
			.join('')}
</urlset>`;

		// Return the XML with the appropriate headers
		return new Response(sitemap, {
			headers: {
				'Content-Type': 'application/xml',
				'Cache-Control': 'max-age=3600'
			}
		});
	} catch (error) {
		console.error('Error generating sitemap:', error);
		return new Response('Error generating sitemap', { status: 500 });
	}
};
