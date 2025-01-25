interface SliderValue {
	plugin: 'storyblok-slider';
	value: number;
}

export interface SvgDividerStoryblok {
	height: {
		plugin: 'storyblok-slider';
		value: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20;
	};
	width: {
		plugin: 'storyblok-slider';
		value: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20;
	};
	y_translate_value: SliderValue;
	y_translate_unit?: string;
	x_translate_value: SliderValue;
	x_translate_unit?: string;
	flip_horizontally: boolean;
	svg: 'dotsAscending' | 'dotsStacked' | 'arrowArcUp' | 'arrowSquiggleDown';
	fill_color: 'none' | 'default' | 'primary-50' | 'primary-100' | 'primary-200' | 'primary-300' | 'primary-400' | 'primary-500' | 'primary-600' | 'primary-700' | 'primary-800' | 'primary-900' | 'primary-950' | 'secondary-50' | 'secondary-100' | 'secondary-200' | 'secondary-300' | 'secondary-400' | 'secondary-500' | 'secondary-600' | 'secondary-700' | 'secondary-800' | 'secondary-900' | 'secondary-950';
	stroke_color: 'none' | 'default' | 'primary-50' | 'primary-100' | 'primary-200' | 'primary-300' | 'primary-400' | 'primary-500' | 'primary-600' | 'primary-700' | 'primary-800' | 'primary-900' | 'primary-950' | 'secondary-50' | 'secondary-100' | 'secondary-200' | 'secondary-300' | 'secondary-400' | 'secondary-500' | 'secondary-600' | 'secondary-700' | 'secondary-800' | 'secondary-900' | 'secondary-950';
	top_absolute_value?: SliderValue;
	top_absolute_unit?: string;
	right_absolute_value?: SliderValue;
	right_absolute_unit?: string;
	bottom_absolute_value?: SliderValue;
	bottom_absolute_unit?: string;
	left_absolute_value?: SliderValue;
	left_absolute_unit?: string;
	_uid: string;
	component: 'svg_divider';
	[k: string]: any;
}

export type SpacingKey = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | '13' | '14' | '15' | '16' | '17' | '18' | '19' | '20';
export type SpacingOptions = Record<SpacingKey, string>;
export type StandardZeroToTwentyValues = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20;
export type WidthOptions = Record<SpacingKey, string>;
export type HeightOptions = Record<SpacingKey, string>;

export interface RotateValue {
	plugin: 'storyblok-slider';
	value: number; // 0-360
}

export type PositionUnitVertical = 'px' | '%' | 'rem' | 'em' | 'vh';
export type PositionUnitHorizontal = 'px' | '%' | 'rem' | 'em' | 'vw';

export interface StoryblokSliderValue {
	plugin: 'storyblok-slider';
	value: number; // -200 to 200
}

export interface PositionUnitValue {
	value: PositionUnitVertical | PositionUnitHorizontal;
}

export interface SvgDividerPosition {
	top_absolute_value: StoryblokSliderValue;
	top_absolute_unit: PositionUnitValue;
	right_absolute_value: StoryblokSliderValue;
	right_absolute_unit: PositionUnitValue;
	bottom_absolute_value: StoryblokSliderValue;
	bottom_absolute_unit: PositionUnitValue;
	left_absolute_value: StoryblokSliderValue;
	left_absolute_unit: PositionUnitValue;
}

export interface SvgDividerTranslate {
	top_Translate_value: StoryblokSliderValue;
	top_Translate_unit: PositionUnitValue;
	right_Translate_value: StoryblokSliderValue;
	right_Translate_unit: PositionUnitValue;
	bottom_Translate_value: StoryblokSliderValue;
	bottom_Translate_unit: PositionUnitValue;
	left_Translate_value: StoryblokSliderValue;
	left_Translate_unit: PositionUnitValue;
}

export type Color = 'none' | 'default' | 'primary-50' | 'primary-100' | 'primary-200' | 'primary-300' | 'primary-400' | 'primary-500' | 'primary-600' | 'primary-700' | 'primary-800' | 'primary-900' | 'primary-950' | 'secondary-50' | 'secondary-100' | 'secondary-200' | 'secondary-300' | 'secondary-400' | 'secondary-500' | 'secondary-600' | 'secondary-700' | 'secondary-800' | 'secondary-900' | 'secondary-950';

export type FillColorOptions = Record<Color, string>;
export type StrokeColorOptions = Record<Color, string>;
