import type * as Type from './svgDividerTypes';

export const widthOptions: Type.WidthOptions = {
	'20': 'w-48 md:w-52 lg:w-56', // 192px -> 208px -> 224px
	'19': 'w-44 md:w-48 lg:w-52', // 176px -> 192px -> 208px
	'18': 'w-40 md:w-44 lg:w-48', // 160px -> 176px -> 192px
	'17': 'w-36 md:w-40 lg:w-44', // 144px -> 160px -> 176px
	'16': 'w-32 md:w-36 lg:w-40', // 128px -> 144px -> 160px
	'15': 'w-28 md:w-32 lg:w-36', // 112px -> 128px -> 144px
	'14': 'w-24 md:w-28 lg:w-32', // 96px -> 112px -> 128px
	'13': 'w-20 md:w-24 lg:w-28', // 80px -> 96px -> 112px
	'12': 'w-16 md:w-20 lg:w-24', // 64px -> 80px -> 96px
	'11': 'w-14 md:w-16 lg:w-20', // 56px -> 64px -> 80px
	'10': 'w-12 md:w-14 lg:w-16', // 48px -> 56px -> 64px
	'9': 'w-10 md:w-12 lg:w-14', // 40px -> 48px -> 56px
	'8': 'w-8 md:w-10 lg:w-12', // 32px -> 40px -> 48px
	'7': 'w-6 md:w-8 lg:w-10', // 24px -> 32px -> 40px
	'6': 'w-5 md:w-6 lg:w-8', // 20px -> 24px -> 32px
	'5': 'w-4 md:w-5 lg:w-6', // 16px -> 20px -> 24px
	'4': 'w-3 md:w-4 lg:w-5', // 12px -> 16px -> 20px
	'3': 'w-2 md:w-3 lg:w-4', // 8px -> 12px -> 16px
	'2': 'w-1 md:w-2 lg:w-3', // 4px -> 8px -> 12px
	'1': 'w-0.5 md:w-1 lg:w-2', // 2px -> 4px -> 8px
	'0': '' // 0px -> 0px -> 0px
};

export const heightOptions: Type.HeightOptions = {
	'20': 'h-48 md:h-52 lg:h-56', // 192px -> 208px -> 224px
	'19': 'h-44 md:h-48 lg:h-52', // 176px -> 192px -> 208px
	'18': 'h-40 md:h-44 lg:h-48', // 160px -> 176px -> 192px
	'17': 'h-36 md:h-40 lg:h-44', // 144px -> 160px -> 176px
	'16': 'h-32 md:h-36 lg:h-40', // 128px -> 144px -> 160px
	'15': 'h-28 md:h-32 lg:h-36', // 112px -> 128px -> 144px
	'14': 'h-24 md:h-28 lg:h-32', // 96px -> 112px -> 128px
	'13': 'h-20 md:h-24 lg:h-28', // 80px -> 96px -> 112px
	'12': 'h-16 md:h-20 lg:h-24', // 64px -> 80px -> 96px
	'11': 'h-14 md:h-16 lg:h-20', // 56px -> 64px -> 80px
	'10': 'h-12 md:h-14 lg:h-16', // 48px -> 56px -> 64px
	'9': 'h-10 md:h-12 lg:h-14', // 40px -> 48px -> 56px
	'8': 'h-8 md:h-10 lg:h-12', // 32px -> 40px -> 48px
	'7': 'h-6 md:h-8 lg:h-10', // 24px -> 32px -> 40px
	'6': 'h-5 md:h-6 lg:h-8', // 20px -> 24px -> 32px
	'5': 'h-4 md:h-5 lg:h-6', // 16px -> 20px -> 24px
	'4': 'h-3 md:h-4 lg:h-5', // 12px -> 16px -> 20px
	'3': 'h-2 md:h-3 lg:h-4', // 8px -> 12px -> 16px
	'2': 'h-1 md:h-2 lg:h-3', // 4px -> 8px -> 12px
	'1': 'h-0.5 md:h-1 lg:h-2', // 2px -> 4px -> 8px
	'0': '' // 0px -> 0px -> 0px
};

export const fillColorOptions: Type.FillColorOptions = {
	none: 'fill-surface-none',
	default: 'fill-surface-default',
	'primary-50': 'fill-surface-primary-50',
	'primary-100': 'fill-surface-primary-100',
	'primary-200': 'fill-surface-primary-200',
	'primary-300': 'fill-surface-primary-300',
	'primary-400': 'fill-surface-primary-400',
	'primary-500': 'fill-surface-primary-500',
	'primary-600': 'fill-surface-primary-600',
	'primary-700': 'fill-surface-primary-700',
	'primary-800': 'fill-surface-primary-800',
	'primary-900': 'fill-surface-primary-900',
	'primary-950': 'fill-surface-primary-950',
	'secondary-50': 'fill-surface-secondary-50',
	'secondary-100': 'fill-surface-secondary-100',
	'secondary-200': 'fill-surface-secondary-200',
	'secondary-300': 'fill-surface-secondary-300',
	'secondary-400': 'fill-surface-secondary-400',
	'secondary-500': 'fill-surface-secondary-500',
	'secondary-600': 'fill-surface-secondary-600',
	'secondary-700': 'fill-surface-secondary-700',
	'secondary-800': 'fill-surface-secondary-800',
	'secondary-900': 'fill-surface-secondary-900',
	'secondary-950': 'fill-surface-secondary-950'
};
export const strokeColorOptions: Type.StrokeColorOptions = {
	none: 'stroke-surface-none',
	default: 'stroke-surface-default',
	'primary-50': 'stroke-surface-primary-50',
	'primary-100': 'stroke-surface-primary-100',
	'primary-200': 'stroke-surface-primary-200',
	'primary-300': 'stroke-surface-primary-300',
	'primary-400': 'stroke-surface-primary-400',
	'primary-500': 'stroke-surface-primary-500',
	'primary-600': 'stroke-surface-primary-600',
	'primary-700': 'stroke-surface-primary-700',
	'primary-800': 'stroke-surface-primary-800',
	'primary-900': 'stroke-surface-primary-900',
	'primary-950': 'stroke-surface-primary-950',
	'secondary-50': 'stroke-surface-secondary-50',
	'secondary-100': 'stroke-surface-secondary-100',
	'secondary-200': 'stroke-surface-secondary-200',
	'secondary-300': 'stroke-surface-secondary-300',
	'secondary-400': 'stroke-surface-secondary-400',
	'secondary-500': 'stroke-surface-secondary-500',
	'secondary-600': 'stroke-surface-secondary-600',
	'secondary-700': 'stroke-surface-secondary-700',
	'secondary-800': 'stroke-surface-secondary-800',
	'secondary-900': 'stroke-surface-secondary-900',
	'secondary-950': 'stroke-surface-secondary-950'
};
