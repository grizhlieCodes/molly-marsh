import type * as Type from './imageTypes';

export const aspectRatioOptions: Type.AspectRatioOptions = {
	'1:1': 'aspect-[1/1]',
	'1.59:1': 'aspect-[1.59/1]',
	'3:2': 'aspect-[3/2]',
	'4:3': 'aspect-[4/3]',
	'2:3': 'aspect-[2/3]',
	'3:4': 'aspect-[3/4]',
	'16:9': 'aspect-[16/9]',
	'9:16': 'aspect-[9/16]',
	'4:2': 'aspect-[4/2]',
	none: ''
};

export const maxWidthOptions: Type.MaxWidthOptions = {
	screen: 'max-w-screen',
	'100%': 'max-w-full',
	'75%': 'max-w-[75%]',
	'50%': 'max-w-[50%]',
	'25%': 'max-w-[25%]',
	large: 'max-w-5xl',
	medium: 'max-w-4xl',
	normal: 'max-w-3xl',
	small: 'max-w-2xl',
	none: ''
};

export const maxHeightOptions: Type.MaxHeightOptions = {
	screen: 'max-h-screen',
	'100%': 'max-h-full',
	'75%': 'max-h-[75%]',
	'50%': 'max-h-[50%]',
	'25%': 'max-h-[25%]',
	large: 'max-h-[37.5rem]',
	medium: 'max-h-[32.5rem]',
	normal: 'max-h-[20rem]',
	small: 'max-h-[10rem]',
	none: ''
};

export const imageQualityOptions: Type.ImageQualityOptions = {
	original: [
		{ width: 2000, media: '(min-width: 1200px)' },
		{ width: 1200, media: '(min-width: 768px)' }
	],
	large: [
		{ width: 1200, media: '(min-width: 1200px)' },
		{ width: 768, media: '(min-width: 768px)' }
	],
	medium: [
		{ width: 768, media: '(min-width: 1200px)' },
		{ width: 545, media: '(min-width: 768px)' }
	],
	small: [
		{ width: 600, media: '(min-width: 1200px)' },
		{ width: 450, media: '(min-width: 768px)' }
	]
};

export const objectPositionOptions: Type.ObjectPositionOptions = {
	left: 'object-left',
	center: 'object-center',
	right: 'object-right',
	top: 'object-top',
	bottom: 'object-bottom',
	leftTop: 'object-left-top',
	leftBottom: 'object-left-bottom',
	rightTop: 'object-right-top',
	rightBottom: 'object-right-bottom',
	top20: 'object-position-top-20'
};

export const mixBlendModeOptions: Type.MixBlendModeOptions = {
	normal: 'mix-blend-normal',
	multiply: 'mix-blend-multiply',
	screen: 'mix-blend-screen',
	overlay: 'mix-blend-overlay',
	darken: 'mix-blend-darken',
	lighten: 'mix-blend-lighten',
	colorDodge: 'mix-blend-color-dodge',
	colorBurn: 'mix-blend-color-burn',
	hardLight: 'mix-blend-hard-light',
	softLight: 'mix-blend-soft-light',
	difference: 'mix-blend-difference',
	exclusion: 'mix-blend-exclusion',
	hue: 'mix-blend-hue',
	saturation: 'mix-blend-saturation',
	color: 'mix-blend-color',
	luminosity: 'mix-blend-luminosity'
};

export const borderRadiusOptions: Type.BorderRadiusOptions = {
	'0': 'rounded-none', // No border radius
	'1': 'rounded-sm', // Small border radius
	'2': 'rounded', // Default border radius
	'3': 'rounded-md', // Medium border radius
	'4': 'rounded-lg', // Large border radius
	'5': 'rounded-xl', // Extra large border radius
	'6': 'rounded-2xl', // 2x extra large border radius
	'7': 'rounded-3xl', // 3x extra large border radius
	'8': 'rounded-full' // Fully rounded (creates circles for square elements)
};

export const beforeBorderRadiusOptions: Type.BorderRadiusOptions = {
	'0': 'before:rounded-none', // No border radius
	'1': 'before:rounded-sm', // Small border radius
	'2': 'before:rounded', // Default border radius
	'3': 'before:rounded-md', // Medium border radius
	'4': 'before:rounded-lg', // Large border radius
	'5': 'before:rounded-xl', // Extra large border radius
	'6': 'before:rounded-2xl', // 2x extra large border radius
	'7': 'before:rounded-3xl', // 3x extra large border radius
	'8': 'before:rounded-full' // Fully rounded (creates circles for square elements)
};
export const afterBorderRadiusOptions: Type.BorderRadiusOptions = {
	'0': 'after:rounded-none', // No border radius
	'1': 'after:rounded-sm', // Small border radius
	'2': 'after:rounded', // Default border radius
	'3': 'after:rounded-md', // Medium border radius
	'4': 'after:rounded-lg', // Large border radius
	'5': 'after:rounded-xl', // Extra large border radius
	'6': 'after:rounded-2xl', // 2x extra large border radius
	'7': 'after:rounded-3xl', // 3x extra large border radius
	'8': 'after:rounded-full' // Fully rounded (creates circles for square elements)
};

// New additions, never used these!

// FILTER OPTIONS - FILTER OPTIONS - FILTER OPTIONS - FILTER OPTIONS - FILTER OPTIONS - FILTER OPTIONS - FILTER OPTIONS - FILTER OPTIONS - FILTER OPTIONS -

// Blur Filter Options Object
export const blurFilterOptions: Type.BlurFilterOptions = {
	'0': '', // No blur
	'1': 'blur-sm', // 4px blur
	'2': 'blur', // 8px blur
	'3': 'blur-md', // 12px blur
	'4': 'blur-lg', // 16px blur
	'5': 'blur-xl', // 24px blur
	'6': 'blur-2xl', // 40px blur
	'7': 'blur-3xl' // 64px blur
};

export const grayscaleFilterOptions: Type.GrayscaleFilterOptions = {
	'0': '',
	'20': 'grayscale-[20%]',
	'40': 'grayscale-[40%]',
	'60': 'grayscale-[60%]',
	'80': 'grayscale-[80%]',
	'100': 'grayscale'
};

export const sepiaFilterOptions: Type.SepiaFilterOptions = {
	'0': '',
	'20': 'sepia-[20%]',
	'40': 'sepia-[40%]',
	'60': 'sepia-[60%]',
	'80': 'sepia-[80%]',
	'100': 'sepia'
};

export const invertFilterOptions: Type.InvertFilterOptions = {
	'0': '',
	'20': 'invert-[20%]',
	'40': 'invert-[40%]',
	'60': 'invert-[60%]',
	'80': 'invert-[80%]',
	'100': 'invert'
};

export const saturateFilterOptions: Type.SaturateFilterOptions = {
	'0': '',
	'50': 'saturate-50',
	'100': 'saturate-100',
	'150': 'saturate-150',
	'200': 'saturate-200'
};

export const contrastFilterOptions: Type.ContrastFilterOptions = {
	'0': '',
	'1': 'contrast-50',
	'2': 'contrast-75',
	'3': 'contrast-100',
	'4': 'contrast-125',
	'5': 'contrast-150',
	'6': 'contrast-200'
};

// END OF FILTER OPTS - END OF FILTER OPTS - END OF FILTER OPTS - END OF FILTER
// OPTS - END OF FILTER OPTS - END OF FILTER OPTS -

export const customDecorationOptions: Type.CustomDecorationOptions = {
	diagonalBackdrops: ` before:absolute before:bg-surface-primary-100 before:inset-0 before:-translate-x-[10px] before:-translate-y-[10px] before:-z-1
						after:absolute after:bg-orange-100 after:inset-0 after:translate-x-[10px] after:translate-y-[10px] after:-z-1`,
	none: ''
};
