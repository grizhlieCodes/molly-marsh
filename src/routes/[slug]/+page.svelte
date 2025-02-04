<script lang="ts">
	import { onMount } from 'svelte';
	let { data }: { data: any } = $props();
	import { useStoryblokBridge, StoryblokComponent, getStoryblokApi } from '@storyblok/svelte';
	import { setContext } from 'svelte';

	let mounted = $state(false);
	let story = $state(data.story);

	onMount(async () => {
		if (typeof window !== 'undefined') {
			useStoryblokBridge(
				story.id,
				(newStory) => {
					story = newStory;
				},
				{
					preventClicks: true,
					resolveLinks: 'url'
				}
			);
		}
		mounted = true;
	});

	let superFormData = $state(data.form);
	setContext('superformData', () => superFormData);
</script>

{#key story}
	{#if story && mounted}
		<StoryblokComponent blok={story.content}></StoryblokComponent>
	{/if}
{/key}
