<script lang="ts">
	import { storyblokEditable } from '@storyblok/svelte';
	let { blok }: { blok: any } = $props();
</script>

<div use:storyblokEditable={blok}>
	{#if blok}
		<p class="font-serif text-4xl">{blok.text}</p>
	{/if}
</div>
