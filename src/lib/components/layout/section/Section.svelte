<script lang="ts">
	import { StoryblokComponent, storyblokEditable } from '@storyblok/svelte';
	import type { SectionStoryblok } from './sectionTypes';

	import * as options from './sectionOptions';

	// PROPS
	let { blok }: { blok: SectionStoryblok } = $props();

	// STYLING
	const BASE_CLASSES = 'mx-auto flex w-full flex-col text-center relative h-max';

	let styles = $state({
		grid: options.gridSpanOptions[blok.grid_span],
		justify: options.justifyContentOptions[blok.justify_content],
		align: options.alignItemsOptions[blok.align_items],
		yPadding: options.yPaddingOptions[blok.vertical_padding.value],
		xPadding: options.xPaddingOptions[blok.horizontal_padding.value],
		gap: options.gapOptions[blok.gap.value],
		bg: options.backgroundOptions[blok.background_color],
		overflow: options.overflowOptions[blok.overflow]
	});

	let styling = $derived(`${BASE_CLASSES} ${Object.values(styles).join(' ')}`);
</script>

<svelte:element this={blok.type} use:storyblokEditable={blok} aria-labelledby={blok.section_labelledby} id={blok.section_id} style={blok.customStyling} class={styling}>
	{#if blok.blocks}
		{#each blok.blocks as blokk}
			<StoryblokComponent blok={blokk}></StoryblokComponent>
		{/each}
	{/if}
</svelte:element>
