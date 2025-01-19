// IMPORTS
import type { LayoutServerLoad } from './$types';
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
import { default as icon } from '$lib/components/ui/Icon.svelte';
import { default as image } from '$lib/components/ui/image/Image.svelte';

// 03 - UI: Interactive
import { default as button } from '$lib/components/ui-interactive/button/Button.svelte';

// 04 - Navigation -> Turns out we don't need to import this into storyblok..?
// mostly because we are not using it in a page I guess. So it's just data we
// are grabbing.
// import { default as header } from '$lib/components/navigation/header/Header.svelte';
// import { default as nav_link } from '$lib/components/navigation/header/Link.svelte';

export const load: LayoutServerLoad = async ({ url }) => {
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
			icon,
			image,
			// UI: Interactive
			button
			// Navigation
		},
		apiOptions: {
			https: true
		}
	});

	let storyblokApi = await useStoryblokApi();

	const navData = await storyblokApi.get('cdn/stories/_navigation', {
		version: 'published'
	});

	// console.log(navData?.data?.story?.content);

	return {
		url: url.pathname,
		storyblokApi: storyblokApi,
		navData: navData?.data?.story?.content
	};
};

// // Basic version
// export const load: LayoutServerLoad = async ({ url }) => {
// 	return {
// 		url: url.pathname
// 	};
// };
