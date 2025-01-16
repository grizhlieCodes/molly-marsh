export interface ContainerStoryblok {
	metaData?: any;
	blocks: (ContainerStoryblok | PageStoryblok | SectionStoryblok | TextStoryblok)[];
	container_id?: string;
	container_class?: string;
	layout?: any;
	content_direction: 'row' | 'onlyRow' | 'column' | 'rowReversed' | 'columnReversed';
	justify_content: 'start' | 'center' | 'end' | 'stretch' | 'between' | 'around' | 'evenly' | 'normal';
	align_items: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
	wrap_content: 'wrap' | 'noWrap';
	gap: {
		plugin: 'storyblok-slider';
		value: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20;
	};
	child_layout?: any;
	flex: 'default' | 'flexAuto' | 'flexInitial' | 'flexNone';
	align_self: 'selfAuto' | 'selfStart' | 'selfEnd' | 'selfCenter' | 'selfStretch' | 'selfBaseline';
	external_spacing?: any;
	margin_top: {
		plugin: 'storyblok-slider';
		value: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20;
	};
	margin_bottom: {
		plugin: 'storyblok-slider';
		value: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20;
	};

	dimensions?: any;
	max_width: {
		plugin: 'storyblok-slider';
		value: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20;
	};
	height: '' | 'full' | 'max' | 'unset';

	padding?: any;
	all_padding: {
		plugin: 'storyblok-slider';
		value: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20;
	};
	vertical_padding: {
		plugin: 'storyblok-slider';
		value: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20;
	};
	horizontal_padding: {
		plugin: 'storyblok-slider';
		value: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20;
	};

	dimension_overwrites?: any;
	min_width: {
		plugin: 'storyblok-slider';
		value: number; // 0 - 1000
	};
	min_width_unit?: '' | 'rem' | 'em' | 'px' | 'viewWidth' | 'perc' | 'none';
	min_height: {
		plugin: 'storyblok-slider';
		value: number; // 0 - 100
	};
	min_height_unit?: '' | 'rem' | 'em' | 'px' | 'viewHeight' | 'perc' | 'none';

	styling?: any;
	background_color: 'none' | 'default' | 'primary-50' | 'primary-100' | 'primary-200' | 'primary-300' | 'primary-400' | 'primary-500' | 'primary-600' | 'primary-700' | 'primary-800' | 'primary-900' | 'primary-950';
	overflow: 'auto' | 'hidden' | 'scroll' | 'visible';
	customStyling?: string;
	border_radius: {
		plugin: 'storyblok-slider';
		value: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
	};

	_uid: string;
	component: 'container';
	[k: string]: any;
}

// Base type for direction options
export type DirectionType = 'row' | 'onlyRow' | 'column' | 'rowReversed' | 'columnReversed';
export type DirectionOptions = Record<DirectionType, string>;

// Justify content options
export type JustifyContentType = 'normal' | 'start' | 'end' | 'center' | 'stretch' | 'between' | 'around' | 'evenly';
export type JustifyContentOptions = Record<JustifyContentType, string>;

// Align items options
export type AlignItemsType = 'start' | 'end' | 'center' | 'baseline' | 'stretch';
export type AlignItemsOptions = Record<AlignItemsType, string>;

// Wrap options
export type WrapType = 'wrap' | 'noWrap';
export type WrapOptions = Record<WrapType, string>;

// Flex options
export type FlexType = 'default' | 'flexAuto' | 'flexInitial' | 'flexNone';
export type FlexOptions = Record<FlexType, string>;

// Align self options
export type AlignSelfType = 'selfAuto' | 'selfStart' | 'selfEnd' | 'selfCenter' | 'selfStretch' | 'selfBaseline';
export type AlignSelfOptions = Record<AlignSelfType, string>;

// Height options
export type HeightType = '' | 'full' | 'max' | 'unset';
export type HeightOptions = Record<HeightType, string>;

// Background options
export type BackgroundType = 'none' | 'default' | 'primary-50' | 'primary-100' | 'primary-200' | 'primary-300' | 'primary-400' | 'primary-500' | 'primary-600' | 'primary-700' | 'primary-800' | 'primary-900' | 'primary-950';
export type BackgroundOptions = Record<BackgroundType, string>;

// Overflow options
export type OverflowType = 'hidden' | 'scroll' | 'auto' | 'visible';
export type OverflowOptions = Record<OverflowType, string>;

// Spacing options (for gap, margins, padding)
export type SpacingKey = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | '13' | '14' | '15' | '16' | '17' | '18' | '19' | '20';
export type SpacingOptions = Record<SpacingKey, string>;

export type BorderRadiusType = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8';
export type BorderRadiusOptions = Record<BorderRadiusType, string>;
