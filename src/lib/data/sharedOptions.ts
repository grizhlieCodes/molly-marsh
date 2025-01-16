import type { Styles, ObjectOfStrings as Options } from '$lib/types';

export const textStyles: Styles = {
	h1: 'font-serif font-normal text-6xl md:text-7xl lg:text-8xl text-neutral-800',
	h2: 'font-serif font-normal text-5xl md:text-6xl lg:text-7xl text-neutral-800',
	h3: 'font-serif font-normal text-4xl md:text-5xl lg:text-6xl text-neutral-800',
	h4: 'font-serif font-normal text-3xl md:text-4xl lg:text-5xl text-neutral-800',
	h5: 'font-serif font-normal text-2xl md:text-3xl lg:text-4xl text-neutral-800',
	h6: 'font-serif font-normal text-xl md:text-2xl 2xl:text-3xl text-neutral-800',
	h7: 'font-serif font-normal text-base md:text-lg lg:text-xl',
	paraXs: 'font-sans font-normal text-xs text-neutral-800',
	paraSm: 'font-sans font-normal text-sm text-neutral-800',
	paraBase: 'font-sans font-normal text-base text-neutral-800',
	paraLg: 'font-sans font-normal text-lg text-neutral-800',
	paraXl: 'font-sans font-normal text-lg lg:text-xl text-neutral-800',
	overline:
		'font-serif font-normal text-base md:text-lg lg:text-xl text-neutral-800 tracking-[4px] md:tracking-[6px] lg:tracking-[10px]',
	quote: 'font-serif font-normal text-4xl md:text-5xl lg:text-6xl text-neutral-800',
	sr: 'sr-only'
};

// SECTION
export const gridSpanOptions: Options = {
	centeredSpan1: 'max-w-[70rem]',
	centeredSpan2: 'max-w-[80rem]',
	centeredSpan3: 'max-w-[90rem]',
	fullSpan: 'max-w-none'
};

/**
 * Options for justify-items CSS properties.
 * @typedef {Object} Options
 * @property {string} start - Corresponds to 'justify-items-start'.
 * @property {string} end - Corresponds to 'justify-items-end'.
 * @property {string} center - Corresponds to 'justify-items-center'.
 * @property {string} stretch - Corresponds to 'justify-items-stretch'.
 */

/**
 * Justify items options for CSS properties.
 * @type {Options}
 */

export const justifyContentOptions: Options = {
	normal: 'justify-normal',
	start: 'justify-start',
	end: 'justify-end',
	center: 'justify-center',
	stretch: 'justify-stretch',
	between: 'justify-between',
	around: 'justify-around',
	evenly: 'justify-evenly'
};

export const alignItemsOptions: Options = {
	stretch: 'items-stretch',
	start: 'items-start',
	end: 'items-end',
	center: 'items-center',
	baseline: 'items-baseline'
};

// ======= SPACING =======

export const yPaddingOptions: Options = {
	'3': 'py-24 md:py-28 lg:py-32',
	'2': 'py-20 md:py-24 lg:py-28',
	'1': 'py-16 md:py-20 lg:py-24',
	'0': ''
};

export const xPaddingOptions: Options = {
	'3': 'px-8 md:px-10 lg:px-12 xl:px-0',
	'2': 'px-6 md:px-8 lg:px-10 xl:px-0',
	'1': 'px-5 md:px-6 lg:px-8 xl:px-0',
	'0': ''
};

export const gapOptions: Options = {
	'4': 'gap-20 md:gap-24 lg:gap-32',
	'3': 'gap-10 md:gap-14 lg:gap-16',
	'2': 'gap-4 md:gap-6 lg:gap-8',
	'1': 'gap-2 md:gap-4 lg:gap-6',
	'0': 'gap-0'
};

export const overflowOptions: Options = {
	hidden: 'overflow-hidden',
	scroll: 'overflow-scroll',
	auto: 'overflow-auto',
	visible: 'overflow-visible'
};

// ======= STYLE =======
export const backgroundOptions: Options = {
	none: 'bg-transparent',
	default: 'bg-bg-default',
	primaryLight: 'bg-bg-primary-light',
	primaryDark: 'bg-bg-primary-dark'
};
