import type * as Type from './containerTypes';
// LAYOUT
export const directionOptions: Type.DirectionOptions = {
	row: 'flex-col sm:flex-row',
	onlyRow: 'flex-row',
	column: 'flex-col',
	rowReversed: 'flex-row-reverse',
	columnReversed: 'flex-col-reverse'
};

export const justifyContentOptions: Type.JustifyContentOptions = {
	normal: 'justify-normal',
	start: 'justify-start',
	end: 'justify-end',
	center: 'justify-center',
	stretch: 'justify-stretch',
	between: 'justify-between',
	around: 'justify-around',
	evenly: 'justify-evenly'
};

export const alignItemsOptions: Type.AlignItemsOptions = {
	start: 'items-start',
	end: 'items-end',
	center: 'items-center',
	baseline: 'items-baseline',
	stretch: 'items-stretch'
};

export const wrapOptions: Type.WrapOptions = {
	wrap: 'flex-wrap',
	noWrap: 'flex-nowrap'
};

export const gapOptions: Type.SpacingOptions = {
	'20': 'gap-60 md:gap-60 lg:gap-60', // 240px -> 240px -> 240px
	'19': 'gap-56 md:gap-58 lg:gap-60', // 224px -> 232px -> 240px
	'18': 'gap-52 md:gap-54 lg:gap-56', // 208px -> 216px -> 224px
	'17': 'gap-48 md:gap-50 lg:gap-52', // 192px -> 200px -> 208px
	'16': 'gap-44 md:gap-46 lg:gap-48', // 176px -> 184px -> 192px
	'15': 'gap-40 md:gap-42 lg:gap-44', // 160px -> 168px -> 176px
	'14': 'gap-36 md:gap-38 lg:gap-40', // 144px -> 152px -> 160px
	'13': 'gap-32 md:gap-34 lg:gap-36', // 128px -> 136px -> 144px
	'12': 'gap-28 md:gap-30 lg:gap-32', // 112px -> 120px -> 128px
	'11': 'gap-24 md:gap-26 lg:gap-28', // 96px -> 104px -> 112px
	'10': 'gap-20 md:gap-22 lg:gap-24', // 80px -> 88px -> 96px
	'9': 'gap-16 md:gap-18 lg:gap-20', // 64px -> 72px -> 80px
	'8': 'gap-14 md:gap-16 lg:gap-18', // 56px -> 64px -> 72px
	'7': 'gap-12 md:gap-14 lg:gap-16', // 48px -> 56px -> 64px
	'6': 'gap-10 md:gap-12 lg:gap-14', // 40px -> 48px -> 56px
	'5': 'gap-8 md:gap-10 lg:gap-12', // 32px -> 40px -> 48px
	'4': 'gap-6 md:gap-8 lg:gap-10', // 24px -> 32px -> 40px
	'3': 'gap-4 md:gap-6 lg:gap-8', // 16px -> 24px -> 32px
	'2': 'gap-3 md:gap-4 lg:gap-6', // 12px -> 16px -> 24px
	'1': 'gap-2 md:gap-3 lg:gap-4', // 8px -> 12px -> 16px
	'0': 'gap-0' // 0px -> 0px -> 0px
};

// CHILD_LAYOUT
export const flexOptions: Type.FlexOptions = {
	default: 'flex-1', // flex: 1 1 0%;
	flexAuto: 'flex-auto', // flex: 1 1 auto;
	flexInitial: 'flex-initial', // flex: 0 1 auto;
	flexNone: 'flex-none' // flex: none;
};

export const alignSelfOptions: Type.AlignSelfOptions = {
	selfAuto: 'self-auto',
	selfStart: 'self-Start',
	selfEnd: 'self-end',
	selfCenter: 'self-center',
	selfStretch: 'self-stretch',
	selfBaseline: 'self-baseline'
};

// EXTERNAL_SPACING
export const marginTopOptions: Type.SpacingOptions = {
	'20': 'mt-72 md:mt-72 lg:mt-72', // 288px -> 288px -> 288px
	'19': 'mt-64 md:mt-68 lg:mt-72', // 256px -> 272px -> 288px
	'18': 'mt-60 md:mt-64 lg:mt-68', // 240px -> 256px -> 272px
	'17': 'mt-56 md:mt-60 lg:mt-64', // 224px -> 240px -> 256px
	'16': 'mt-52 md:mt-56 lg:mt-60', // 208px -> 224px -> 240px
	'15': 'mt-48 md:mt-52 lg:mt-56', // 192px -> 208px -> 224px
	'14': 'mt-44 md:mt-48 lg:mt-52', // 176px -> 192px -> 208px
	'13': 'mt-40 md:mt-44 lg:mt-48', // 160px -> 176px -> 192px
	'12': 'mt-36 md:mt-40 lg:mt-44', // 144px -> 160px -> 176px
	'11': 'mt-32 md:mt-36 lg:mt-40', // 128px -> 144px -> 160px
	'10': 'mt-28 md:mt-32 lg:mt-36', // 112px -> 128px -> 144px
	'9': 'mt-24 md:mt-28 lg:mt-32', // 96px -> 112px -> 128px
	'8': 'mt-20 md:mt-24 lg:mt-28', // 80px -> 96px -> 112px
	'7': 'mt-16 md:mt-20 lg:mt-24', // 64px -> 80px -> 96px
	'6': 'mt-14 md:mt-16 lg:mt-20', // 56px -> 64px -> 80px
	'5': 'mt-12 md:mt-14 lg:mt-16', // 48px -> 56px -> 64px
	'4': 'mt-10 md:mt-12 lg:mt-14', // 40px -> 48px -> 56px
	'3': 'mt-8 md:mt-10 lg:mt-12', // 32px -> 40px -> 48px
	'2': 'mt-6 md:mt-8 lg:mt-10', // 24px -> 32px -> 40px
	'1': 'mt-4 md:mt-6 lg:mt-8', // 16px -> 24px -> 32px
	'0': '' // 0px -> 0px -> 0px
};

export const marginBottomOptions: Type.SpacingOptions = {
	'20': 'mb-72 md:mb-72 lg:mb-72', // 288px -> 288px -> 288px
	'19': 'mb-64 md:mb-68 lg:mb-72', // 256px -> 272px -> 288px
	'18': 'mb-60 md:mb-64 lg:mb-68', // 240px -> 256px -> 272px
	'17': 'mb-56 md:mb-60 lg:mb-64', // 224px -> 240px -> 256px
	'16': 'mb-52 md:mb-56 lg:mb-60', // 208px -> 224px -> 240px
	'15': 'mb-48 md:mb-52 lg:mb-56', // 192px -> 208px -> 224px
	'14': 'mb-44 md:mb-48 lg:mb-52', // 176px -> 192px -> 208px
	'13': 'mb-40 md:mb-44 lg:mb-48', // 160px -> 176px -> 192px
	'12': 'mb-36 md:mb-40 lg:mb-44', // 144px -> 160px -> 176px
	'11': 'mb-32 md:mb-36 lg:mb-40', // 128px -> 144px -> 160px
	'10': 'mb-28 md:mb-32 lg:mb-36', // 112px -> 128px -> 144px
	'9': 'mb-24 md:mb-28 lg:mb-32', // 96px -> 112px -> 128px
	'8': 'mb-20 md:mb-24 lg:mb-28', // 80px -> 96px -> 112px
	'7': 'mb-16 md:mb-20 lg:mb-24', // 64px -> 80px -> 96px
	'6': 'mb-14 md:mb-16 lg:mb-20', // 56px -> 64px -> 80px
	'5': 'mb-12 md:mb-14 lg:mb-16', // 48px -> 56px -> 64px
	'4': 'mb-10 md:mb-12 lg:mb-14', // 40px -> 48px -> 56px
	'3': 'mb-8 md:mb-10 lg:mb-12', // 32px -> 40px -> 48px
	'2': 'mb-6 md:mb-8 lg:mb-10', // 24px -> 32px -> 40px
	'1': 'mb-4 md:mb-6 lg:mb-8', // 16px -> 24px -> 32px
	'0': '' // 0px -> 0px -> 0px
};

// DIMENSIONS
// Max width
export const maxWidthOptions: Type.SpacingOptions = {
	'20': 'max-w-max',
	'19': 'w-full max-w-5xl md:max-w-6xl lg:max-w-7xl', // 1024px -> 1152px -> 1280px
	'18': 'w-full max-w-4xl md:max-w-5xl lg:max-w-6xl', // 896px -> 1024px -> 1152px
	'17': 'w-full max-w-3xl md:max-w-4xl lg:max-w-5xl', // 768px -> 896px -> 1024px
	'16': 'w-full max-w-2xl md:max-w-3xl lg:max-w-4xl', // 672px -> 768px -> 896px
	'15': 'w-full max-w-xl md:max-w-2xl lg:max-w-3xl', // 576px -> 672px -> 768px
	'14': 'w-full max-w-lg md:max-w-xl lg:max-w-2xl', // 512px -> 576px -> 672px
	'13': 'w-full max-w-md md:max-w-lg lg:max-w-xl', // 448px -> 512px -> 576px
	'12': 'w-full max-w-96 md:max-w-md lg:max-w-96', // 384px -> 448px -> 384px
	'11': 'w-full max-w-88 md:max-w-92 lg:max-w-88', // 352px -> 368px -> 352px
	'10': 'w-full max-w-80 md:max-w-84 lg:max-w-80', // 320px -> 336px -> 320px
	'9': 'w-full max-w-64 md:max-w-72 lg:max-w-64', // 256px -> 288px -> 256px
	'8': 'w-full max-w-56 md:max-w-60 lg:max-w-56', // 224px -> 240px -> 224px
	'7': 'w-full max-w-48 md:max-w-52 lg:max-w-48', // 192px -> 208px -> 192px
	'6': 'w-full max-w-40 md:max-w-44 lg:max-w-40', // 160px -> 176px -> 160px
	'5': 'w-full max-w-32 md:max-w-36 lg:max-w-32', // 128px -> 144px -> 128px
	'4': 'w-full max-w-24 md:max-w-28 lg:max-w-24', // 96px -> 112px -> 96px
	'3': 'w-full max-w-16 md:max-w-20 lg:max-w-16', // 64px -> 80px -> 64px
	'2': 'w-full max-w-8 md:max-w-12 lg:max-w-8', // 32px -> 48px -> 32px
	'1': 'w-full max-w-4 md:max-w-6 lg:max-w-4', // 16px -> 24px -> 16px
	'0': 'w-full'
};

// export const maxWidthOptionsSimpleVer: Type.SpacingOptions = {
//     20: 'max-w-max',
//     19: 'w-full max-w-7xl', // 1280px
//     18: 'w-full max-w-6xl', // 1152px
//     17: 'w-full max-w-5xl', // 1024px
//     16: 'w-full max-w-4xl', // 896px
//     15: 'w-full max-w-3xl', // 768px
//     14: 'w-full max-w-2xl', // 672px
//     13: 'w-full max-w-xl',  // 576px
//     12: 'w-full max-w-96',  // 384px
//     11: 'w-full max-w-88',  // 352px
//     10: 'w-full max-w-80',  // 320px
//     9: 'w-full max-w-64',   // 256px
//     8: 'w-full max-w-56',   // 224px
//     7: 'w-full max-w-48',   // 192px
//     6: 'w-full max-w-40',   // 160px
//     5: 'w-full max-w-32',   // 128px
//     4: 'w-full max-w-24',   // 96px
//     3: 'w-full max-w-16',   // 64px
//     2: 'w-full max-w-8',    // 32px
//     1: 'w-full max-w-4',    // 16px
//     0: 'w-full'
//   };

export const heightOptions: Type.HeightOptions = {
	full: 'h-full',
	max: 'h-max',
	unset: ''
};

// PADDING
export const paddingOptions: Type.SpacingOptions = {
	'20': 'p-72 md:p-72 lg:p-72', // 288px -> 288px -> 288px
	'19': 'p-64 md:p-68 lg:p-72', // 256px -> 272px -> 288px
	'18': 'p-60 md:p-64 lg:p-68', // 240px -> 256px -> 272px
	'17': 'p-56 md:p-60 lg:p-64', // 224px -> 240px -> 256px
	'16': 'p-52 md:p-56 lg:p-60', // 208px -> 224px -> 240px
	'15': 'p-48 md:p-52 lg:p-56', // 192px -> 208px -> 224px
	'14': 'p-44 md:p-48 lg:p-52', // 176px -> 192px -> 208px
	'13': 'p-40 md:p-44 lg:p-48', // 160px -> 176px -> 192px
	'12': 'p-36 md:p-40 lg:p-44', // 144px -> 160px -> 176px
	'11': 'p-32 md:p-36 lg:p-40', // 128px -> 144px -> 160px
	'10': 'p-28 md:p-32 lg:p-36', // 112px -> 128px -> 144px
	'9': 'p-24 md:p-28 lg:p-32', // 96px -> 112px -> 128px
	'8': 'p-20 md:p-24 lg:p-28', // 80px -> 96px -> 112px
	'7': 'p-16 md:p-20 lg:p-24', // 64px -> 80px -> 96px
	'6': 'p-14 md:p-16 lg:p-20', // 56px -> 64px -> 80px
	'5': 'p-12 md:p-14 lg:p-16', // 48px -> 56px -> 64px
	'4': 'p-10 md:p-12 lg:p-14', // 40px -> 48px -> 56px
	'3': 'p-8 md:p-10 lg:p-12', // 32px -> 40px -> 48px
	'2': 'p-6 md:p-8 lg:p-10', // 24px -> 32px -> 40px
	'1': 'p-4 md:p-6 lg:p-8', // 16px -> 24px -> 32px
	'0': '' // 0px -> 0px -> 0px
};

export const yPaddingOptions: Type.SpacingOptions = {
	'20': 'py-72 md:py-72 lg:py-72', // 288px -> 288px -> 288px
	'19': 'py-64 md:py-68 lg:py-72', // 256px -> 272px -> 288px
	'18': 'py-60 md:py-64 lg:py-68', // 240px -> 256px -> 272px
	'17': 'py-56 md:py-60 lg:py-64', // 224px -> 240px -> 256px
	'16': 'py-52 md:py-56 lg:py-60', // 208px -> 224px -> 240px
	'15': 'py-48 md:py-52 lg:py-56', // 192px -> 208px -> 224px
	'14': 'py-44 md:py-48 lg:py-52', // 176px -> 192px -> 208px
	'13': 'py-40 md:py-44 lg:py-48', // 160px -> 176px -> 192px
	'12': 'py-36 md:py-40 lg:py-44', // 144px -> 160px -> 176px
	'11': 'py-32 md:py-36 lg:py-40', // 128px -> 144px -> 160px
	'10': 'py-28 md:py-32 lg:py-36', // 112px -> 128px -> 144px
	'9': 'py-24 md:py-28 lg:py-32', // 96px -> 112px -> 128px
	'8': 'py-20 md:py-24 lg:py-28', // 80px -> 96px -> 112px
	'7': 'py-16 md:py-20 lg:py-24', // 64px -> 80px -> 96px
	'6': 'py-14 md:py-16 lg:py-20', // 56px -> 64px -> 80px
	'5': 'py-12 md:py-14 lg:py-16', // 48px -> 56px -> 64px
	'4': 'py-10 md:py-12 lg:py-14', // 40px -> 48px -> 56px
	'3': 'py-8 md:py-10 lg:py-12', // 32px -> 40px -> 48px
	'2': 'py-6 md:py-8 lg:py-10', // 24px -> 32px -> 40px
	'1': 'py-4 md:py-6 lg:py-8', // 16px -> 24px -> 32px
	'0': '' // 0px -> 0px -> 0px
};

export const xPaddingOptions: Type.SpacingOptions = {
	'20': 'px-72 md:px-72 lg:px-72 xl:px-0', // 288px -> 288px -> 288px -> 0px
	'19': 'px-64 md:px-68 lg:px-72 xl:px-0', // 256px -> 272px -> 288px -> 0px
	'18': 'px-60 md:px-64 lg:px-68 xl:px-0', // 240px -> 256px -> 272px -> 0px
	'17': 'px-56 md:px-60 lg:px-64 xl:px-0', // 224px -> 240px -> 256px -> 0px
	'16': 'px-52 md:px-56 lg:px-60 xl:px-0', // 208px -> 224px -> 240px -> 0px
	'15': 'px-48 md:px-52 lg:px-56 xl:px-0', // 192px -> 208px -> 224px -> 0px
	'14': 'px-44 md:px-48 lg:px-52 xl:px-0', // 176px -> 192px -> 208px -> 0px
	'13': 'px-40 md:px-44 lg:px-48 xl:px-0', // 160px -> 176px -> 192px -> 0px
	'12': 'px-36 md:px-40 lg:px-44 xl:px-0', // 144px -> 160px -> 176px -> 0px
	'11': 'px-32 md:px-36 lg:px-40 xl:px-0', // 128px -> 144px -> 160px -> 0px
	'10': 'px-28 md:px-32 lg:px-36 xl:px-0', // 112px -> 128px -> 144px -> 0px
	'9': 'px-24 md:px-28 lg:px-32 xl:px-0', // 96px -> 112px -> 128px -> 0px
	'8': 'px-20 md:px-24 lg:px-28 xl:px-0', // 80px -> 96px -> 112px -> 0px
	'7': 'px-16 md:px-20 lg:px-24 xl:px-0', // 64px -> 80px -> 96px -> 0px
	'6': 'px-14 md:px-16 lg:px-20 xl:px-0', // 56px -> 64px -> 80px -> 0px
	'5': 'px-12 md:px-14 lg:px-16 xl:px-0', // 48px -> 56px -> 64px -> 0px
	'4': 'px-10 md:px-12 lg:px-14 xl:px-0', // 40px -> 48px -> 56px -> 0px
	'3': 'px-8 md:px-10 lg:px-12 xl:px-0', // 32px -> 40px -> 48px -> 0px
	'2': 'px-6 md:px-8 lg:px-10 xl:px-0', // 24px -> 32px -> 40px -> 0px
	'1': 'px-4 md:px-6 lg:px-8 xl:px-0', // 16px -> 24px -> 32px -> 0px
	'0': '' // 0px -> 0px -> 0px -> 0px
};

// DIMENSION_OVERWRITES
// All custom code in the component

// STYLING

export const backgroundOptions: Type.BackgroundOptions = {
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
	'primary-950': 'bg-surface-primary-950'
};

export const overflowOptions: Type.OverflowOptions = {
	hidden: 'overflow-hidden',
	scroll: 'overflow-scroll',
	auto: 'overflow-auto',
	visible: 'overflow-visible'
};

export const borderRadiusOptions: Type.BorderRadiusOptions = {
	'0': 'rounded-none', // No border radius
	'1': 'rounded-sm', // Small border radius
	'2': 'rounded', // Default border radius
	'3': 'rounded-md', // Medium border radius
	'4': 'rounded-lg', // Large border radius
	'5': 'rounded-xl', // Extra large border radius
	'6': 'rounded-2xl', // 2x extra large border radius
	'7': 'rounded-3xl', // 3x extra large border radius
	'8': 'rounded-full' // Fully rounded (creates circles for square elements)
};

// Custom styling is a custom inline style addition.

// Options
// directionOptions
// justifyContentOptions
// alignItemsOptions
// wrapOptions
// gapOptions
// flexOptions
// alignSelfOptions
// marginTopOptions
// marginBottomOptions
// maxWidthOptions
// heightOptions
// yPaddingOptions
// yPaddingOptions
// yPaddingOptions
// xPaddingOptions
// backgroundOptions
// overflowOptions

// Custom code in container file
// blocks
// container_id
// container_class
// min_width
// min_width_unit
// min_height
// min_height_unit
// customStyling
