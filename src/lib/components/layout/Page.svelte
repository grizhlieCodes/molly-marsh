<script lang="ts">
	// TODO: Might have to unpack this page object.
	import { page } from '$app/state';
	import { useStoryblokBridge, StoryblokComponent, storyblokEditable } from '@storyblok/svelte';
	$effect(() => console.log(page.route));
	// import { smoother } from '$lib/gsap.svelte.js';
	let {
		pageName,
		mainAriaLabel,
		position = 'relative',
		blok
	}: {
		pageName: string;
		mainAriaLabel: string;
		position: 'relative' | 'absolute' | 'fixed';
		blok: any;
	} = $props();
</script>

<main
	aria-label={mainAriaLabel}
	id="{page.route.id === '/' && page.route.id ? 'home' : page.route}-main"
	class=" w-full"
	style:position
	use:storyblokEditable={blok}
>
	<!-- {#if blok} -->
	<h1>{blok.text_test}</h1>
	{#if blok.blocks && blok.blocks.length > 0}
		{#each blok.blocks as blokk}
			<StoryblokComponent blok={blokk} />
		{/each}
	{/if}
	<!-- {/if} -->
</main>
