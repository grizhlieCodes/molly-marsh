<script lang="ts">
	import { storyblokEditable, StoryblokComponent } from '@storyblok/svelte';
	// import { scroll } from '$lib/scripts/animations';
	export let blok: any;
	$: useScroll = blok.scrollUp;
	$: scrollAction = useScroll ? scroll : () => {};
	
	interface Options {
		[key: string]: string;
	}

	// ======= LAYOUT ========
	const directions: Options = {
		row: 'flex-col sm:flex-row',
		onlyRow: 'flex-row',
		column: 'flex-col',
		rowReversed: 'flex-row-reverse',
		columnReversed: 'flex-col-reverse'
	};

	const justifyContentOptions: Options = {
		start: 'justify-start',
		center: 'justify-center',
		end: 'justify-end',
		stretch: 'justify-stretch',
		between: 'justify-between',
		around: 'justify-around',
		evenly: 'justify-evenly',
		normal: 'justify-normal'
	};

	const itemsAlignOptions: Options = {
		start: 'items-start',
		center: 'items-center',
		end: 'items-end',
		stretch: 'items-stretch',
		baseline: 'items-baseline'
	};

	// ======= SPACING =======
	const marginTopOptions: Options = {
		'3': 'mt-10 md:mt-14 lg:mt-16',
		'2': 'mt-8 md:mt-12 lg:mt-14',
		'1': 'mt-4 md:mt-6 lg:mt-10',
		'0': 'mt-0'
	};

	const marginBottomOptions: Options = {
		'3': 'mb-10 md:mb-14 lg:mb-16',
		'2': 'mb-8 md:mb-12 lg:mb-14',
		'1': 'mb-4 md:mb-6 lg:mb-10',
		'0': 'mb-0'
	};

	const gapOptions: Options = {
		'4': 'gap-16 md:gap-20 lg:gap-24',
		'3': 'gap-10 md:gap-14 lg:gap-16',
		'2': 'gap-4 md:gap-8 lg:gap-10',
		'1': 'gap-2',
		'0': 'gap-0'
	};

	const maxWidthOptions: Options = {
		'5': 'w-full',
		'4': 'w-full max-w-5xl',   // 1024px
		'3': 'w-full max-w-3xl',   // 768px
		'2': 'w-full max-w-xl',    // 576px
		'1': 'w-full max-w-max'
	};

	const heightOptions: Options = {
		full: 'h-full',
		max: 'h-max',
		unset: ''
	};

	const wrapOptions: Options = {
		wrap: "flex-wrap",
		noWrap: "flex-nowrap"
	}

	// ======= OUTPUT=======
	$: contentDirection = directions[blok.contentDirection];
	$: contentJustify = justifyContentOptions[blok.justifyContent];
	$: itemsAlign = itemsAlignOptions[blok.alignItems];
	$: marginTop = marginTopOptions[blok.marginTop.value];
	$: marginBottom = marginBottomOptions[blok.marginBottom.value];
	$: gap = gapOptions[blok.gap.value];
	$: maxWidth = maxWidthOptions[blok.maxWidth.value];
	$: height = blok.height ? heightOptions[blok.height] : heightOptions.unset;
	$: wrap = blok.wrap ? wrapOptions[blok.wrap] : wrapOptions['noWrap']

	$: minHeight = blok.minHeight.value !== 0 ? `${blok.minHeight.value}vh` : 'auto';

	// ====== FINAL STYLES ======
	$: styling = `${marginTop} ${marginBottom} ${contentDirection} ${contentJustify} ${itemsAlign} ${gap} ${maxWidth} ${height} ${wrap}`;
</script>

<div use:storyblokEditable={blok} class=" flex {styling}" style:min-height={minHeight}>
	{#each blok.blocks as blokk}
		<StoryblokComponent blok={blokk} />
	{/each}
</div>


<!-- 
    removed:
    use:scrollAction 
    
    
-->