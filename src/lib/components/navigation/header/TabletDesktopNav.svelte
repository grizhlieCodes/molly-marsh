<script lang="ts">
	import { page } from '$app/state';
	import type { NavLinkStoryblok } from './headerTypes';
	import TabletDesktopLink from './TabletDesktopLink.svelte';
	let { links }: { links: NavLinkStoryblok[] } = $props();
</script>

<nav class="md:block hidden">
	<ul class=" flex">
		{#each links as link, index}
			{@const linkEqualsCurrentPage = link.url.url === page.url.pathname}
			{@const isLastLink = index === links.length - 1}
			<TabletDesktopLink {link} {linkEqualsCurrentPage} {isLastLink} />
		{/each}
	</ul>
</nav>
