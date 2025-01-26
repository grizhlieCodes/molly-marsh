<script lang="ts">
	import { StoryblokComponent } from '@storyblok/svelte';

	// Imports
	import type { NavLinkStoryblok } from './headerTypes';
	import { ChevronDown } from 'lucide-svelte';
	let { link, linkEqualsCurrentPage }: { link: NavLinkStoryblok; linkEqualsCurrentPage: boolean } = $props();
	// import { smoother } from '$lib/gsap.svelte.js';

	// State Variables
	let linkHasSublinks = $derived(link.sub_links && link.sub_links.length > 0);
	let ariaHasPopup = $derived(linkHasSublinks ? true : false);
	let focusedInside = $state(false);
	let ariaExpanded = $state(false);

	// Handling State
	const handleFocus = () => {
		focusedInside = true;
		ariaExpanded = true;
	};

	const handleBlur = (e: any) => {
		// Delay the blur check to ensure that the next item (if any) receives focus first
		setTimeout(() => {
			if (!focusedInside) {
				ariaExpanded = false;
			}
			focusedInside = false; // Reset for the next cycle
		}, 0);
	};

	// $effect(() => console.log('TabletDesktopLink ==================', link));
</script>

<li class="tablet-desktop-link group relative list-none " onmouseover={() => (ariaExpanded = true)} onmouseleave={() => (ariaExpanded = false)} onfocus={() => (ariaExpanded = true)} onblur={handleBlur}>
	<a
		href={link.url.url}
		data-sveltekit-preload-data
		class="bg-navLink-surface-primary-default group-focus-within:bg-navLink-surface-primary-hover group-focus-within:navLink-outline-primary-focus group-hover:bg-navLink-surface-primary-hover m-0 flex flex-row
    items-center gap-1 rounded-lg px-4 py-3 transition-all duration-500 group-focus-within:outline-1"
		aria-haspopup={ariaHasPopup}
		aria-expanded={ariaExpanded}
		onfocus={handleFocus}
	>
		<!-- <span
			class:font-bold={linkEqualsCurrentPage}
			class="text-navlink-text-primary group-focus-within:text-navlink-text-primary-hover
		group-hover:text-navlink-text-primary-hover text-lg transition-all duration-500"
		>
			{link.link_label}</span
		> -->
		<StoryblokComponent blok={link.link_label[0]}></StoryblokComponent>
		{#if linkHasSublinks}
			<div
				class="**:!stroke-body-primary-800 transition-transform
			duration-500 group-focus-within:rotate-180
			 group-hover:rotate-180"
			>
				<ChevronDown></ChevronDown>
			</div>
		{/if}
	</a>
	{#if linkHasSublinks}
		<div
			class="pointer-events-none invisible absolute top-full left-1/2 -translate-x-1/2
		pt-6 opacity-0 transition-all
         duration-500 group-focus-within:pointer-events-auto group-focus-within:visible
         group-focus-within:opacity-100 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100"
		>
			<ul
				class="min-w-20rem flex w-max flex-col rounded-lg border border-solid
         border-emerald-800/40 bg-white py-6 text-left"
			>
				{#if link?.sub_links && link?.sub_links.length > 0}
					{#each link?.sub_links as sLink, i}
						<a
							data-sveltekit-preload-data
							href={sLink.url.url}
							class=" focus-within:bg-navLink-surface-primary-hover hover:bg-navLink-surface-primary-hover px-6 py-1
						text-lg outline-0 transition-all duration-500"
						>
							<StoryblokComponent blok={sLink.link_label[0]}></StoryblokComponent>
						</a>
					{/each}
				{/if}
			</ul>
		</div>
	{/if}
</li>
