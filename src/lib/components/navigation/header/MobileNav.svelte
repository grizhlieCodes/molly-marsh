<script lang="ts">
	import { fly } from 'svelte/transition';
	import type { NavLinkStoryblok } from './headerTypes';
	import MobileCollapsible from './MobileCollapsible.svelte';

	let {
		mobileMenuActive,
		links,
		toggleMobileMenuActive
	}: {
		mobileMenuActive: boolean;
		links: NavLinkStoryblok[];
		toggleMobileMenuActive: () => void;
	} = $props();

	// $effect(() => console.log(links));
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
				{#if link.sub_links && link.sub_links.length > 0}
					<MobileCollapsible {link} {toggleMobileMenuActive} />
				{:else if link.sub_links && link.sub_links.length === 0}
					<a
						href={link.url.url}
						onclick={toggleMobileMenuActive}
						class="focus-within hover:bg-navLink-surface-primary-hover hover:text-navlink-text-primary-hover border-b-navLink-outline-primary-focus/30 text-navlink-text-primary flex w-full cursor-pointer items-center justify-between border-b-1 px-6 py-8 text-3xl font-bold transition-all duration-300"
						>{link.link_label}</a
					>
				{/if}
			{/each}
		</ul>
	</nav>
{/if}
