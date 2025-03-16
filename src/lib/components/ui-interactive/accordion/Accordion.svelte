<script lang="ts">
	import { Accordion } from 'bits-ui';
	import { StoryblokComponent, storyblokEditable } from '@storyblok/svelte';
	import type { AccordionStoryblok } from '$lib/schemas/storyblok/sbTypes';

	let { blok }: { blok: AccordionStoryblok } = $props();
</script>

<div use:storyblokEditable={blok} class="w-full">
	<Accordion.Root class="w-full" type="multiple">
		{#each blok.accordion_items as item, index}
			<StoryblokComponent blok={item} {index}></StoryblokComponent>
		{/each}
	</Accordion.Root>
</div>
