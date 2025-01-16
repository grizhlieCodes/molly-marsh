<script lang="ts">
	// TODO: Might have to unpack this page object.
	import { page } from '$app/state';
	import { StoryblokComponent, storyblokEditable } from '@storyblok/svelte';

	import type { PageStoryblok } from '$lib/schemas/storyblok/sbTypes';

	let {
		pageName,
		mainAriaLabel,
		position = 'relative',
		blok
	}: {
		pageName: string;
		mainAriaLabel: string;
		position: 'relative' | 'absolute' | 'fixed';
		blok: PageStoryblok;
	} = $props();
</script>

<main
	aria-label={blok.mainAriaLabel}
	id="{page.route.id === '/' && page.route.id ? 'home' : page.route}-main"
	class=" w-full"
	style:position={blok.pagePosition}
	use:storyblokEditable={blok}
>
	{#if blok.blocks && blok.blocks.length > 0}
		{#each blok.blocks as blokk}
			<StoryblokComponent blok={blokk} />
		{/each}
	{/if}
</main>
