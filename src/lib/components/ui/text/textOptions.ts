import type * as Type from './textTypes';

export const textStyles: Type.TextStyleOptions = {
	// h1: 'font-heading font-normal text-6xl md:text-7xl lg:text-8xl text-heading-neutral-800',
	// h2: 'font-heading font-normal text-5xl md:text-6xl lg:text-7xl text-heading-neutral-800',
	// h3: 'font-heading font-normal text-4xl md:text-5xl lg:text-6xl text-heading-neutral-800',
	// h4: 'font-heading font-normal text-3xl md:text-4xl lg:text-5xl text-heading-neutral-800',
	// h5: 'font-heading font-normal text-2xl md:text-3xl lg:text-4xl text-heading-neutral-800',
	// h6: 'font-heading font-normal text-xl md:text-2xl 2xl:text-3xl text-heading-neutral-800',
	// h7: 'font-heading font-normal text-base md:text-lg lg:text-xl text-heading-neutral-800',
	// h1: 'font-heading font-normal text-[4.5rem] md:text-[5.25rem] lg:text-[6rem] text-heading-neutral-800', // 72px -> 84px -> 96px
	// h2: 'font-heading font-normal text-[4rem] md:text-[4.5rem] lg:text-[5.25rem] text-heading-neutral-800', // 64px -> 72px -> 84px
	// h3: 'font-heading font-normal text-[3.5rem] md:text-[4rem] lg:text-[4.5rem] text-heading-neutral-800', // 56px -> 64px -> 72px
	// h4: 'font-heading font-normal text-[3rem] md:text-[3.5rem] lg:text-[4rem] text-heading-neutral-800', // 48px -> 56px -> 64px
	// h5: 'font-heading font-normal text-[2.5rem] md:text-[3rem] lg:text-[3.5rem] text-heading-neutral-800', // 40px -> 48px -> 56px
	// h6: 'font-heading font-normal text-[2.25rem] md:text-[2.5rem] lg:text-[3rem] text-heading-neutral-800', // 36px -> 40px -> 48px
	// h7: 'font-heading font-normal text-[2rem] md:text-[2.25rem] lg:text-[2.5rem] text-heading-neutral-800', // 32px -> 36px -> 40px
	// h8: 'font-heading font-normal text-[1.75rem] md:text-[2rem] lg:text-[2.25rem] text-heading-neutral-800', // 28px -> 32px -> 36px
	// h9: 'font-heading font-normal text-[1.5rem] md:text-[1.75rem] lg:text-[2rem] text-heading-neutral-800', // 24px -> 28px -> 32px
	// h10: 'font-heading font-normal text-[1.25rem] md:text-[1.5rem] lg:text-[1.75rem] text-heading-neutral-800', // 20px -> 24px -> 28px
	// h11: 'font-heading font-normal text-[1.125rem] md:text-[1.25rem] lg:text-[1.5rem] text-heading-neutral-800', // 18px -> 20px -> 24px
	// h12: 'font-heading font-normal text-base md:text-[1.125rem]
	// lg:text-[1.25rem] text-heading-neutral-800', // 16px -> 18px -> 20px
	h1: 'font-heading font-normal text-5xl md:text-7xl lg:text-9xl text-heading-neutral-800', // 48px -> 72px -> 128px
	h2: 'font-heading font-normal text-5xl md:text-6xl lg:text-8xl text-heading-neutral-800', // 48px -> 60px -> 96px
	h3: 'font-heading font-normal text-4xl md:text-5xl lg:text-7xl text-heading-neutral-800', // 36px -> 48px -> 72px
	h4: 'font-heading font-normal text-3xl md:text-5xl lg:text-6xl text-heading-neutral-800', // 36px -> 48px -> 60px
	h5: 'font-heading font-normal text-3xl md:text-4xl lg:text-5xl text-heading-neutral-800', // 30px -> 36px -> 48px
	h6: 'font-heading font-normal text-3xl md:text-4xl lg:text-4xl text-heading-neutral-800', // 30px -> 36px -> 36px
	h7: 'font-heading font-normal text-2xl md:text-3xl lg:text-3xl text-heading-neutral-800', // 24px -> 30px -> 30px
	h8: 'font-heading font-normal text-xl md:text-2xl lg:text-2xl text-heading-neutral-800', // 20px -> 24px -> 24px
	h9: 'font-heading font-normal text-lg md:text-xl lg:text-xl text-heading-neutral-800', // 18px -> 20px -> 20px
	h10: 'font-heading font-normal text-base md:text-lg lg:text-lg text-heading-neutral-800', // 16px -> 18px -> 18px
	h11: 'font-heading font-normal text-sm md:text-base lg:text-base text-heading-neutral-800', // 14px -> 16px -> 16px
	h12: 'font-heading font-normal text-sm md:text-base lg:text-base text-heading-neutral-800', // 14px -> 16px -> 16px
	paraXs: 'font-body font-light text-xs leading-4 text-body-neutral-600',
	paraSm: 'font-body font-light text-sm leading-5 text-body-neutral-600',
	paraBase: 'font-body font-light text-base leading-7 text-body-neutral-600',
	paraLg: 'font-body font-light text-lg lg:text-xl leading-7 text-body-neutral-600',
	paraXl: 'font-body font-light text-lg lg:text-2xl leading-8 text-body-neutral-600',
	overline: 'font-heading font-normal text-base md:text-lg lg:text-xl text-body-neutral-300 tracking-[4px] md:tracking-[6px] lg:tracking-[10px]',
	quote: 'font-heading font-normal text-4xl md:text-5xl lg:text-6xl text-body-neutral-600',
	sr: 'sr-only',
	internal_error: 'text-lg underline text-red-500'
};
export const textColorOverwrites: Type.TextColorOverwriteOptions = {
	primaryDark: '!text-body-primary-900',
	primaryDefault: '!text-body-primary-800',
	primaryMedium: '!text-body-primary-600',
	primaryLight: '!text-body-primary-300',
	secondaryDark: '!text-body-secondary-900',
	secondaryDefault: '!text-body-secondary-800',
	secondaryMedium: '!text-body-secondary-600',
	secondaryLight: '!text-body-secondary-300',
	redDark: '!text-red-900',
	redMid: '!text-red-600',
	redLight: '!text-red-400',
	black: '!text-black'
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

export const fontWeightSetOptions: Type.FontWeightSet = {
	0: '',
	100: 'font-thin',
	200: 'font-extralight',
	300: 'font-light',
	400: 'font-normal',
	500: 'font-medium',
	600: 'font-semibold',
	700: 'font-bold',
	800: 'font-extrabold',
	900: 'font-black'
};
