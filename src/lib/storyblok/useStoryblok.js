import { PUBLIC_STORYBLOK_ACCESS_TOKEN } from '$env/static/public';
import { apiPlugin, storyblokInit, useStoryblokApi } from '@storyblok/svelte';

// COMPONENTS

//  01 - Layout
import { default as page } from '$lib/components/layout/Page.svelte';
import { default as section } from '$lib/components/layout/section/Section.svelte';
import { default as container } from '$lib/components/layout/container/Container.svelte';
import { default as custom_hero } from '$lib/components/layout/hero/CustomHero.svelte';
import { default as footer_cta } from '$lib/components/layout/CtaContainer.svelte';

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
import { default as cal_com_embed } from '$lib/components/ui-interactive/CalEmbed.svelte';

// 05 - Data / Blog / Etc
import { default as all_articles } from '$lib/components/content/AllArticles.svelte';
import { default as article } from '$lib/components/content/Article.svelte';
import { default as article_sort_filter } from '$lib/components/content/ArticleSortFilter.svelte';

// 06 - FORM
import { default as form } from '$lib/components/form/Form.svelte';
import { default as form_input } from '$lib/components/form/FormInput.svelte';
import { default as form_textarea } from '$lib/components/form/FormTextarea.svelte';

export async function useStoryblok(accessToken = '') {
	accessToken = accessToken === '' ? PUBLIC_STORYBLOK_ACCESS_TOKEN : accessToken;

	storyblokInit({
		accessToken: PUBLIC_STORYBLOK_ACCESS_TOKEN,
		use: [apiPlugin],
		components: {
			// Layout
			page,
			section,
			container,
			custom_hero,
			footer_cta,
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
			cal_com_embed,
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
			https: true,
			maxRetries: 2,
			cache: {
				type: 'memory'
			}
		}
	});
}
