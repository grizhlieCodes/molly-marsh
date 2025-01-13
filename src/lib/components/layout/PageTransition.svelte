<script lang="ts">
	import { fly } from 'svelte/transition';
	import { aniStateStore } from '$lib/stores/animationState.svelte';
	let {
		children,
		url,
		duration = 300
	}: { children: any; url: string | undefined; duration?: number } = $props();

	let mounted: boolean = $state(false);
	$effect(() => {
		if (!mounted) {
			mounted = true;
			aniStateStore.set({ url, animationState: 'Intro Ended' });
		}
	});
</script>

{#key url}
	<div
		in:fly={{ x: 300, duration, delay: duration }}
		out:fly={{ x: -300, duration }}
		onintrostart={() => aniStateStore.set({ url, animationState: 'Intro Started' })}
		onintroend={() => aniStateStore.set({ url, animationState: 'Intro Ended' })}
	>
		{@render children?.()}
	</div>
{/key}
