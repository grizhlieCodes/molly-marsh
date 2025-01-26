<script lang="ts">
	import { page } from '$app/state';
	import { StoryblokComponent } from '@storyblok/svelte';
	import TabletDesktopLink from '../header/TabletDesktopLink.svelte';
	import FooterLink from './FooterLink.svelte';

	let { blok }: { blok: any } = $props();
	let { column_label, column_links } = $derived(blok);
	// we get a text component here (array of 1)
	// we also get an array of links (array of many)
	// $inspect({ column_label, column_links });
</script>

<div class="flex flex-col gap-3 ">
	{#if column_label && column_label.length > 0}
		<StoryblokComponent blok={column_label[0]}></StoryblokComponent>
		<div class="flex flex-col gap-2">
			{#if column_links && column_links.length > 0}
				{#each column_links as link}
					{@const linkEqualsCurrentPage = link.url.url === page.url.pathname}
					<FooterLink blok={link} {linkEqualsCurrentPage} />
				{/each}
			{/if}
		</div>
	{/if}
</div>
