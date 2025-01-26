<script lang="ts">
	import { StoryblokComponent } from '@storyblok/svelte';
	let { blok, linkEqualsCurrentPage }: { blok: any; linkEqualsCurrentPage: boolean } = $props();
</script>

<a
	href={blok.url.url}
	aria-label={blok.link_description}
	data-sveltekit-preload-data
	class="*:!text-white hover:*:underline
{linkEqualsCurrentPage ? 'underline' : ''} text-white"
>
	<StoryblokComponent blok={blok.link_label[0]}></StoryblokComponent>
</a>
