<script lang="ts">
	// Core
	import '../app.css';
	const { children, data }: { children: any; data: any } = $props();

	// Transition pages on route change
	import PageTransition from '$lib/components/layout/PageTransition.svelte';
	// If we're dragging, set so. Useful for some functionality.
	import DraggingStore from '$lib/svelte/utils/DraggingStore.svelte';
	import Header from '$lib/components/navigation/header/Header.svelte';

	// $effect(() => {
	// 	console.log('Effect: ', data);
	// });
</script>

<DraggingStore></DraggingStore>

<div class="grid grid-cols-1
grid-rows-[minmax(100px,max-content)_1fr_max-content] min-h-[150vh]">
	<Header blok={data.navData}></Header>

	<div class="row-start-2">
		{#if data.url && data.storyblokApi}
			<PageTransition url={data.url}>
				{@render children()}
			</PageTransition>
		{/if}
	</div>

	<div class="w-full bg-surface-primary-800 min-h-72 row-start-3">

	</div>
</div>
