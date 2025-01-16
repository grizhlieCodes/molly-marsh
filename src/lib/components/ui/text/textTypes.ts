export interface TextStoryblok {
	// Content?: any;
	content: string;
	text_id?: string;
	text_type: 'h1' | 'h2' | 'h3' | 'h4' | 'h6' | 'h7' | 'paraXs' | 'paraSm' | 'paraBase' | 'paraLg' | 'paraXl' | 'overline' | 'quote' | 'sr';
	// Styling?: any;
    custom_css?: string;
	text_style: 'h1' | 'h2' | 'h3' | 'h4' | 'h6' | 'h7' | 'paraXs' | 'paraSm' | 'paraBase' | 'paraLg' | 'paraXl' | 'overline' | 'quote' | 'sr' | 'internal_error';

	text_align: 'left' | 'center' | 'right' | 'inherit';
	text_color_overwrite?: '' | 'primaryDark' | 'primaryDefault' | 'primaryMedium' | 'primaryLight' | 'secondaryDark' | 'secondaryDefault' | 'secondaryMedium' | 'secondaryLight' | 'redDark' | 'redMid' | 'redLight' | 'black';
	rich_text?: RichtextStoryblok;

	max_width: {
		plugin: 'storyblok-slider';
		value: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20;
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
export type TextTypeValue = 'h1' | 'h2' | 'h3' | 'h4' | 'h6' | 'h7' | 'paraXs' | 'paraSm' | 'paraBase' | 'paraLg' | 'paraXl' | 'overline' | 'quote' | 'sr' | 'internal_error';
export type TextTypeOptions = Record<TextTypeValue, string>;

// Text style options (same as TextTypeValue)
export type TextStyleValue = TextTypeValue;
export type TextStyleOptions = Record<TextStyleValue, string>;

// Text alignment options
export type TextAlignValue = 'left' | 'center' | 'right' | 'justify' | 'inherit';
export type TextAlignOptions = Record<TextAlignValue, string>;

// Text color options
export type TextColorOverwriteValues = '' | 'primaryDark' | 'primaryDefault' | 'primaryMedium' | 'primaryLight' | 'secondaryDark' | 'secondaryDefault' | 'secondaryMedium' | 'secondaryLight' | 'redDark' | 'redMid' | 'redLight' | 'black';
export type TextColorOverwriteOptions = Record<TextColorOverwriteValues, string>;

// Max width options (similar to SpacingKey)
export type TextMaxWidthValue = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20;
export type TextMaxWidthOptions = Record<TextMaxWidthValue, string>;
