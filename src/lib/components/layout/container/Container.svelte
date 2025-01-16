<script lang="ts">
	// Imports
	import { storyblokEditable, StoryblokComponent } from '@storyblok/svelte';
	import type { ContainerStoryblok } from './containerTypes';
	import * as ops from './containerOptions';

	// Data from Storyblok
	let { blok }: { blok: ContainerStoryblok } = $props();

	// Styling
	let BASE_CLASSES = 'flex w-full';

	let styles = $state({
		direction: ops.directionOptions[blok.content_direction] ?? ops.directionOptions.column,
		justifyContent: ops.justifyContentOptions[blok.justify_content] ?? ops.justifyContentOptions.center,
		alignItems: ops.alignItemsOptions[blok.align_items] ?? ops.alignItemsOptions.stretch,
		flexWrap: ops.wrapOptions[blok.wrap_content] ?? ops.wrapOptions.noWrap,
		gap: ops.gapOptions[blok.gap.value] ?? ops.gapOptions[1],
		flex: ops.flexOptions[blok.flex] ?? ops.flexOptions.flexAuto,
		alignSelf: ops.alignSelfOptions[blok.align_self] ?? ops.alignSelfOptions.selfAuto,
		marginTop: ops.marginTopOptions[blok.margin_top.value] ?? ops.marginTopOptions[0],
		marginBottom: ops.marginBottomOptions[blok.margin_bottom.value] ?? ops.marginBottomOptions[0],
		maxWidth: ops.maxWidthOptions[blok.max_width.value] ?? ops.maxWidthOptions[0],
		height: ops.heightOptions[blok.height] ?? ops.heightOptions.unset,
		padding: ops.paddingOptions[blok.all_padding.value] ?? ops.paddingOptions[0],
		paddingY: ops.yPaddingOptions[blok.vertical_padding.value] ?? ops.yPaddingOptions[0],
		paddingX: ops.xPaddingOptions[blok.horizontal_padding.value] ?? ops.xPaddingOptions[0],
		bg: ops.backgroundOptions[blok.background_color] ?? ops.xPaddingOptions[0],
		overflow: ops.overflowOptions[blok.overflow] ?? ops.overflowOptions.visible,
		borderRadius: ops.borderRadiusOptions[blok.border_radius.value] ?? ops.borderRadiusOptions[0]
	});
	let minimum_height = $state(blok.min_height.value !== 0 ? `${blok.min_height.value}${blok.min_height_unit}` : undefined);
	let minimum_width = $state(blok.min_width.value !== 0 ? `${blok.min_width.value}${blok.min_width_unit}` : undefined);

	// All styling string
	let styling = $derived(`${BASE_CLASSES} ${Object.values(styles).join(' ')} ${blok.container_class}`);
</script>

<div
	id={blok.container_id}
	use:storyblokEditable={blok}
	class={styling}
	style:min-height={minimum_height}
	style:min-width={minimum_width}
	style={blok.customStyling}
>
	{#each blok.blocks as blokk}
		<StoryblokComponent blok={blokk} />
	{/each}
</div>

<!-- 
    removed:
    use:scrollAction 
    
    
-->
