<script lang="ts">
	// Imports
	import { storyblokEditable, StoryblokComponent } from '@storyblok/svelte';
	import type { ContainerStoryblok } from './containerTypes';
	import * as ops from './containerOptions';
	import { getBreakpointOptions } from './containerUtilities.svelte';

	// Data from Storyblok
	let { blok }: { blok: ContainerStoryblok } = $props();

	$inspect(blok.justify_content_md);

	// Styling
	let generalData = $state({
		id: blok?.container_id ?? '',
		class: blok?.container_class ?? ''
	});

	let customCss = $state(blok?.custom_css ?? '');
	let generalStyling = $state({
		overflow: blok?.overflow && blok?.overflow.length > 0 ? ops.overflowOptions[blok.overflow] : ops.overflowOptions.visible,
		bgCol: blok?.background_color && blok?.background_color.length > 0 ? ops.backgroundOptions[blok.background_color] : ops.backgroundOptions.default,
		borderCol: blok?.border_color && blok?.border_color.length > 0 ? ops.borderColorOptions[blok.border_color] : ops.borderColorOptions.none,
		borderRadius: blok?.border_radius && blok?.border_radius.value > 0 ? ops.borderRadiusOptions[blok.border_radius.value] : '',
		borderThickness: blok?.border_thickness && blok?.border_thickness.value > 0 ? ops.borderThicknessOptions[blok.border_thickness.value] : ''
	});

	let breakpointStyles = $state({
		flexDirections: getBreakpointOptions(ops.directionOptions, blok.content_direction_default, blok.content_direction_mm, blok.content_direction_lm, blok.content_direction_md, blok.content_direction_lg),
		justifyContent: getBreakpointOptions(ops.justifyContentOptions, blok.justify_content_default, blok.justify_content_mm, blok.justify_content_lm, blok.justify_content_md, blok.justify_content_lg),
		alignItems: getBreakpointOptions(ops.alignItemsOptions, blok.align_items_default, blok.align_items_mm, blok.align_items_lm, blok.align_items_md, blok.align_items_lg),
		wrap: getBreakpointOptions(ops.wrapOptions, blok.wrap_content_default, blok.wrap_content_mm, blok.wrap_content_lm, blok.wrap_content_md, blok.wrap_content_lg),
		gap: getBreakpointOptions(ops.gapOptions, blok.gap_default, blok.gap_mm, blok.gap_lm, blok.gap_md, blok.gap_lg),
		flex: getBreakpointOptions(ops.flexOptions, blok.flex_default, blok.flex_mm, blok.flex_lm, blok.flex_md, blok.flex_lg),
		alignSelf: getBreakpointOptions(ops.alignSelfOptions, blok.align_self_default, blok.align_self_mm, blok.align_self_lm, blok.align_self_md, blok.align_self_lg),
		marginTop: getBreakpointOptions(ops.marginTopOptions, blok.margin_top_default, blok.margin_top_mm, blok.margin_top_lm, blok.margin_top_md, blok.margin_top_lg),
		marginBottom: getBreakpointOptions(ops.marginBottompOptions, blok.margin_bottom_default, blok.margin_bottom_mm, blok.margin_bottom_lm, blok.margin_bottom_md, blok.margin_bottom_lg),
		padding: getBreakpointOptions(ops.paddingOptions, blok.all_padding_default, blok.all_padding_mm, blok.all_padding_lm, blok.all_padding_md, blok.all_padding_lg),
		paddingY: getBreakpointOptions(ops.yPaddingOptions, blok.vertical_padding_default, blok.vertical_padding_mm, blok.vertical_padding_lm, blok.vertical_padding_md, blok.vertical_padding_lg),
		paddingX: getBreakpointOptions(ops.xPaddingOptions, blok.horizontal_padding_default, blok.horizontal_padding_mm, blok.horizontal_padding_lm, blok.horizontal_padding_md, blok.horizontal_padding_lg),
		maxWidth: getBreakpointOptions(ops.maxWidthOptions, blok.max_width_default, blok.max_width_mm, blok.max_width_lm, blok.max_width_md, blok.max_width_lg),
		height: getBreakpointOptions(ops.heightOptions, blok.height_default, blok.width_mm, blok.width_lm, blok.width_md, blok.width_lg),
		width: getBreakpointOptions(ops.widthOptions, blok.width_default, blok.width_mm, blok.width_lm, blok.width_md, blok.width_lg)
	});

	$inspect(breakpointStyles);
	let minimum_height = $state(blok.min_height_default.value !== 0 ? `${blok.min_height_default.value}${blok.min_height_unit_default}` : undefined);
	let minimum_width = $state(blok.min_width_default.value !== 0 ? `${blok.min_width_default.value}${blok.min_width_unit_default}` : undefined);

	// All styling string
	let BASE_CLASSES = 'flex';
	let styling = $derived(`${BASE_CLASSES} ${Object.values(breakpointStyles).join(' ')} ${Object.values(generalStyling).join(' ')} ${generalData.class}`);
</script>

<div id={generalData.id} use:storyblokEditable={blok} class={styling} style:min-height={minimum_height} style:min-width={minimum_width} style={customCss}>
	{#each blok.blocks as blokk}
		<StoryblokComponent blok={blokk} />
	{/each}
</div>
