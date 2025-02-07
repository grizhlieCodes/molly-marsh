<script lang="ts">
	import { page } from '$app/state';
	import { fly } from 'svelte/transition';
	import type { NavLinkStoryblok } from './headerTypes';
	import MobileCollapsible from './MobileCollapsible.svelte';
	import { StoryblokComponent } from '@storyblok/svelte';

	let {
		mobileMenuActive,
		links,
		toggleMobileMenuActive
	}: {
		mobileMenuActive: boolean;
		links: NavLinkStoryblok[];
		toggleMobileMenuActive: () => void;
	} = $props();

	let linkStyling = `focus-within border-b-navLink-outline-primary-focus/30 flex w-full cursor-pointer
					items-center justify-between border-b-1 px-6 py-8 transition-all duration-300 **:!text-3xl **:!font-bold
                    data-[active=true]:bg-surface-primary-800 data-[active=true]:**:!text-body-primary-50
					data-[active=false]:**:!text-navlink-text-primary data-[active=false]:hover:bg-navLink-surface-primary-hover data-[active=false]:hover:text-navlink-text-primary-hover
					data-[active=false]:focus-within:bg-navLink-surface-primary-hover data-[active=false]:focus-within:text-navlink-text-primary-hover
	`;
</script>

{#if mobileMenuActive}
	<nav
		transition:fly={{ y: -12, duration: 400 }}
		class="bg-header-surface-primary inset-0 z-30 flex
     h-[calc(100vh_-_4.75rem)] w-full overflow-y-auto md:hidden"
	>
		<ul
			class="flex h-full w-full flex-col items-center justify-start
		pt-10"
		>
			{#each links as link, i}
				{@const activeLink = page.url.pathname === link.url.url}
				{#if link.sub_links && link.sub_links.length > 0}
					<MobileCollapsible {link} {toggleMobileMenuActive}  />
				{:else if link.sub_links && link.sub_links.length === 0}
					<a href={link.url.url} onclick={toggleMobileMenuActive} data-active={activeLink} class={linkStyling}>
						<StoryblokComponent blok={link.link_label[0]}></StoryblokComponent>
					</a>
				{/if}
			{/each}
		</ul>
	</nav>
{/if}
