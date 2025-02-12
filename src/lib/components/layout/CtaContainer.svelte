<script lang="ts">
	import { StoryblokComponent } from '@storyblok/svelte';

	let { blok }: { blok: any } = $props();
</script>

<div
	class="bg-surface-primary-900 grid h-max w-full
max-w-[90%] place-items-center rounded-tl-4xl rounded-tr-4xl"
>
	{#if blok.bloks && blok.bloks.length > 0}
		{#each blok.bloks as blokk}
			<StoryblokComponent blok={blokk}></StoryblokComponent>
		{/each}
	{/if}
</div>
