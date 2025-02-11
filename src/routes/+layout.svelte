<script lang="ts">
	// Core
	import '../app.css';
	const { children, data }: { children: any; data: any } = $props();

	// Transition pages on route change
	import PageTransition from '$lib/components/layout/PageTransition.svelte';
	// If we're dragging, set so. Useful for some functionality.
	import DraggingStore from '$lib/svelte/utils/DraggingStore.svelte';
	import Header from '$lib/components/navigation/header/Header.svelte';
	import Footer from '$lib/components/navigation/footer/Footer.svelte';
	import Head from '$lib/data/Head.svelte';

	// $inspect(data);
</script>

<Head />

<DraggingStore></DraggingStore>

{#if data.storyblokApi.accessToken}
	<!-- content here -->
	<div
		class="grid min-h-screen
	 grid-cols-1 grid-rows-[minmax(100px,max-content)_1fr_max-content]"
	>
		<Header blok={data.navData}></Header>

		<div class="row-start-2 h-full w-full">
			{#if data.url && data.storyblokApi}
				<PageTransition url={data.url}>
					{@render children()}
				</PageTransition>
			{/if}
		</div>

		<Footer blok={data.navData}></Footer>
	</div>
{:else}
	<div class="grid h-screen w-full place-items-center">
		<p class="font-serif text-3xl">Loading...</p>
	</div>
{/if}
