<script lang="ts">
	import type { AccordionItemStoryblok } from '$lib/schemas/storyblok/sbTypes';
	import { Accordion } from 'bits-ui';
	import { slide } from 'svelte/transition';
	// import { ChevronDown } from 'lucide-svelte';
	import ChevronDown from 'lucide-svelte/icons/chevron-down';
	import { StoryblokComponent, storyblokEditable } from '@storyblok/svelte';

	let { blok, index }: { blok: AccordionItemStoryblok; index: number | string } = $props();

	let element: HTMLButtonElement | undefined = $state();

	let open = $state(false);

	const updateOpenState = (element: any, stateVar: boolean) => {
		const elementDataState = element.dataset.state;
		// console.log(elementDataState);
		if (elementDataState === 'open') {
			open = true;
		} else if (elementDataState === 'closed') {
			open = false;
		}
	};

	$effect(() => {
		if (element) {
			updateOpenState(element, open);
		}
	});
</script>

<div use:storyblokEditable={blok} class="w-full text-left">
	<Accordion.Item
		value="${index}"
		class="group border-b-surface-primary-900/20 w-full
	overflow-hidden rounded-md border-b {open ? 'bg-surface-primary-50' : ''}"
	>
		<Accordion.Header class="w-full">
			<Accordion.Trigger
				onclick={() => updateOpenState(element, open)}
				bind:el={element}
				class="hover:bg-surface-primary-100 flex w-full flex-1
			cursor-pointer items-center justify-between p-5
			text-[15px] font-medium
			transition-all 
			"
			>
				{#if blok.accordion_item_title && blok.accordion_item_title.length > 0}
					<div
						class="w-full *:block *:!w-full *:text-left
*:transition-all *:duration-300 {open ? '*:font-[650]' : ''}"
					>
						<StoryblokComponent blok={blok.accordion_item_title[0]}></StoryblokComponent>
					</div>
				{/if}
				<span
					class="hover:bg-dark-10 inline-flex size-8 items-center
				justify-center rounded-[7px] bg-transparent transition-all"
				>
					<ChevronDown
						class="stroke-body-primary-700 size-6 transition-all duration-200
					{open ? 'rotate-180' : ''}"
					/>
				</span>
			</Accordion.Trigger>
		</Accordion.Header>
		<Accordion.Content transition={slide} transitionConfig={{ duration: 200 }} class="w-full px-5 pb-6 text-sm tracking-[-0.01em]">
			{#if blok.accordion_item_content && blok.accordion_item_content.length > 0}
				<StoryblokComponent blok={blok.accordion_item_content[0]}></StoryblokComponent>
			{/if}
		</Accordion.Content>
	</Accordion.Item>
</div>
