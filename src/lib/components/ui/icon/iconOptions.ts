export type Color = 'none' | 'default' | 'primary-50' | 'primary-100' | 'primary-200' | 'primary-300' | 'primary-400' | 'primary-500' | 'primary-600' | 'primary-700' | 'primary-800' | 'primary-900' | 'primary-950' | 'secondary-50' | 'secondary-100' | 'secondary-200' | 'secondary-300' | 'secondary-400' | 'secondary-500' | 'secondary-600' | 'secondary-700' | 'secondary-800' | 'secondary-900' | 'secondary-950';

export type ColorOptions = Record<Color, string>;

export const fillColorOptions: ColorOptions = {
	none: '',
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
export const strokeColorOptions: ColorOptions = {
	none: '',
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
