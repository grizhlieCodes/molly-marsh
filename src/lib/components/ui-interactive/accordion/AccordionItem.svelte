<script lang="ts">
	import { Accordion } from 'bits-ui';
	import { slide } from 'svelte/transition';
	import { ChevronDown } from 'lucide-svelte';
	import { StoryblokComponent, storyblokEditable } from '@storyblok/svelte';

	let { blok, index }: { blok: any; index: number | string } = $props();
</script>

<div use:storyblokEditable={blok} class="w-full">
	<Accordion.Item value="${index}">
		<Accordion.Header>
			<Accordion.Trigger
				class="flex w-full flex-1 items-center
			justify-between py-5 text-[15px] font-medium transition-all
			[&[data-state=open]>span>svg]:rotate-180 "
			>
				{blok.title}
				<span class="hover:bg-dark-10 inline-flex size-8 items-center justify-center rounded-[7px] bg-transparent transition-all">
					<ChevronDown class="size-4 transition-all duration-200" />
				</span>
			</Accordion.Trigger>
		</Accordion.Header>
		<Accordion.Content transition={slide} transitionConfig={{ duration: 200 }} class="pb-[25px] text-sm tracking-[-0.01em]">
			{blok.content}
		</Accordion.Content>
	</Accordion.Item>
</div>
