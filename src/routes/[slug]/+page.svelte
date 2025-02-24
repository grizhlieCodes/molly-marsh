<script lang="ts">
	import { onMount } from 'svelte';
	let { data }: { data: any } = $props();
	import { useStoryblokBridge, StoryblokComponent, getStoryblokApi } from '@storyblok/svelte';
	import { setContext, getContext } from 'svelte';

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

	$effect(() => {
		if (data.articles) {
			setContext('articles', () => data.articles);
		}
	});

	$effect(() => {
		if (data.tags) {
			setContext('tags', () => data.tags);
		}
	});

	import ReportButton from '$lib/components/ui-interactive/report-button/ReportButton.svelte';
</script>

<!-- <ReportButton></ReportButton> -->


<svelte:head>
	<title>Molly Marsh - {story.name}</title>
</svelte:head>

{#key story}
	{#if story && mounted}
		<StoryblokComponent blok={story.content}></StoryblokComponent>
	{/if}
{/key}
