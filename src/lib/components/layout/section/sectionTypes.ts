export interface SectionStoryblok {
	metaData?: any;
	section_id: string;
	section_labelledby: string;
	type: 'section' | 'article';
	blocks?: (ContainerStoryblok | PageStoryblok | SectionStoryblok | TextStoryblok)[];
	layout?: any;
	grid_span: 'fullSpan' | 'centeredSpan1' | 'centeredSpan2' | 'centeredSpan3' | 'centeredSpan4' | 'centeredSpan5' | 'centeredSpan6';
	justify_content: 'normal' | 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly' | 'stretch';
	align_items: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
	item_spacing?: any;
	styling?: any;
	background_color: 'none' | 'default' | 'primary-50' | 'primary-100' | 'primary-200' | 'primary-300' | 'primary-400' | 'primary-500' | 'primary-600' | 'primary-700' | 'primary-800' | 'primary-900' | 'primary-950';
	overflow: 'auto' | 'hidden' | 'scroll' | 'visible';
	customStyling?: string;

	vertical_padding: {
		plugin: 'storyblok-slider';
		value: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20;
	};
	horizontal_padding: {
		plugin: 'storyblok-slider';
		value: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20;
	};
	gap: {
		plugin: 'storyblok-slider';
		value: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20;
	};

	_uid: string;
	component: 'section';
	[k: string]: any;
}

// Grid span options
export type GridSpanType = 'centeredSpan1' | 'centeredSpan2' | 'centeredSpan3' | 'centeredSpan4' | 'centeredSpan5' | 'centeredSpan6' | 'fullSpan';
export type GridSpanOptions = Record<GridSpanType, string>;

// Justify content options
export type JustifyContentType = 'normal' | 'start' | 'end' | 'center' | 'stretch' | 'between' | 'around' | 'evenly';
export type JustifyContentOptions = Record<JustifyContentType, string>;

// Align items options
export type AlignItemsType = 'start' | 'end' | 'center' | 'baseline' | 'stretch';
export type AlignItemsOptions = Record<AlignItemsType, string>;

// Y padding options
export type YPaddingType = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | '13' | '14' | '15' | '16' | '17' | '18' | '19' | '20';

export type YPaddingOptions = Record<YPaddingType, string>;

// X padding options
export type XPaddingType = YPaddingType;
export type XPaddingOptions = Record<XPaddingType, string>;

// Gap options
export type GapType = YPaddingType;
export type GapOptions = Record<GapType, string>;

// Overflow options
export type OverflowType = 'hidden' | 'scroll' | 'auto' | 'visible';
export type OverflowOptions = Record<OverflowType, string>;

// Background options
export type BackgroundType = 'none' | 'default' | 'primary-50' | 'primary-100' | 'primary-200' | 'primary-300' | 'primary-400' | 'primary-500' | 'primary-600' | 'primary-700' | 'primary-800' | 'primary-900' | 'primary-950';
export type BackgroundOptions = Record<BackgroundType, string>;
