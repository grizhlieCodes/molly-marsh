<script lang="ts">
	import { cn } from '$lib/scripts/utils';
	import type { TextStoryblok } from './textTypes';
	import * as ops from './textOptions';
	import { storyblokEditable, renderRichText, RichTextSchema, StoryblokComponent } from '@storyblok/svelte';

	let { blok }: { blok: TextStoryblok } = $props();

	// Function to handle node rendering
	function renderNode(node: any) {
		return renderRichText(
			{
				type: 'doc',
				content: [node]
			},
			{
				schema: customStoryblokRichTextSchema
			}
		);
	}

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

	const renderedContent = $derived(
		renderRichText(blok.rich_text, {
			schema: customStoryblokRichTextSchema
		})
	);
	let renderHTML = $derived(renderedContent !== '');

	let stylesObject = $state({
		textStyling: ops.textStyles[blok?.text_style] ?? ops.textStyles['internal_error'],
		textMaxWidth: ops.maxWidthOptions[blok?.max_width?.value] ?? '',
		textAlign: ops.textAlignOptions[blok?.text_align] ?? '[text-align:inherit]',
		textColOverwrite: blok.text_color_overwrite && blok.text_color_overwrite.length > 0 ? ops.textColorOverwrites[blok.text_color_overwrite] : ''
	});

	let style = $state(blok.custom_css);

	let mode = $state(blok?.mode ? blok?.mode : 'text');

	// $inspect(blok);
	let useVariableFontWeight = $state(blok.font_weight_variable.value > 0 ? true : false);
	let variableFontWeight = $state(useVariableFontWeight ? `${blok.font_weight_variable.value}` : undefined);
	let customSetFontWeight = $state(!useVariableFontWeight && blok.font_weight_set && blok.font_weight_set.value > 0 ? ops.fontWeightSetOptions[blok.font_weight_set.value] : '');

	let classStyling = $state(cn(Object.values(stylesObject).join(' '), customSetFontWeight));
	// let forceBreaks = $state(true ? 'force-breaks' : undefined) // Only used
	// for headings perhaps -> but then we lose the remaining styling, which sucks
</script>

<svelte:element this={blok.text_type} class={classStyling} id={blok.text_id} use:storyblokEditable={blok} {style} style:font-weight={variableFontWeight}>
	{#if mode === 'text' || blok.multi_line_bloks.length === 0}
		{#if renderHTML}
			<div class="custom-prose">
				{#each blok.rich_text.content as node, i}
					{#if node.type === 'blok'}
						{#each node.attrs.body as bodyItem}
							<StoryblokComponent blok={bodyItem} />
						{/each}
					{:else}
						{@html renderNode(node)}
					{/if}
				{/each}
			</div>
		{:else}
			{blok.content}
		{/if}
	{:else if mode === 'multi-line' && blok.multi_line_bloks && blok.multi_line_bloks.length > 0}
		{#each blok.multi_line_bloks as blokk, index}
			{@const space = blokk.mode === 'inline' ? 'inline' : 'block'}
			{@const lastItemInArray = index - 1 === blok.multi_line_bloks.length}
			<StoryblokComponent blok={blokk}></StoryblokComponent>
			{#if space === 'inline' && !lastItemInArray}
				&nbsp;
			{/if}
		{/each}
	{/if}
</svelte:element>

<style>
	:global {
		.custom-prose {
			& ul {
				padding-left: 1.5rem;
			}
			& li {
				list-style-type: disc;
				list-style-position: outside;
			}
		}
	}
</style>
