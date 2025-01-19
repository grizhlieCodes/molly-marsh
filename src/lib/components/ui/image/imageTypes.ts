import type * as sbType from '$lib/schemas/storyblok/sbTypes';

export interface ImageStoryblok {
	image?: AssetStoryblok;
	figcaption?: string;
	decorative_image?: boolean;
	// dimensions_and_display?: any;
	aspect_ratio: '1:1' | '1.59:1' | '3:2' | '4:3' | '2:3' | '3:4' | '16:9' | '9:16' | 'none';
	max_width: 'screen' | '100%' | '75%' | '50%' | '25%' | 'large' | 'medium' | 'normal' | 'small' | 'none';
	max_height: 'screen' | '100%' | '75%' | '50%' | '25%' | 'large' | 'medium' | 'normal' | 'small' | 'none';
	object_position: 'top' | 'bottom' | 'left' | 'right' | 'center' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom' | 'top20';
	mix_blendmode: 'normal' | 'multiply' | 'screen' | 'overlay' | 'darken' | 'lighten' | 'colorDodge' | 'colorBurn' | 'hardLight' | 'softLight' | 'difference' | 'exclusion' | 'hue' | 'saturation' | 'color' | 'luminosity';
	// data?: any;
	image_quality: 'original' | 'large' | 'medium' | 'small';
    min_height_unit: 'rem' | 'em' | 'px' | 'vh' | '%' | 'none';

    min_height: {
		plugin: 'storyblok-slider';
		value: number;
	};
	border_radius: {
		plugin: 'storyblok-slider';
		value: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
	};
	base_width: {
		plugin: 'storyblok-slider';
		value: 0 | 500 | 1000 | 1500 | 2000 | 2500 | 3000;
	};
	blur_filter: {
		plugin: 'storyblok-slider';
		value: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
	};
	sepia_filter: {
		plugin: 'storyblok-slider';
		value: 0 | 20 | 40 | 60 | 80 | 100;
	};
	invert_filter: {
		plugin: 'storyblok-slider';
		value: 0 | 20 | 40 | 60 | 80 | 100;
	};
	grayscale_filter: {
		plugin: 'storyblok-slider';
		value: 0 | 20 | 40 | 60 | 80 | 100;
	};
	saturate_filter: {
		plugin: 'storyblok-slider';
		value: 0 | 50 | 100 | 150 | 200;
	};
	contrast_filter: {
		plugin: 'storyblok-slider';
		value: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
	};

	_uid: string;
	component: 'image';
	[k: string]: any;
}

// Aspect Ratio Types
export type AspectRatioValue = '1:1' | '1.59:1' | '3:2' | '4:3' | '2:3' | '3:4' | '16:9' | '9:16' | '4:2' | 'none';
export type AspectRatioOptions = Record<AspectRatioValue, string>;

// Max Width Types
export type MaxWidthValue = 'screen' | '100%' | '75%' | '50%' | '25%' | 'large' | 'medium' | 'normal' | 'small' | 'none';
export type MaxWidthOptions = Record<MaxWidthValue, string>;

// Max Height Types
export type MaxHeightValue = 'screen' | '100%' | '75%' | '50%' | '25%' | 'large' | 'medium' | 'normal' | 'small' | 'none';
export type MaxHeightOptions = Record<MaxHeightValue, string>;

// Image Quality Types
export type ImageQualityValue = 'original' | 'large' | 'medium' | 'small';
export type ImageSizeConfig = {
	width: number;
	media: string;
};
export type ImageQualityOptions = Record<ImageQualityValue, ImageSizeConfig[]>;

// Object Position Types
export type ObjectPositionValue = 'left' | 'center' | 'right' | 'top' | 'bottom' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom' | 'top20';
export type ObjectPositionOptions = Record<ObjectPositionValue, string>;

// Mix Blend Mode Types
export type MixBlendModeValue = 'normal' | 'multiply' | 'screen' | 'overlay' | 'darken' | 'lighten' | 'colorDodge' | 'colorBurn' | 'hardLight' | 'softLight' | 'difference' | 'exclusion' | 'hue' | 'saturation' | 'color' | 'luminosity';
export type MixBlendModeOptions = Record<MixBlendModeValue, string>;

// Border Radius Types
export type BorderRadiusValue = '8' | '7' | '6' | '5' | '4' | '3' | '2' | '1' | '0';
export type BorderRadiusOptions = Record<BorderRadiusValue, string>;

// Blur Filter Types
export type BlurFilterValue = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7';
export type BlurFilterOptions = Record<BlurFilterValue, string>;

// Grayscale Filter (0-100%, steps of 20)
export type GrayscaleFilterValue = '0' | '20' | '40' | '60' | '80' | '100';
export type GrayscaleFilterOptions = Record<GrayscaleFilterValue, string>;

// Sepia Filter (0-100%, steps of 20)
export type SepiaFilterValue = '0' | '20' | '40' | '60' | '80' | '100';
export type SepiaFilterOptions = Record<SepiaFilterValue, string>;

// Invert Filter (0-100%, steps of 20)
export type InvertFilterValue = '0' | '20' | '40' | '60' | '80' | '100';
export type InvertFilterOptions = Record<InvertFilterValue, string>;

// Saturate Filter (using Tailwind's original values)
export type SaturateFilterValue = '0' | '50' | '100' | '150' | '200';
export type SaturateFilterOptions = Record<SaturateFilterValue, string>;

// Contrast Filter (using Tailwind's original values)
export type ContrastFilterValue = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7';
export type ContrastFilterOptions = Record<ContrastFilterValue, string>;
