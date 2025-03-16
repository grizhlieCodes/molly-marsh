<script lang="ts">
	import type { NavLinkStoryblok } from './headerTypes';
	import { linear } from 'svelte/easing';
	// import { ChevronDown, X } from 'lucide-svelte';
	import ChevronDown from 'lucide-svelte/icons/chevron-down';
	import X from 'lucide-svelte/icons/x';
	import { Collapsible } from 'bits-ui';
	import { slide } from 'svelte/transition';
	import { StoryblokComponent } from '@storyblok/svelte';

	const duration = 300;

	const options = { duration, easing: linear, times: 1 };

	let { link, toggleMobileMenuActive }: { link: NavLinkStoryblok; toggleMobileMenuActive: () => void } = $props();
	let isOpen = $state(false);

	function spin(node: any, options: any) {
		const { times = 1 } = options;
		const o = +getComputedStyle(node).opacity;

		return {
			...options,
			css(t: any) {
				const degrees = 360 * times;
				return `transform: rotate(${t * degrees}deg); opacity: ${t * o}`;
			}
		};
	}

</script>

<Collapsible.Root
	bind:open={isOpen}
	class="border-b-navLink-outline-primary-focus/30 flex w-full flex-col items-start justify-start
		border-b-1"
>
	<Collapsible.Trigger
		class="collapsible-mobile-nav focus-within [&[data-state='open']_>_*]:bg-navLink-surface-primary-hover
    [&[data-state='open']_>_*]:text-navlink-text-primary-hover flex
	w-full
	items-start justify-start transition-all duration-300"
	>
		<div
			class="hover:bg-navLink-surface-primary-hover hover:text-navlink-text-primary-hover flex w-full
        cursor-pointer
        items-center justify-between px-6 py-8
        transition-all duration-300 **:!text-3xl
        **:!font-bold
        {isOpen ? `bg-navLink-surface-primary-hover *:!text-navlink-text-primary-hover` : `*:!text-navlink-text-primary`}
        "
		>
			<StoryblokComponent blok={link.link_label[0]}></StoryblokComponent>
			<!-- <p class="w-full text-start">{link.link_label}</p> -->
			<div class="transition-transform duration-300" class:rotate-180={isOpen}>
				<ChevronDown size="32" />
			</div>
		</div>
	</Collapsible.Trigger>
	<Collapsible.Content forceMount class="w-full">
		{#snippet child({ props, open })}
			{#if open}
				<div {...props} transition:slide>
					<ul class="flex h-max w-full flex-col pt-2 pb-8">
						{#if link.sub_links && link.sub_links.length > 0}
							{#each link.sub_links as sublink, i}
								{#if sublink.sub_link_type === 'mobileMainLink' && i === 0}
									<a
										href={sublink.url.url}
										onclick={toggleMobileMenuActive}
										class="*:!text-navlink-text-primary focus-within:bg-navLink-surface-primary-hover hover:bg-navLink-surface-primary-hover
										w-full px-6 py-3  *:!text-xl *:!italic focus-within:outline-1 focus-within:outline-lime-500 hover:underline"
									>
										<StoryblokComponent blok={sublink.link_label[0]}></StoryblokComponent>
										<!-- {sublink.link_label} -->
									</a>
								{:else if sublink?.sub_link_type !== 'mobileMainLink'}
									<a
										href={sublink.url.url}
										class="*:!text-navlink-text-primary focus-within:bg-navLink-surface-primary-hover
										hover:bg-navLink-surface-primary-hover w-full px-6 py-3
										*:!text-xl focus-within:outline-1
										focus-within:outline-lime-500 hover:underline"
									>
										<StoryblokComponent blok={sublink.link_label[0]}></StoryblokComponent>
										<!-- {sublink.link_label} -->
									</a>
								{/if}
							{/each}
						{/if}
					</ul>
				</div>
			{/if}
		{/snippet}
	</Collapsible.Content>
</Collapsible.Root>