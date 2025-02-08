// IMPORTS
import type { LayoutLoad } from './$types';
import { PUBLIC_STORYBLOK_ACCESS_TOKEN } from '$env/static/public';
import { apiPlugin, storyblokInit, useStoryblokApi } from '@storyblok/svelte';

// COMPONENTS

//  01 - Layout
import { default as page } from '$lib/components/layout/Page.svelte';
import { default as section } from '$lib/components/layout/section/Section.svelte';
import { default as container } from '$lib/components/layout/container/Container.svelte';
import { default as custom_hero } from '$lib/components/layout/hero/CustomHero.svelte';

// 02 - UI
import { default as simple_text } from '$lib/components/ui/SimpleText.svelte';
import { default as text } from '$lib/components/ui/text/Text.svelte';
import { default as embed_text } from '$lib/components/ui/text/EmbedText.svelte';
import { default as icon } from '$lib/components/ui/icon/Icon.svelte';
import { default as image } from '$lib/components/ui/image/Image.svelte';
import { default as svg_divider } from '$lib/components/ui/svg-divider/SvgDivider.svelte';
import { default as divider } from '$lib/components/ui/divider/Divider.svelte';
import { default as custom_richtext } from '$lib/components/ui/CustomRichtext.svelte';

// 03 - UI: Interactive
import { default as button } from '$lib/components/ui-interactive/button/Button.svelte';
import { default as testimonial } from '$lib/components/ui-interactive/testimonial/Testimonial.svelte';
import { default as price_card } from '$lib/components/ui-interactive/price-card/PriceCard.svelte';
import { default as price_card_stripe_btn } from '$lib/components/ui-interactive/price-card/PriceCardStripeBtn.svelte';
import { default as price_card_url_btn } from '$lib/components/ui-interactive/price-card/PriceCardUrlBtn.svelte';
import { default as accordion } from '$lib/components/ui-interactive/accordion/Accordion.svelte';
import { default as accordion_item } from '$lib/components/ui-interactive/accordion/AccordionItem.svelte';

// 05 - Data / Blog / Etc
import { default as all_articles } from '$lib/components/content/AllArticles.svelte';
import { default as article } from '$lib/components/content/Article.svelte';
import { default as article_sort_filter } from '$lib/components/content/ArticleSortFilter.svelte';

// 06 - FORM
import { default as form } from '$lib/components/form/Form.svelte';
import { default as form_input } from '$lib/components/form/FormInput.svelte';
import { default as form_textarea } from '$lib/components/form/FormTextarea.svelte';

// 04 - Navigation -> Turns out we don't need to import this into storyblok..?
// mostly because we are not using it in a page I guess. So it's just data we
// are grabbing.
// import { default as header } from '$lib/components/navigation/header/Header.svelte';
// import { default as nav_link } from '$lib/components/navigation/header/Link.svelte';

// export const load: LayoutLoad = async ({ url }) => {
// 	let storyblokApi; // Declare without immediate assignment
// 	let initError = null;
// 	try {
// 		storyblokInit({
// 			accessToken: PUBLIC_STORYBLOK_ACCESS_TOKEN, // this is actually a preview token, ignore
// 			use: [apiPlugin],
// 			components: {
// 				// Layout
// 				page,
// 				section,
// 				container,
// 				custom_hero,
// 				// UI
// 				simple_text,
// 				text,
// 				embed_text,
// 				icon,
// 				image,
// 				svg_divider,
// 				divider,
// 				custom_richtext,
// 				// UI: Interactive
// 				button,
// 				testimonial,
// 				price_card,
// 				price_card_stripe_btn,
// 				price_card_url_btn,
// 				accordion,
// 				accordion_item,
// 				// FORM
// 				form,
// 				form_input,
// 				form_textarea,
// 				// CONTENT / BLOG / ARTICLES`
// 				all_articles,
// 				article,
// 				article_sort_filter
// 			},
// 			apiOptions: {
// 				https: true
// 			}
// 		});
// 		storyblokApi = await useStoryblokApi();
// 	} catch (initializationError) {
// 		console.error('Error initializing Storyblok API in +layout.ts:', initializationError);
// 		storyblokApi = null; // Set to null in case of initialization failure
// 		initError = initializationError;
// 	}

// 	// let storyblokApi = await useStoryblokApi();

// 	let navData = null; // Initialize navData to null

// 	// const navData = await storyblokApi.get('cdn/stories/_navigation', {
// 	// 	version: 'published'
// 	// });

// 	if (storyblokApi) {
// 		// Check if storyblokApi is valid before using it
// 		try {
// 			const navResponse = await storyblokApi.get('cdn/stories/_navigation', {
// 				version: 'published'
// 			});
// 			navData = navResponse?.data?.story?.content;
// 		} catch (error) {
// 			console.error('Error fetching navigation data from Storyblok in +layout.ts:', error);
// 			// Optionally, you could set a default or empty navData here
// 			// navData = {};
// 		}
// 	} else {
// 		console.error('Storyblok API was not initialized. Navigation data cannot be fetched in +layout.ts.');
// 	}

// 	// console.log(navData)

// 	return {
// 		url: url.pathname,
// 		storyblokApi,
// 		initError: initError?.message,
// 		navData
// 	};
// };

export const load: LayoutLoad = async ({ url }) => {
	let storyblokApi;
	let initError = null;

	try {
		// Initialize only once in layout
		storyblokInit({
			accessToken: PUBLIC_STORYBLOK_ACCESS_TOKEN,
			use: [apiPlugin],
			components: {
				// Layout
				page,
				section,
				container,
				custom_hero,
				// UI
				simple_text,
				text,
				embed_text,
				icon,
				image,
				svg_divider,
				divider,
				custom_richtext,
				// UI: Interactive
				button,
				testimonial,
				price_card,
				price_card_stripe_btn,
				price_card_url_btn,
				accordion,
				accordion_item,
				// FORM
				form,
				form_input,
				form_textarea,
				// CONTENT / BLOG / ARTICLES`
				all_articles,
				article,
				article_sort_filter
			},
			apiOptions: {
				https: true
			}
		});

		// Add a small delay to ensure initialization is complete
		await new Promise((resolve) => setTimeout(resolve, 100));

		storyblokApi = await useStoryblokApi();
	} catch (initializationError) {
		console.error('Error initializing Storyblok API in +layout.ts:', initializationError);
		initError = initializationError;
	}

	let navData = null;

	if (storyblokApi) {
		try {
			const navResponse = await storyblokApi.get('cdn/stories/_navigation', {
				version: 'published',
				cv: Date.now()
			});
			navData = navResponse?.data?.story?.content;
		} catch (error) {
			console.error('Navigation fetch error:', error);
		}
	}

	return {
		url: url.pathname,
		storyblokApi,
		initError: initError?.message,
		navData,
		storyblokInitialized: !!storyblokApi // Add this flag
	};
};
