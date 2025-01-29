<script lang="ts">
	import type { TextStoryblok } from './textTypes';
	import * as ops from './textOptions';
	import { storyblokEditable, renderRichText, RichTextSchema } from '@storyblok/svelte';

	let { blok }: { blok: any } = $props();
	const customStoryblokRichTextSchema = {
		nodes: {
			...RichTextSchema.nodes,
			paragraph: () => ({ tag: 'span' }),
			heading: () => ({ tag: 'span' }),
			blockquote: () => ({ tag: 'span' })
		},
		marks: {
			...RichTextSchema.marks
		}
	};

	const displayOptions = {
		none: '',
		inline: 'inline',
		block: 'block'
	};

	const renderedContent = $derived(renderRichText(blok.rich_text, { schema: customStoryblokRichTextSchema }));
	const display = $state(blok.display ? displayOptions[blok.display] : displayOptions.none);
</script>

<div use:storyblokEditable={blok} class={display}>
	{@html renderedContent}
</div>
