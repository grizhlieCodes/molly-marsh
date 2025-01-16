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

<Header blok={data.navData}></Header>

<div>
	{#if data.url && data.storyblokApi}
		<PageTransition url={data.url}>
			{@render children()}
		</PageTransition>
	{/if}
</div>
