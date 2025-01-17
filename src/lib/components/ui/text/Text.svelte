<script lang="ts">
	import type { TextStoryblok } from './textTypes';
	import * as ops from './textOptions';
	import { storyblokEditable, renderRichText, RichTextSchema } from '@storyblok/svelte';

	let { blok }: { blok: TextStoryblok } = $props();

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

	const renderedContent = $derived(renderRichText(blok.rich_text, { schema: customStoryblokRichTextSchema }));
	let renderHTML = $derived(renderedContent !== '');

	let stylesObject = $state({
		textStyling: ops.textStyles[blok?.text_style] ?? ops.textStyles['internal_error'],
		textMaxWidth: ops.maxWidthOptions[blok?.max_width?.value] ?? '',
		textAlign: ops.textAlignOptions[blok?.text_align] ?? '[text-align:inherit]',
		textColOverwrite: blok.text_color_overwrite && blok.text_color_overwrite.length > 0 ? ops.textColorOverwrites[blok.text_color_overwrite] : ''
	});

	let classStyling = $state(`${Object.values(stylesObject).join(' ')} `);
	let style = $state(blok.custom_css);
</script>

<svelte:element this={blok.text_type} class={classStyling} id={blok.text_id} use:storyblokEditable={blok} {style}>
	{#if renderHTML}
		{@html renderedContent}
	{:else}
		{blok.content}
	{/if}
</svelte:element>
