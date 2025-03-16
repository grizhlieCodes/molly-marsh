<script lang="ts">
	import type { AccordionItemStoryblok } from '$lib/schemas/storyblok/sbTypes';
	import { Accordion } from 'bits-ui';
	import { slide } from 'svelte/transition';
	import ChevronDown from 'lucide-svelte/icons/chevron-down';
	import { StoryblokComponent, storyblokEditable } from '@storyblok/svelte';

	let { blok, index }: { blok: AccordionItemStoryblok; index: number | string } = $props();
</script>

<div use:storyblokEditable={blok} class="w-full text-left">
	<Accordion.Item
		value="${index}"
		class="group border-b-surface-primary-900/20 data-[state=open]:bg-surface-primary-50
		w-full overflow-hidden rounded-md border-b"
	>
		<Accordion.Header class="w-full">
			<Accordion.Trigger
				class="hover:bg-surface-primary-100 not-active:focus-visible:bg-surface-primary-100 flex w-full
				flex-1 cursor-pointer items-center justify-between
				p-5 text-[15px]
				font-medium transition-all
				"
			>
				{#if blok.accordion_item_title && blok.accordion_item_title.length > 0}
					<div
						class="w-full *:block *:!w-full *:text-left
*:transition-all *:duration-300 group-data-[state=open]:*:!font-[650]"
					>
						<StoryblokComponent blok={blok.accordion_item_title[0]}></StoryblokComponent>
					</div>
				{/if}
				<span
					class="hover:bg-dark-10 inline-flex size-8 items-center
					justify-center rounded-[7px] bg-transparent transition-all duration-200
						group-data-[state=open]:rotate-180"
				>
					<ChevronDown class="stroke-body-primary-700 size-6" />
				</span>
			</Accordion.Trigger>
		</Accordion.Header>
		<Accordion.Content
			class="group-data-[state=closed]:animate-accordion-up
		group-data-[state=open]:animate-accordion-down w-full overflow-hidden
		 "
		>
			<div class="px-5 pb-6 text-sm tracking-[-0.01em]">
				<StoryblokComponent blok={blok.accordion_item_content[0]}></StoryblokComponent>
			</div>
		</Accordion.Content>
	</Accordion.Item>
</div>
