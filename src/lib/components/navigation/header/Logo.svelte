<script lang="ts">
	import { storyblokEditable, StoryblokComponent } from '@storyblok/svelte';
	import type { NavLogoStoryblok } from './headerTypes';
	import { gapOptions } from './headerOptions';
	let { blok }: { blok: NavLogoStoryblok } = $props();
	let logo = $derived(blok);
	let gap = $state(blok.gap ?? gapOptions[blok.gap]);
</script>

<div class="">
	<a
		href={logo.url.url}
		class="flex w-max cursor-pointer items-center {gap}
	primary-outline rounded-lg transition-transform hover:scale-105"
	>
		{#if logo.logo_image && logo.logo_image.filename}
			<img src="{logo.logo_image.filename}/m/300x0" alt={logo.logo_image.alt ?? 'logo'} />
		{/if}
		{#if logo.logo_text && logo?.logo_text.length > 0}
			<span class="font-nav-logo text-logo-primary -translate-y-0.5 text-xl md:text-2xl">{logo.logo_text}</span>
		{/if}
	</a>
</div>

<!--
		temp whilst we add text.
	{#each blok.logo_text as blokk}
		<StoryblokComponent blok={blokk} />
	{/each}
-->
