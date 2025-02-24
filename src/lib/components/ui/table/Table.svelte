<script lang="ts">
	import { StoryblokComponent, storyblokEditable } from '@storyblok/svelte';
	let { blok }: { blok: any } = $props();
</script>

<table
	class="w-full table-fixed overflow-hidden rounded-lg md:table"
	use:storyblokEditable={blok}
>
	{#each blok.table_rows as blokk, rowIndex}
		<StoryblokComponent blok={blokk} {rowIndex} />
	{/each}
</table>
