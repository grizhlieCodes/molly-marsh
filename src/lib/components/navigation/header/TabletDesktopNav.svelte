<script lang="ts">
	import { page } from '$app/state';
	import type { NavLinkStoryblok } from './headerTypes';
	import TabletDesktopLink from './TabletDesktopLink.svelte';
	let { links }: { links: NavLinkStoryblok[] } = $props();
</script>

<nav class="md:block hidden">
	<ul class="lt:gap-4 flex gap-3">
		{#each links as link}
			{@const linkEqualsCurrentPage = link.url.url === page.url.pathname}
			<TabletDesktopLink {link} {linkEqualsCurrentPage} />
		{/each}
	</ul>
</nav>
