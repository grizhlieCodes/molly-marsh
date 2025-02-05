<script lang="ts">
	import type { CustomRichtextStoryblok } from '$lib/schemas/storyblok/sbTypes';
	import { renderRichText, storyblokEditable } from '@storyblok/svelte';
	let { blok }: { blok: CustomRichtextStoryblok } = $props();

	$inspect(blok);
	let headingStyle = blok.heading_styles === 'serif' ? 'prose-headings:font-serif' : 'prose-headings:font-sans';
</script>

<div
	use:storyblokEditable={blok}
	class="prose prose-lg prose-headings:font-[500]
w-full max-w-none {headingStyle} prose-li:!my-1 prose-li:*:!my-0"
>
	{@html renderRichText(blok.text)}
</div>
