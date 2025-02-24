<script lang="ts">
	import type { CustomRichtextStoryblok } from '$lib/schemas/storyblok/sbTypes';
	import { renderRichText, StoryblokComponent, storyblokEditable } from '@storyblok/svelte';
	let { blok }: { blok: CustomRichtextStoryblok } = $props();

	// $inspect(blok);
	let headingStyle = blok.heading_styles === 'serif' ? 'prose-headings:font-serif' : 'prose-headings:font-sans';

	function renderNode(node: any) {
		return renderRichText({
			type: 'doc',
			content: [node]
		});
	}

	$inspect(blok)
</script>

<div
	use:storyblokEditable={blok}
	class="prose prose-lg prose-headings:font-[500]
w-full max-w-none {headingStyle} prose-li:!my-1 prose-li:*:!my-0"
>
	<!-- {@html renderRichText(blok.text)} -->

	{#if blok?.text?.content}
		{#each blok?.text.content as node}
			{#if node?.type === 'blok' && node?.attrs?.body}
				{#each node?.attrs?.body as blok}
					<StoryblokComponent {blok}></StoryblokComponent>
				{/each}
			{:else}
				{@html renderNode(node)}
			{/if}
		{/each}
	{/if}
</div>
