export interface TextStoryblok {
	Content?: any;
	content?: string;
	storyblok_name?: string;
	text_id?: string;
	text_type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'h7' | 'p' | 'span' | 'blockquote' | 'cite' | 'sr';
	core_styles?: any;
	text_style: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'h7' | 'h8' | 'h9' | 'h10' | 'h11' | 'h12' | 'para1' | 'para2' | 'para3' | 'para4' | 'para5' | 'paraBase' | 'para6' | 'para7' | 'para8' | 'para9' | 'para10' | 'quote' | 'overline' | 'sr' | 'navLink';
	text_align: 'left' | 'center' | 'right' | 'justify' | 'inherit';
	text_color_overwrite?: '' | 'primaryDark' | 'primaryDefault' | 'primaryMedium' | 'primaryLight' | 'secondaryDark' | 'secondaryDefault' | 'secondaryMedium' | 'secondaryLight' | 'redDark' | 'redMid' | 'redLight' | 'black';
	font_weight_overwrites?: any;
	custom_styling?: any;
	custom_css?: string;
	rich_text?: RichtextStoryblok;
	multi_line_bloks?: EmbedTextStoryblok[];
	mode?: 'text' | 'multi-line';

	max_width: {
		plugin: 'storyblok-slider';
		value: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20;
	};

	font_weight_set: {
		plugin: 'storyblok-slider';
		value: 0 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
	};

	font_weight_variable: {
		plugin: 'storyblok-slider';
		value: number;
	};

	_uid: string;
	component: 'text';
	[k: string]: any;
}

export type TextTypes = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'blockquote' | 'cite';

export interface Styles {
	h1: string;
	h2: string;
	h3: string;
	h4: string;
	h5: string;
	h6: string;
	h7: string;
	paraXs: string;
	paraSm: string;
	paraBase: string;
	paraLg: string;
	paraXl: string;
	overline: string;
	quote: string;
	cite: string;
	sr: string;
	internal_error: string;
}

// Text type options
// export type TextTypeValue = 'h1' | 'h2' | 'h3' | 'h4' | 'h6' | 'h8' | 'h9' | 'h10' | 'h11' | 'h12' | 'paraXs' | 'paraSm' | 'paraBase' | 'paraLg' | 'paraXl' | 'overline' | 'quote' | 'sr' | 'internal_error' | 'navLink';

export type TextTypeValue = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'h7' | 'h8' | 'h9' | 'h10' | 'h11' | 'h12' | 'para1' | 'para2' | 'para3' | 'para4' | 'para5' | 'paraBase' | 'para6' | 'para7' | 'para8' | 'para9' | 'para10' | 'overline' | 'quote' | 'sr' | 'internal_error' | 'navLink';

export type TextTypeOptions = Record<TextTypeValue, string>;

// Text style options (same as TextTypeValue)
export type TextStyleValue = TextTypeValue;
export type TextStyleOptions = Record<TextStyleValue, string>;

// Text alignment options
export type TextAlignValue = 'left' | 'center' | 'right' | 'justify' | 'inherit';
export type TextAlignOptions = Record<TextAlignValue, string>;

export type TextColorOverwriteValues = '' | 'primary-50' | 'primary-100' | 'primary-200' | 'primary-300' | 'primary-400' | 'primary-500' | 'primary-600' | 'primary-700' | 'primary-800' | 'primary-900' | 'primary-950' | 'secondary-50' | 'secondary-100' | 'secondary-200' | 'secondary-300' | 'secondary-400' | 'secondary-500' | 'secondary-600' | 'secondary-700' | 'secondary-800' | 'secondary-900' | 'secondary-950' | 'redDark' | 'redMid' | 'redBase' | 'redLight' | 'redVeryLight' | 'black' | 'white' | 'none';

export type TextColorOverwriteOptions = Record<TextColorOverwriteValues, string>;

// Max width options (similar to SpacingKey)
export type TextMaxWidthValue = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20;
export type TextMaxWidthOptions = Record<TextMaxWidthValue, string>;

export type FontWeightSet = {
	[K in 0 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900]: string;
};
