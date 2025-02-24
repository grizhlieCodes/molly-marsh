<script lang="ts">
	import { storyblokEditable, StoryblokComponent } from '@storyblok/svelte';
	let { blok, rowIndex, cellIndex }: { blok: any; rowIndex: number; cellIndex: number } = $props();
	$inspect(blok);

	const rowVisibility = $state(cellIndex == 2 || cellIndex == 3 ? 'hidden sm:table-cell' : 'visible');
</script>

{#if rowIndex === 0}
	<th
		use:storyblokEditable={blok}
		class="border-body-primary-200 bg-body-primary-100 group-hover:bg-body-primary-200 border-r-2 border-b-2 py-0 text-center font-sans
	 text-blue-100 last:border-r-0 {rowVisibility}   px-2"
	>
		{#each blok.cell_content as blokk}
			<StoryblokComponent blok={blokk} />
		{/each}
	</th>
{:else}
	<td
		use:storyblokEditable={blok}
		class=" border-body-primary-200 bg-body-primary-50 group-hover:bg-body-primary-100
	w-full border-r-2 border-b-2 py-3
	text-center last:border-r-0 {rowVisibility} px-2"
	>
		<div class="flex w-full items-center justify-center">
			{#each blok.cell_content as blokk}
				<StoryblokComponent blok={blokk} />
			{/each}
		</div>
	</td>
{/if}
