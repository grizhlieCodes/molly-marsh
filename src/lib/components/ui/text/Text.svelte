<script lang="ts">
	// import type { TextStyles, TextTypes } from '$lib/types';
	// import { textStyles } from '$lib/shared';

	// let {
	// 	children,
	// 	type,
	// 	style,
	// 	extraStyling,
	// 	id,
	// 	...restProps
	// }: {
	// 	children: any;
	// 	type: TextTypes;
	// 	style: TextStyles;
	// 	extraStyling?: string | undefined;
	// 	id?: string;
	// } = $props();

	// let elementType: string = $state(type);
	// let elementStyling: string = $state(textStyles[style]);

	import type { TextStoryblok } from './textTypes';
	import * as ops from './textOptions';
	import { storyblokEditable, renderRichText, RichTextSchema } from '@storyblok/svelte';
	import cloneDeep from 'clone-deep';
	// const storyblokScheme =

	let { blok }: { blok: TextStoryblok } = $props();

	let styles = $state({
		textStyling: ops.textStyles[blok?.text_style] ?? ops.textStyles['internal_error'],
		textMaxWidth: ops.maxWidthOptions[blok?.max_width?.value] ?? '',
		textAlign: ops.textAlignOptions[blok?.text_align] ?? '[text-align:inherit]',
		textColOverwrite: blok.text_color_overwrite && blok.text_color_overwrite.length > 0 ? ops.textColorOverwrites[blok.text_color_overwrite] : ''
	});

	let styling = $state(`${Object.values(styles).join(' ')} ${blok.custom_css}`);

	$effect(() => {
		console.log(blok);
		console.log('STORYBLOK RICH TEXT SCHEMA =================== ', RichTextSchema);
	});
</script>

<!-- class="{elementStyling} {extraStyling}" {id} {...restProps} -->
<svelte:element this={blok.text_type} class={styling} id={blok.text_id} use:storyblokEditable={blok}>
	{blok.content}
</svelte:element>
