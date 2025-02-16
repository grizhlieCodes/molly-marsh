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
	if (data.forms) {
		data.forms.forEach((formData: any, index: number) => {
			setContext(`${formData.id}`, () => formData);
		});
	}

	$inspect("VERSION:   ========== ", data.version)
</script>

<svelte:head>
	<title>Molly Marsh - {story.name}</title>
</svelte:head>

{#key story}
	{#if story && mounted}
		<StoryblokComponent blok={story.content}></StoryblokComponent>
	{/if}
{/key}
