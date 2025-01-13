<script lang="ts">
	import type * as SectionTypes from './Section';

	import {
		gridSpanOptions,
		justifyItemsOptions,
		alignItemsOptions,
		yPaddingOptions,
		xPaddingOptions,
		gapOptions,
		backgroundOptions
	} from '$lib/data/sharedOptions';

	// PROPS
	let {
		children,
		gridSpan = 'centeredSpan',
		justifyItems = 'center',
		alignItems = 'center',
		yPadding = '1',
		xPadding = '1',
		gap = '1',
		bg = 'none',
		additionalStyles = '',
		label,
		id,
		animation = () => {},
		animationParams = undefined,
		overflow = 'overflow-hidden',
		type = 'section'
	}: {
		children?: any;
		gridSpan?: 'centeredSpan' | 'fullSpan';
		justifyItems?: 'start' | 'end' | 'center' | 'stretch';
		alignItems?: 'start' | 'end' | 'center' | 'stretch' | 'baseline';
		yPadding?: '3' | '2' | '1' | '0';
		xPadding?: '3' | '2' | '1' | '0';
		gap?: '4' | '3' | '2' | '1' | '0';
		bg?: 'none' | 'green' | 'blue' | 'slate';
		additionalStyles?: string;
		label: SectionTypes.SectionLabeledBy;
		id: SectionTypes.SectionID;
		animation?: ((node: HTMLElement, params: { hero: boolean }) => void) | undefined;
		animationParams?: any | undefined;
		overflow?: 'overflow-hidden' | 'overflow-scroll' | 'overflow-auto' | 'overflow-visible';
		type?: 'section' | 'article';
	} = $props();

	// STYLING
	let gridSpanStyling = $state(gridSpanOptions[gridSpan]);
	let justifyItemsStyling = $state(justifyItemsOptions[justifyItems]);
	let alignItemsStyling = $state(alignItemsOptions[alignItems]);
	let yPaddingStyling = $state(yPaddingOptions[yPadding]);
	let xPaddingStyling = $state(xPaddingOptions[xPadding]);
	let gapOptionsStyling = $state(gapOptions[gap]);
	let bgOptionsStyling = $state(backgroundOptions[bg]);

	let styling = $state(
		`${gridSpanStyling} ${justifyItemsStyling} ${alignItemsStyling} ${yPaddingStyling} ${xPaddingStyling} ${gapOptionsStyling} ${bgOptionsStyling} ${additionalStyles}`
	);
</script>

<svelte:element
	this={type}
	use:animation={animationParams}
	aria-labelledby={label}
	{id}
	class=" mx-auto flex w-full flex-col {overflow} text-center relative {styling}"
>
	{@render children()}
</svelte:element>
