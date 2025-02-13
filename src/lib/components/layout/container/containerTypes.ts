interface Slider0to20 {
	plugin: string;
	value: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20;
}
interface SliderMinus1to20 {
	plugin: string;
	value: -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20;
}

interface SliderNumbers {
	plugin: string;
	value: number;
}

interface BorderRadius {
	plugin: string;
	value: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
}
interface BorderThickness {
	plugin: string;
	value: 0 | 1 | 2 | 3 | 4;
}

export interface ContainerStoryblok {
	layout_options_desktop?: any;
	content_direction_lg: 'row' | 'rowReversed' | 'column' | 'columnReversed' | 'none';
	justify_content_lg: 'start' | 'center' | 'end' | 'stretch' | 'between' | 'around' | 'evenly' | 'normal' | 'none';
	align_items_lg: 'start' | 'end' | 'center' | 'baseline' | 'stretch' | 'none';
	wrap_content_lg: 'wrap' | 'noWrap' | 'none';
	self_layout_options_desktop?: any;
	flex_lg: 'default' | 'flexAuto' | 'flexInitial' | 'flexNone' | 'none';
	align_self_lg: 'selfAuto' | 'selfStart' | 'selfEnd' | 'selfCenter' | 'selfStretch' | 'selfBaseline' | 'none';
	margin_options_desktop?: any;
	padding_options_desktop?: any;
	width_options_desktop?: any;
	width_lg: 'full' | 'Unset' | "Simple way to manipulate the width of our element based on its content or based on its parent's height.";
	height_options_desktop?: any;
	height_lg: 'full' | 'max' | 'unset';
	child_styling_desktop?: any;
	text_align_lg?: 'left' | 'center' | 'right' | 'justify' | 'none';
	blocks: (ButtonStoryblok | ContainerStoryblok | ContainerLegacyStoryblok | CustomHeroStoryblok | DividerStoryblok | EmbedTextStoryblok | FooterStoryblok | FooterColumnStoryblok | HeaderStoryblok | IconStoryblok | ImageStoryblok | NavLinkStoryblok | NavLogoStoryblok | PageStoryblok | SectionStoryblok | SimpleCardStoryblok | SimpleTextStoryblok | SvgDividerStoryblok | TestimonialStoryblok | TextStoryblok)[];
	storyblok_name?: string;
	meta_data?: any;
	container_id?: string;
	container_class?: string;
	style_options?: any;
	custom_css?: string;
	overflow: 'auto' | 'hidden' | 'scroll' | 'visible';
	background_color: 'none' | 'default' | 'primary-50' | 'primary-100' | 'primary-200' | 'primary-300' | 'primary-400' | 'primary-500' | 'primary-600' | 'primary-700' | 'primary-800' | 'primary-900' | 'primary-950' | 'secondary-50' | 'secondary-100' | 'secondary-200' | 'secondary-300' | 'secondary-400' | 'secondary-500' | 'secondary-600' | 'secondary-700' | 'secondary-800' | 'secondary-900' | 'secondary-950';
	border_color: 'none' | 'primary-50' | 'primary-100' | 'primary-200' | 'primary-300' | 'primary-400' | 'primary-500' | 'primary-600' | 'primary-700' | 'primary-800' | 'primary-900' | 'primary-950' | 'secondary-50' | 'secondary-100' | 'secondary-200' | 'secondary-300' | 'secondary-400' | 'secondary-500' | 'secondary-600' | 'secondary-700' | 'secondary-800' | 'secondary-900' | 'secondary-950';
	layout_options_tab?: any;
	content_direction_md: 'row' | 'rowReversed' | 'column' | 'columnReversed' | 'none';
	justify_content_md: 'start' | 'center' | 'end' | 'stretch' | 'between' | 'around' | 'evenly' | 'normal' | 'none';
	align_items_md: 'start' | 'end' | 'center' | 'baseline' | 'stretch' | 'none';
	wrap_content_md: 'wrap' | 'noWrap' | 'none';
	self_layout_options_tab?: any;
	flex_md: 'default' | 'flexAuto' | 'flexInitial' | 'flexNone' | 'none';
	align_self_md: 'selfAuto' | 'selfStart' | 'selfEnd' | 'selfCenter' | 'selfStretch' | 'selfBaseline' | 'none';
	margin_options_tab?: any;
	padding_options_tab?: any;
	width_options_tab?: any;
	width_md: 'full' | 'max' | 'unset';
	height_options_tab?: any;
	height_md: 'full' | 'max' | 'unset';
	child_styling_tab?: any;
	text_align_md?: 'left' | 'center' | 'right' | 'justify' | 'none';
	layout_options_small_tab?: any;
	content_direction_lm: 'row' | 'rowReversed' | 'column' | 'columnReversed' | 'none';
	justify_content_lm: 'start' | 'center' | 'end' | 'stretch' | 'between' | 'around' | 'evenly' | 'normal' | 'none';
	align_items_lm: 'start' | 'end' | 'center' | 'baseline' | 'stretch' | 'none';
	wrap_content_lm: 'wrap' | 'noWrap' | 'none';
	self_layout_options_small_tab?: any;
	flex_lm: 'default' | 'flexAuto' | 'flexInitial' | 'flexNone' | 'none';
	align_self_lm: 'selfAuto' | 'selfStart' | 'selfEnd' | 'selfCenter' | 'selfStretch' | 'selfBaseline' | 'none';
	margin_options_small_tab?: any;
	padding_options_small_tab?: any;
	width_options_small_tab?: any;
	width_lm: 'full' | 'max' | 'unset';
	height_options_small_tab?: any;
	height_lm: 'full' | 'max' | 'unset';
	child_styling_small_tab?: any;
	text_align_lm?: 'left' | 'center' | 'right' | 'justify' | 'none';
	layout_options_med_mob?: any;
	content_direction_mm: 'row' | 'rowReversed' | 'column' | 'columnReversed' | 'none';
	justify_content_mm: 'start' | 'center' | 'end' | 'stretch' | 'between' | 'around' | 'evenly' | 'normal' | 'none';
	align_items_mm: 'start' | 'end' | 'center' | 'baseline' | 'stretch' | 'none';
	wrap_content_mm: 'wrap' | 'noWrap' | 'none';
	self_layout_options_med_mob?: any;
	flex_mm: 'default' | 'flexAuto' | 'flexInitial' | 'flexNone' | 'none';
	align_self_mm: 'selfAuto' | 'selfStart' | 'selfEnd' | 'selfCenter' | 'selfStretch' | 'selfBaseline' | 'none';
	margin_options_med_mob?: any;
	padding_options_med_mob?: any;
	width_options_med_mob?: any;
	width_mm: 'full' | 'max' | 'unset';
	height_options_med_mob?: any;
	height_mm: 'full' | 'max' | 'unset';
	child_styling_med_mob?: any;
	text_align_mm?: 'left' | 'center' | 'right' | 'justify' | 'none';
	layout_options_mob?: any;
	content_direction_default: 'row' | 'rowReversed' | 'column' | 'columnReversed' | 'none';
	justify_content_default: 'start' | 'center' | 'end' | 'stretch' | 'between' | 'around' | 'evenly' | 'normal';
	align_items_default: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
	wrap_content_default: 'wrap' | 'noWrap' | 'none';
	self_layout_options_mob?: any;
	flex_default: 'default' | 'flexAuto' | 'flexInitial' | 'flexNone';
	align_self_default: 'selfAuto' | 'selfStart' | 'selfEnd' | 'selfCenter' | 'selfStretch' | 'selfBaseline';
	margin_options_mob?: any;
	padding_options_mob?: any;
	width_options_mob?: any;
	width_default: 'full' | 'max' | 'unset';
	min_width_unit_default?: '' | 'rem' | 'em' | 'px' | 'vw' | '%' | 'none';
	height_options_mob?: any;
	height_default: 'full' | 'max' | 'unset';
	min_height_unit_default?: 'rem' | 'em' | 'px' | 'vh' | '%' | 'none';
	child_styling_mob?: any;
	text_align_default?: 'left' | 'center' | 'right' | 'justify' | 'none';

	gap_default: SliderMinus1to20;
	gap_mm: SliderMinus1to20;
	gap_lm: SliderMinus1to20;
	gap_md: SliderMinus1to20;
	gap_lg: SliderMinus1to20;

	margin_top_default: SliderMinus1to20;
	margin_top_mm: SliderMinus1to20;
	margin_top_lm: SliderMinus1to20;
	margin_top_md: SliderMinus1to20;
	margin_top_lg: SliderMinus1to20;

	margin_bottom_default: SliderMinus1to20;
	margin_bottom_mm: SliderMinus1to20;
	margin_bottom_lm: SliderMinus1to20;
	margin_bottom_md: SliderMinus1to20;
	margin_bottom_lg: SliderMinus1to20;

	all_padding_default: SliderMinus1to20;
	all_padding_mm: SliderMinus1to20;
	all_padding_lm: SliderMinus1to20;
	all_padding_md: SliderMinus1to20;
	all_padding_lg: SliderMinus1to20;

	vertical_padding_default: SliderMinus1to20;
	vertical_padding_mm: SliderMinus1to20;
	vertical_padding_lm: SliderMinus1to20;
	vertical_padding_md: SliderMinus1to20;
	vertical_padding_lg: SliderMinus1to20;

	horizontal_padding_default: SliderMinus1to20;
	horizontal_padding_mm: SliderMinus1to20;
	horizontal_padding_lm: SliderMinus1to20;
	horizontal_padding_md: SliderMinus1to20;
	horizontal_padding_lg: SliderMinus1to20;

	max_width_default: Slider0to20;
	max_width_mm: Slider0to20;
	max_width_lm: Slider0to20;
	max_width_md: Slider0to20;
	max_width_lg: Slider0to20;

	min_width_default: SliderNumbers; // 0-1000
	min_height_default: SliderNumbers; // 0-100

	// These do not get impacted by our breakpoints
	border_radius: BorderRadius;
	border_thickness: BorderThickness;

	_uid: string;
	component: 'container_two';
	[k: string]: any;
}

// Base types
export type Breakpoint = 'def' | 'mm' | 'lm' | 'md' | 'lg';
export type TailwindClass = string;
export type TextAlign = 'left' | 'center' | 'right' | 'justify' | 'none';

// Generic option types
export type OptionValues<T extends string> = {
	[K in T]: TailwindClass;
};

export type Options<T extends string> = {
	[K in Breakpoint]: OptionValues<T>;
};

// Flex-related types
export type FlexDirection = 'row' | 'rowReversed' | 'column' | 'columnReversed' | 'none';
export type JustifyContent = 'normal' | 'start' | 'end' | 'center' | 'stretch' | 'between' | 'around' | 'evenly' | 'none';
export type AlignItems = 'start' | 'end' | 'center' | 'baseline' | 'stretch' | 'none';
export type WrapType = 'wrap' | 'noWrap' | 'none';
export type FlexType = 'default' | 'flexAuto' | 'flexInitial' | 'flexNone' | 'none';
export type AlignSelfType = 'selfAuto' | 'selfStart' | 'selfEnd' | 'selfCenter' | 'selfStretch' | 'selfBaseline' | 'none';
export type DisplayOption = 'flex' | 'hidden' | 'none';

// Visual types
export type DimensionType = 'full' | 'max' | 'unset';
export type ColorVariants = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;
export type BackgroundType = 'none' | 'default' | `primary-${ColorVariants}` | `secondary-${ColorVariants}`;
export type BorderType = BackgroundType;
export type OverflowType = 'hidden' | 'scroll' | 'auto' | 'visible';
export type BorderRadiusType = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8';

// Spacing types
export type SpacingType = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | '13' | '14' | '15' | '16' | '17' | '18' | '19' | '20';
export type SpacingNegativeType = '-1' | SpacingType;

// Specific option types using generic Options
export type DisplayOptions = Options<DisplayOption>;
export type DirectionOptions = Options<FlexDirection>;
export type JustifyOptions = Options<JustifyContent>;
export type AlignItemsOptions = Options<AlignItems>;
export type WrapOptions = Options<WrapType>;
export type FlexOptions = Options<FlexType>;
export type AlignSelfOptions = Options<AlignSelfType>;
export type DimensionOptions = Options<DimensionType>;
export type SpacingOptions = Options<SpacingType>;
export type SpacingOptionsWithNegativeValue = Options<SpacingNegativeType>;
export type TextAlignOptions = Options<TextAlign>;

// Record types for simpler options
export type BackgroundOptions = Record<BackgroundType, string>;
export type BorderOptions = Record<BorderType, string>;
export type OverflowOptions = Record<OverflowType, string>;
export type BorderRadiusOptions = Record<BorderRadiusType, string>;

// Add this with the other basic types

// Add this with the other Options types
