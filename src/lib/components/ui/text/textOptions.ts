import type * as Type from './textTypes';

export const textStyles: Type.TextStyleOptions = {
	h1: 'font-heading font-normal text-6xl md:text-7xl lg:text-8xl text-heading-neutral-800',
	h2: 'font-heading font-normal text-5xl md:text-6xl lg:text-7xl text-heading-neutral-800',
	h3: 'font-heading font-normal text-4xl md:text-5xl lg:text-6xl text-heading-neutral-800',
	h4: 'font-heading font-normal text-3xl md:text-4xl lg:text-5xl text-heading-neutral-800',
	h5: 'font-heading font-normal text-2xl md:text-3xl lg:text-4xl text-heading-neutral-800',
	h6: 'font-heading font-normal text-xl md:text-2xl 2xl:text-3xl text-heading-neutral-800',
	h7: 'font-heading font-normal text-base md:text-lg lg:text-xl text-heading-neutral-800',
	paraXs: 'font-body font-normal text-xs text-body-neutral-600',
	paraSm: 'font-body font-normal text-sm text-body-neutral-600',
	paraBase: 'font-body font-normal text-base text-body-neutral-600',
	paraLg: 'font-body font-normal text-lg text-body-neutral-600',
	paraXl: 'font-body font-normal text-lg lg:text-xl text-body-neutral-600',
	overline: 'font-heading font-normal text-base md:text-lg lg:text-xl text-body-neutral-300 tracking-[4px] md:tracking-[6px] lg:tracking-[10px]',
	quote: 'font-heading font-normal text-4xl md:text-5xl lg:text-6xl text-body-neutral-600',
	sr: 'sr-only',
	internal_error: 'text-lg underline text-red-500'
};

export const textColorOverwrites: Type.TextColorOverwriteOptions = {
	primaryDark: 'text-body-primary-900',
	primaryDefault: 'text-body-primary-800',
	primaryMedium: 'text-body-primary-600',
	primaryLight: 'text-body-primary-300',
	secondaryDark: 'text-body-secondary-900',
	secondaryDefault: 'text-body-secondary-800',
	secondaryMedium: 'text-body-secondary-600',
	secondaryLight: 'text-body-secondary-300',
	redDark: 'text-red-900',
	redMid: 'text-red-600',
	redLight: 'text-red-400',
	black: 'text-black'
};

export const textAlignOptions: Type.TextAlignOptions = {
	left: 'text-left',
	center: 'text-center',
	right: 'text-right',
	justify: 'text-justify',
	inherit: '[text-align:inherit]'
};

export const maxWidthOptions: Type.TextMaxWidthOptions = {
	'20': 'max-w-max',
	'19': 'w-full max-w-5xl md:max-w-6xl lg:max-w-7xl', // 1024px -> 1152px -> 1280px
	'18': 'w-full max-w-4xl md:max-w-5xl lg:max-w-6xl', // 896px -> 1024px -> 1152px
	'17': 'w-full max-w-3xl md:max-w-4xl lg:max-w-5xl', // 768px -> 896px -> 1024px
	'16': 'w-full max-w-2xl md:max-w-3xl lg:max-w-4xl', // 672px -> 768px -> 896px
	'15': 'w-full max-w-xl md:max-w-2xl lg:max-w-3xl', // 576px -> 672px -> 768px
	'14': 'w-full max-w-lg md:max-w-xl lg:max-w-2xl', // 512px -> 576px -> 672px
	'13': 'w-full max-w-md md:max-w-lg lg:max-w-xl', // 448px -> 512px -> 576px
	'12': 'w-full max-w-96 md:max-w-md lg:max-w-96', // 384px -> 448px -> 384px
	'11': 'w-full max-w-88 md:max-w-92 lg:max-w-88', // 352px -> 368px -> 352px
	'10': 'w-full max-w-80 md:max-w-84 lg:max-w-80', // 320px -> 336px -> 320px
	'9': 'w-full max-w-64 md:max-w-72 lg:max-w-64', // 256px -> 288px -> 256px
	'8': 'w-full max-w-56 md:max-w-60 lg:max-w-56', // 224px -> 240px -> 224px
	'7': 'w-full max-w-48 md:max-w-52 lg:max-w-48', // 192px -> 208px -> 192px
	'6': 'w-full max-w-40 md:max-w-44 lg:max-w-40', // 160px -> 176px -> 160px
	'5': 'w-full max-w-32 md:max-w-36 lg:max-w-32', // 128px -> 144px -> 128px
	'4': 'w-full max-w-24 md:max-w-28 lg:max-w-24', // 96px -> 112px -> 96px
	'3': 'w-full max-w-16 md:max-w-20 lg:max-w-16', // 64px -> 80px -> 64px
	'2': 'w-full max-w-8 md:max-w-12 lg:max-w-8', // 32px -> 48px -> 32px
	'1': 'w-full max-w-4 md:max-w-6 lg:max-w-4', // 16px -> 24px -> 16px
	'0': 'w-full'
};
