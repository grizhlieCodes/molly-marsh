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

	let useVariableFontWeight = $state(blok.font_weight_variable.value > 0 ? true : false);
	let variableFontWeight = $state(useVariableFontWeight ? `${blok.font_weight_variable.value}` : undefined);
	let customSetFontWeight = $state(!useVariableFontWeight && blok.font_weight_set && blok.font_weight_set.value > 0 ? ops.fontWeightSetOptions[blok.font_weight_set.value] : '');

	let classStyling = $state(cn(Object.values(stylesObject).join(' '), customSetFontWeight));

	// 	let showListIcon = $state(
	// 		true
	// 			? `list-image-[url(<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
	// <path d="M6.6 9L8.2 10.6L11.4 7.4M17 9C17 13.4183 13.4183 17 9 17C4.58172 17 1 13.4183 1 9C1 4.58172 4.58172 1 9 1C13.4183 1 17 4.58172 17 9Z" stroke="#047857" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
	// </svg>)]`
	// 			: ``
	// 	);
	// let forceBreaks = $state(true ? 'force-breaks' : undefined) // Only used
	// for headings perhaps -> but then we lose the remaining styling, which sucks
</script>

<svelte:element this={blok.text_type} class={classStyling} id={blok.text_id} use:storyblokEditable={blok} {style} style:font-weight={variableFontWeight}>
	{#if mode === 'text' || blok?.multi_line_bloks?.length === 0}
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

			& a {
				font-weight: 450;
				text-decoration: underline;
				color: var(--color-body-primary-600);
				transition: color 300ms ease;
				&:hover {
					color: var(--color-body-primary-900);
				}
			}
		}
	}
</style>
