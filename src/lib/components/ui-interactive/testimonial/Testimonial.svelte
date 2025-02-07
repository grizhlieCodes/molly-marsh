<script lang="ts">
	import { Dialog } from 'bits-ui';
	import { fade, fly } from 'svelte/transition';
	import { StoryblokComponent, storyblokEditable } from '@storyblok/svelte';
	// import { X } from 'lucide-svelte';
	import X from 'lucide-svelte/icons/x';
	import type { TestimonialStoryblok } from '$lib/schemas/storyblok/sbTypes';
	let { blok }: { blok: TestimonialStoryblok } = $props();

	let dialogTriggerStyling = `bg-surface-primary-50 border-surface-primary-200 group group-hover:bg-surface-primary-100 pointer-events-auto flex w-full max-w-3xl flex-col
		gap-6 rounded-xl border p-6 transition-all duration-500 hover:scale-102 hover:cursor-pointer md:gap-8`;
	let dialogContentStyling = `bg-surface-primary-50 border-surface-primary-200 fixed top-1/2 left-1/2 z-50 flex max-h-[70%] w-[90%] max-w-[30rem]
				-translate-x-1/2 -translate-y-1/2 flex-col gap-4 overflow-y-scroll rounded-lg border p-7 shadow-2xl outline-none`;
</script>

<div use:storyblokEditable={blok} class="testimonial w-full">
	{#if blok}
		<!-- content here -->
		<Dialog.Root>
			<Dialog.Trigger class={dialogTriggerStyling}>
				{#if blok.testimonial_title && blok.testimonial_title.length > 0}
					<StoryblokComponent blok={blok.testimonial_title[0]}></StoryblokComponent>
				{/if}
				{#if blok.testimonial_summary && blok.testimonial_summary.length > 0}
					<StoryblokComponent blok={blok.testimonial_summary[0]}></StoryblokComponent>
				{/if}
				<div class="flex w-full flex-row flex-wrap justify-between gap-4">
					{#if blok.testimonial_name && blok.testimonial_name.length > 0}
						<div class="w-max">
							<StoryblokComponent blok={blok.testimonial_name[0]}></StoryblokComponent>
						</div>
					{/if}
					{#if blok.testimonial_button_text && blok.testimonial_button_text.length > 0}
						<div class="w-max">
							<StoryblokComponent blok={blok.testimonial_button_text[0]}></StoryblokComponent>
						</div>
					{/if}
				</div>
			</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay transition={fade} transitionConfig={{ duration:
				150 }} class="fixed inset-0 z-50 bg-white/20 backdrop-blur-xl"></Dialog.Overlay>
				<Dialog.Content class={dialogContentStyling} transition={fly} transitionConfig={{ duration: 450, y: 40 }}>
					<Dialog.Title>
						{#if blok.testimonial_title && blok.testimonial_title.length > 0}
							<div class="max-w-[90%]">
								<StoryblokComponent blok={blok.testimonial_title[0]}></StoryblokComponent>
							</div>
						{/if}
					</Dialog.Title>
					<Dialog.Description>
						<div class="**:not-last:mb-5 **:not-last:block">
							{#if blok.testimonial_full_message && blok.testimonial_full_message.length > 0}
								<StoryblokComponent blok={blok.testimonial_full_message[0]}></StoryblokComponent>
								<!-- span MARGIN span MARGIN span -->
							{/if}
						</div>
					</Dialog.Description>
					<Dialog.Close class="bg-surface-primary-100 absolute top-5 right-5 rounded-md p-2">
						<div>
							<X class="size-6"></X>
							<span class="sr-only">Close</span>
						</div>
					</Dialog.Close>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	{/if}
</div>
