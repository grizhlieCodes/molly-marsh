import type * as Type from './sectionTypes';

export const gridSpanOptions: Type.GridSpanOptions = {
	centeredSpan1: 'max-w-[50rem]',
	centeredSpan2: 'max-w-[60rem]',
	centeredSpan3: 'max-w-[70rem]',
	centeredSpan4: 'max-w-[80rem]',
	centeredSpan5: 'max-w-[90rem]',
	centeredSpan6: 'max-w-[100rem]',
	fullSpan: 'max-w-none'
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

export const yPaddingOptions: Type.YPaddingOptions = {
	'20': 'py-36 md:py-48 lg:py-60', // 144px -> 192px -> 240px
	'19': 'py-34 md:py-46 lg:py-58', // 136px -> 184px -> 232px
	'18': 'py-32 md:py-44 lg:py-56', // 128px -> 176px -> 224px
	'17': 'py-30 md:py-42 lg:py-54', // 120px -> 168px -> 216px
	'16': 'py-28 md:py-40 lg:py-52', // 112px -> 160px -> 208px
	'15': 'py-26 md:py-38 lg:py-48', // 104px -> 152px -> 192px
	'14': 'py-24 md:py-36 lg:py-44', // 96px -> 144px -> 176px
	'13': 'py-22 md:py-32 lg:py-40', // 88px -> 128px -> 160px
	'12': 'py-20 md:py-28 lg:py-36', // 80px -> 112px -> 144px
	'11': 'py-18 md:py-24 lg:py-32', // 72px -> 96px -> 128px
	'10': 'py-16 md:py-20 lg:py-28', // 64px -> 80px -> 112px
	'9': 'py-14 md:py-18 lg:py-24', // 56px -> 72px -> 96px
	'8': 'py-12 md:py-16 lg:py-20', // 48px -> 64px -> 80px
	'7': 'py-10 md:py-14 lg:py-16', // 40px -> 56px -> 64px
	'6': 'py-8 md:py-12 lg:py-14', // 32px -> 48px -> 56px
	'5': 'py-6 md:py-10 lg:py-12', // 24px -> 40px -> 48px
	'4': 'py-7 md:py-10 lg:py-12', // 28px -> 40px -> 48px
	'3': 'py-5 md:py-7 lg:py-9', // 20px -> 28px -> 36px
	'2': 'py-3 md:py-5 lg:py-7', // 12px -> 20px -> 28px
	'1': 'py-1 md:py-3 lg:py-5', // 4px -> 12px -> 20px
	'0': '' // 0px -> 0px -> 0px
};

export const xPaddingOptions: Type.XPaddingOptions = {
	'20': 'px-36 md:px-48 lg:px-60 xl:px-0', // 144px -> 192px -> 240px -> 0px
	'19': 'px-34 md:px-46 lg:px-58 xl:px-0', // 136px -> 184px -> 232px -> 0px
	'18': 'px-32 md:px-44 lg:px-56 xl:px-0', // 128px -> 176px -> 224px -> 0px
	'17': 'px-30 md:px-42 lg:px-54 xl:px-0', // 120px -> 168px -> 216px -> 0px
	'16': 'px-28 md:px-40 lg:px-52 xl:px-0', // 112px -> 160px -> 208px -> 0px
	'15': 'px-26 md:px-38 lg:px-48 xl:px-0', // 104px -> 152px -> 192px -> 0px
	'14': 'px-24 md:px-36 lg:px-44 xl:px-0', // 96px -> 144px -> 176px -> 0px
	'13': 'px-22 md:px-32 lg:px-40 xl:px-0', // 88px -> 128px -> 160px -> 0px
	'12': 'px-20 md:px-28 lg:px-36 xl:px-0', // 80px -> 112px -> 144px -> 0px
	'11': 'px-18 md:px-24 lg:px-32 xl:px-0', // 72px -> 96px -> 128px -> 0px
	'10': 'px-16 md:px-20 lg:px-28 xl:px-0', // 64px -> 80px -> 112px -> 0px
	'9': 'px-14 md:px-18 lg:px-24 xl:px-0', // 56px -> 72px -> 96px -> 0px
	'8': 'px-12 md:px-16 lg:px-20 xl:px-0', // 48px -> 64px -> 80px -> 0px
	'7': 'px-10 md:px-14 lg:px-16 xl:px-0', // 40px -> 56px -> 64px -> 0px
	'6': 'px-8 md:px-12 lg:px-14 xl:px-0', // 32px -> 48px -> 56px -> 0px
	'5': 'px-6 md:px-10 lg:px-12 xl:px-0', // 24px -> 40px -> 48px -> 0px
	'4': 'px-7 md:px-10 lg:px-12 xl:px-0', // 28px -> 40px -> 48px -> 0px
	'3': 'px-5 md:px-7 lg:px-9 xl:px-0', // 20px -> 28px -> 36px -> 0px
	'2': 'px-3 md:px-5 lg:px-7 xl:px-0', // 12px -> 20px -> 28px -> 0px
	'1': 'px-1 md:px-3 lg:px-5 xl:px-0', // 4px -> 12px -> 20px -> 0px
	'0': '' // 0px -> 0px -> 0px -> 0px
};

export const gapOptions: Type.GapOptions = {
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

export const overflowOptions: Type.OverflowOptions = {
	hidden: 'overflow-hidden',
	scroll: 'overflow-scroll',
	auto: 'overflow-auto',
	visible: 'overflow-visible'
};

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
// export {
// 	gridSpanOptions
// 	justifyContentOptions
// 	alignItemsOptions
// 	yPaddingOptions
// 	xPaddingOptions
// 	gapOptions
// 	overflowOptions
// 	backgroundOptions
// } as containerOptions
