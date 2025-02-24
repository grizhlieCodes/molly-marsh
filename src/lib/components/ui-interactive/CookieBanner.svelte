<script>
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	// Create a store for cookie acknowledgment
	let cookieAcknowledged = $state(browser ? localStorage.getItem('cookie-acknowledged') : null);

	// Update localStorage when acknowledgment changes
	$effect(() => {
		if (browser && cookieAcknowledged) {
			localStorage.setItem('cookie-acknowledged', cookieAcknowledged);
		}
	});

	function acknowledgeCookies() {
		cookieAcknowledged = 'acknowledged';
	}

	onMount(() => {
		// onMount only runs in the browser
	});
</script>

{#if browser && cookieAcknowledged === null}
	<div
		class="bg-body-primary-100 border-body-primary-500 fixed bottom-10 left-1/2 z-2000
	flex w-full max-w-[min(90%,40rem)] -translate-x-1/2 flex-col gap-4 overflow-hidden
	rounded-lg border-2 p-6 md:gap-6 md:p-8 lg:p-10"
	>
		<p class="font-body text-xl">
			This website uses essential cookies from Storyblok, our CMS provider. These cookies are necessary for site functionality and cannot be disabled. They do not collect personal information.
		</p>
		<div class="flex gap-3">
			<button
				class="bg-body-primary-800 hover:bg-body-primary-950 cursor-pointer
			rounded px-4 py-2 text-white"
				onclick={acknowledgeCookies}
			>
				I Understand
			</button>
			<a href="/cookie-policy" class="ml-4 self-center underline"> Cookie Policy </a>
		</div>
	</div>
{/if}
