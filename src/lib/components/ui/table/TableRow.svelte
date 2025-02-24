<script lang="ts">
	import { StoryblokComponent, storyblokEditable } from '@storyblok/svelte';
	let { blok, rowIndex }: { blok: any; rowIndex: number } = $props();
</script>

{#if rowIndex === 0}
	<thead use:storyblokEditable={blok}>
		<tr class="group">
			{#each blok.table_cells as cellContainer, cellIndex}
				<StoryblokComponent blok={cellContainer} {rowIndex} {cellIndex} />
			{/each}
		</tr>
	</thead>
{:else}
	<tr class="group" use:storyblokEditable={blok}>
		{#each blok.table_cells as cellContainer, cellIndex}
			<StoryblokComponent blok={cellContainer} {rowIndex} {cellIndex} />
		{/each}
	</tr>
{/if}
