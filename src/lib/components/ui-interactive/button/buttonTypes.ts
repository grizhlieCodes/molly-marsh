export interface ButtonStoryblok {
	meta_data?: any;
	content: (IconStoryblok | SimpleTextStoryblok)[];
	url: Exclude<MultilinkStoryblok, { linktype?: 'email' } | { linktype?: 'asset' }>;
	label: string;
	target: 'newTab' | 'currentTab' | 'none';
	styling?: any;
	button_theme: 'primary' | 'secondary';
	button_width: 'full' | 'max';

	button_size: {
		plugin: 'storyblok-slider';
		value: 1 | 2 | 3 | 4 | 5;
	};
	_uid: string;
	component: 'button';
	[k: string]: any;
}

// Size options type
export type SizeKey = '1' | '2' | '3' | '4' | '5';
export type SizeOptions = Record<SizeKey, string>;

// Theme options type
export type ThemeKey = 'primary' | 'secondary';
export type ThemeOptions = Record<ThemeKey, string>;

// Target options type
export type TargetKey = 'newTab' | 'currentTab';
export type TargetOptions = Record<TargetKey, string>;

// Width options type
export type WidthKey = 'full' | 'max';
export type WidthOptions = Record<WidthKey, string>;

// Type for the entire styling options object
export type StylingOptions = {
	sizeStylingOptions: SizeOptions;
	themeStylingOptions: ThemeOptions;
	widthStylingOptions: WidthOptions;
};
