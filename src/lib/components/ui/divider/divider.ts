export type Slider = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20;
export type BackgroundType = 'none' | 'default' | `primary-${50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950}` | `secondary-${50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950}`;
export type BackgroundOptions = Record<BackgroundType, string>;

export type SliderOptions = Record<Slider, string>;

export interface DividerStoryblok {
	divider_color: 'none' | 'default' | 'secondary-50' | 'secondary-100' | 'secondary-200' | 'secondary-300' | 'secondary-400' | 'secondary-500' | 'secondary-600' | 'secondary-700' | 'secondary-800' | 'secondary-900' | 'secondary-950' | 'primary-50' | 'primary-100' | 'primary-200' | 'primary-300' | 'primary-400' | 'primary-500' | 'primary-600' | 'primary-700' | 'primary-800' | 'primary-900' | 'primary-950';

	divider_height: {
		plugin: 'storyblok-slider';
		value: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
	};

	divider_max_width: {
		plugin: 'storyblok-slider';
		value: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20;
	};

	_uid: string;
	component: 'divider';
	[k: string]: any;
}

export const maxWidthOptions: SliderOptions = {
	'20': 'max-w-max',
	'19': 'max-w-7xl',
	'18': 'max-w-6xl',
	'17': 'max-w-5xl',
	'16': 'max-w-4xl',
	'15': 'max-w-3xl',
	'14': 'max-w-2xl',
	'13': 'max-w-xl',
	'12': 'max-w-lg',
	'11': 'max-w-md',
	'10': 'max-w-sm',
	'9': 'max-w-64',
	'8': 'max-w-56',
	'7': 'max-w-48',
	'6': 'max-w-40',
	'5': 'max-w-32',
	'4': 'max-w-24',
	'3': 'max-w-16',
	'2': 'max-w-8',
	'1': 'max-w-6',
	'0': ''
};

export const backgroundOptions: BackgroundOptions = {
	none: 'bg-surface-none',
	default: 'bg-surface-default',
	'primary-50': 'bg-surface-primary-50',
	'primary-100': 'bg-surface-primary-100',
	'primary-200': 'bg-surface-primary-200',
	'primary-300': 'bg-surface-primary-300',
	'primary-400': 'bg-surface-primary-400',
	'primary-500': 'bg-surface-primary-500',
	'primary-600': 'bg-surface-primary-600',
	'primary-700': 'bg-surface-primary-700',
	'primary-800': 'bg-surface-primary-800',
	'primary-900': 'bg-surface-primary-900',
	'primary-950': 'bg-surface-primary-950',
	'secondary-50': 'bg-surface-secondary-50',
	'secondary-100': 'bg-surface-secondary-100',
	'secondary-200': 'bg-surface-secondary-200',
	'secondary-300': 'bg-surface-secondary-300',
	'secondary-400': 'bg-surface-secondary-400',
	'secondary-500': 'bg-surface-secondary-500',
	'secondary-600': 'bg-surface-secondary-600',
	'secondary-700': 'bg-surface-secondary-700',
	'secondary-800': 'bg-surface-secondary-800',
	'secondary-900': 'bg-surface-secondary-900',
	'secondary-950': 'bg-surface-secondary-950'
};
