<script lang="ts">
	import { storyblokEditable } from '@storyblok/svelte';
	let { blok }: { blok: any } = $props();
</script>

{#if blok}
	<span use:storyblokEditable={blok} class="">{blok.text}</span>
{/if}
