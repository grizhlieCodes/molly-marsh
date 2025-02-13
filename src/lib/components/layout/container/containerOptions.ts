import type * as Type from './containerTypes';

// STATIC OPTIONS --- STATIC OPTIONS --- STATIC OPTIONS --- STATIC OPTIONS --- STATIC OPTIONS --- STATIC OPTIONS --- STATIC OPTIONS --- STATIC OPTIONS --- STATIC OPTIONS --- STATIC OPTIONS --- STATIC OPTIONS --- STATIC OPTIONS --- STATIC OPTIONS --- STATIC OPT
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
	'primary-950': 'bg-surface-primary-950',
	'secondary-50': 'bg-surface-secondary-50',
	'secondary-100': 'bg-surface-secondary-100',
	'secondary-200': 'bg-surface-secondary-200',
	'secondary-300': 'bg-surface-secondary-300',
	'secondary-400': 'bg-surface-secondary-400',
	'secondary-500': 'bg-surface-secondary-500',
	'secondary-600': 'bg-surface-secondary-600',
	'secondary-700': 'bg-surface-secondary-700',
	'secondary-800': 'bg-surface-secondary-800',
	'secondary-900': 'bg-surface-secondary-900',
	'secondary-950': 'bg-surface-secondary-950'
};
export const borderColorOptions: Type.BorderOptions = {
	none: 'border-surface-none',
	'primary-50': 'border-surface-primary-50',
	'primary-100': 'border-surface-primary-100',
	'primary-200': 'border-surface-primary-200',
	'primary-300': 'border-surface-primary-300',
	'primary-400': 'border-surface-primary-400',
	'primary-500': 'border-surface-primary-500',
	'primary-600': 'border-surface-primary-600',
	'primary-700': 'border-surface-primary-700',
	'primary-800': 'border-surface-primary-800',
	'primary-900': 'border-surface-primary-900',
	'primary-950': 'border-surface-primary-950',
	'secondary-50': 'border-surface-secondary-50',
	'secondary-100': 'border-surface-secondary-100',
	'secondary-200': 'border-surface-secondary-200',
	'secondary-300': 'border-surface-secondary-300',
	'secondary-400': 'border-surface-secondary-400',
	'secondary-500': 'border-surface-secondary-500',
	'secondary-600': 'border-surface-secondary-600',
	'secondary-700': 'border-surface-secondary-700',
	'secondary-800': 'border-surface-secondary-800',
	'secondary-900': 'border-surface-secondary-900',
	'secondary-950': 'border-surface-secondary-950'
};

export const borderThicknessOptions: Type.BorderThicknessOptions = {
	0: 'border-0',
	1: 'border',
	2: 'border-2',
	3: 'border-4',
	4: 'border-8'
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

// BREAKPOINT OPTIONS --- BREAKPOINT OPTIONS --- BREAKPOINT OPTIONS --- BREAKPOINT OPTIONS --- BREAKPOINT OPTIONS --- BREAKPOINT OPTIONS --- BREAKPOINT OPTIONS --- BREAKPOINT OPTIONS --- BREAKPOINT OPTIONS --- BREAKPOINT OPTIONS --- BREAKPOINT OPTIONS ---

export const displayOptions: Type.DisplayOptions = {
	def: { flex: 'flex', hidden: 'hidden', block: 'block', none: '' },
	mm: { flex: 'mm:flex', hidden: 'mm:hidden', block: 'mm:block', none: '' },
	lm: { flex: 'lm:flex', hidden: 'lm:hidden', block: 'lm:block', none: '' },
	md: { flex: 'md:flex', hidden: 'md:hidden', block: 'md:block', none: '' },
	lg: { flex: 'lg:flex', hidden: 'lg:hidden', block: 'lg:block', none: '' }
};

export const directionOptions: Type.DirectionOptions = {
	def: { row: 'flex-row', rowReversed: 'flex-row-reverse', column: 'flex-col', columnReversed: 'flex-col-reverse', hidden: 'hidden', none: '' },
	mm: { row: 'mm:flex-row', rowReversed: 'mm:flex-row-reverse', column: 'mm:flex-col', columnReversed: 'mm:flex-col-reverse', hidden: 'mm:hidden', none: '' },
	lm: { row: 'lm:flex-row', rowReversed: 'lm:flex-row-reverse', column: 'lm:flex-col', columnReversed: 'lm:flex-col-reverse', hidden: 'lm:hidden', none: '' },
	md: { row: 'md:flex-row', rowReversed: 'md:flex-row-reverse', column: 'md:flex-col', columnReversed: 'md:flex-col-reverse', hidden: 'md:hidden', none: '' },
	lg: { row: 'lg:flex-row', rowReversed: 'lg:flex-row-reverse', column: 'lg:flex-col', columnReversed: 'lg:flex-col-reverse', hidden: 'lg:hidden', none: '' }
};

export const justifyContentOptions: Type.JustifyOptions = {
	def: { normal: 'justify-normal', start: 'justify-start', end: 'justify-end', center: 'justify-center', stretch: 'justify-stretch', between: 'justify-between', around: 'justify-around', evenly: 'justify-evenly', none: '' },
	mm: { normal: 'mm:justify-normal', start: 'mm:justify-start', end: 'mm:justify-end', center: 'mm:justify-center', stretch: 'mm:justify-stretch', between: 'mm:justify-between', around: 'mm:justify-around', evenly: 'mm:justify-evenly', none: '' },
	lm: { normal: 'lm:justify-normal', start: 'lm:justify-start', end: 'lm:justify-end', center: 'lm:justify-center', stretch: 'lm:justify-stretch', between: 'lm:justify-between', around: 'lm:justify-around', evenly: 'lm:justify-evenly', none: '' },
	md: { normal: 'md:justify-normal', start: 'md:justify-start', end: 'md:justify-end', center: 'md:justify-center', stretch: 'md:justify-stretch', between: 'md:justify-between', around: 'md:justify-around', evenly: 'md:justify-evenly', none: '' },
	lg: { normal: 'lg:justify-normal', start: 'lg:justify-start', end: 'lg:justify-end', center: 'lg:justify-center', stretch: 'lg:justify-stretch', between: 'lg:justify-between', around: 'lg:justify-around', evenly: 'lg:justify-evenly', none: '' }
};

export const alignItemsOptions: Type.AlignItemsOptions = {
	def: { start: 'items-start', end: 'items-end', center: 'items-center', baseline: 'items-baseline', stretch: 'items-stretch', none: '' },
	mm: { start: 'mm:items-start', end: 'mm:items-end', center: 'mm:items-center', baseline: 'mm:items-baseline', stretch: 'mm:items-stretch', none: '' },
	lm: { start: 'lm:items-start', end: 'lm:items-end', center: 'lm:items-center', baseline: 'lm:items-baseline', stretch: 'lm:items-stretch', none: '' },
	md: { start: 'md:items-start', end: 'md:items-end', center: 'md:items-center', baseline: 'md:items-baseline', stretch: 'md:items-stretch', none: '' },
	lg: { start: 'lg:items-start', end: 'lg:items-end', center: 'lg:items-center', baseline: 'lg:items-baseline', stretch: 'lg:items-stretch', none: '' }
};

export const wrapOptions: Type.WrapOptions = {
	def: { wrap: 'flex-wrap', noWrap: 'flex-nowrap', none: '' },
	mm: { wrap: 'mm:flex-wrap', noWrap: 'mm:flex-nowrap', none: '' },
	lm: { wrap: 'lm:flex-wrap', noWrap: 'lm:flex-nowrap', none: '' },
	md: { wrap: 'md:flex-wrap', noWrap: 'md:flex-nowrap', none: '' },
	lg: { wrap: 'lg:flex-wrap', noWrap: 'lg:flex-nowrap', none: '' }
};

export const gapOptions: Type.SpacingOptionsWithNegativeValue = {
	def: { '20': 'gap-60', '19': 'gap-56', '18': 'gap-52', '17': 'gap-48', '16': 'gap-44', '15': 'gap-40', '14': 'gap-36', '13': 'gap-32', '12': 'gap-28', '11': 'gap-24', '10': 'gap-20', '9': 'gap-16', '8': 'gap-14', '7': 'gap-12', '6': 'gap-10', '5': 'gap-8 ', '4': 'gap-6 ', '3': 'gap-4 ', '2': 'gap-3 ', '1': 'gap-2 ', '0': 'gap-0', '-1': '' },
	mm: { '20': 'mm:gap-60', '19': 'mm:gap-56', '18': 'mm:gap-52', '17': 'mm:gap-48', '16': 'mm:gap-44', '15': 'mm:gap-40', '14': 'mm:gap-36', '13': 'mm:gap-32', '12': 'mm:gap-28', '11': 'mm:gap-24', '10': 'mm:gap-20', '9': 'mm:gap-16', '8': 'mm:gap-14', '7': 'mm:gap-12', '6': 'mm:gap-10', '5': 'mm:gap-8 ', '4': 'mm:gap-6 ', '3': 'mm:gap-4 ', '2': 'mm:gap-3 ', '1': 'mm:gap-2 ', '0': 'mm:gap-0', '-1': '' },
	lm: { '20': 'lm:gap-60', '19': 'lm:gap-56', '18': 'lm:gap-52', '17': 'lm:gap-48', '16': 'lm:gap-44', '15': 'lm:gap-40', '14': 'lm:gap-36', '13': 'lm:gap-32', '12': 'lm:gap-28', '11': 'lm:gap-24', '10': 'lm:gap-20', '9': 'lm:gap-16', '8': 'lm:gap-14', '7': 'lm:gap-12', '6': 'lm:gap-10', '5': 'lm:gap-8 ', '4': 'lm:gap-6 ', '3': 'lm:gap-4 ', '2': 'lm:gap-3 ', '1': 'lm:gap-2 ', '0': 'lm:gap-0', '-1': '' },
	md: { '20': 'md:gap-60', '19': 'md:gap-56', '18': 'md:gap-52', '17': 'md:gap-48', '16': 'md:gap-44', '15': 'md:gap-40', '14': 'md:gap-36', '13': 'md:gap-32', '12': 'md:gap-28', '11': 'md:gap-24', '10': 'md:gap-20', '9': 'md:gap-16', '8': 'md:gap-14', '7': 'md:gap-12', '6': 'md:gap-10', '5': 'md:gap-8 ', '4': 'md:gap-6 ', '3': 'md:gap-4 ', '2': 'md:gap-3 ', '1': 'md:gap-2 ', '0': 'md:gap-0', '-1': '' },
	lg: { '20': 'lg:gap-60', '19': 'lg:gap-56', '18': 'lg:gap-52', '17': 'lg:gap-48', '16': 'lg:gap-44', '15': 'lg:gap-40', '14': 'lg:gap-36', '13': 'lg:gap-32', '12': 'lg:gap-28', '11': 'lg:gap-24', '10': 'lg:gap-20', '9': 'lg:gap-16', '8': 'lg:gap-14', '7': 'lg:gap-12', '6': 'lg:gap-10', '5': 'lg:gap-8 ', '4': 'lg:gap-6 ', '3': 'lg:gap-4 ', '2': 'lg:gap-3 ', '1': 'lg:gap-2 ', '0': 'lg:gap-0', '-1': '' }
};

export const flexOptions: Type.FlexOptions = {
	def: { default: 'flex-1', flexAuto: 'flex-auto', flexInitial: 'flex-initial', flexNone: 'flex-none', none: '' },
	mm: { default: 'mm:flex-1', flexAuto: 'mm:flex-auto', flexInitial: 'mm:flex-initial', flexNone: 'mm:flex-none', none: '' },
	lm: { default: 'lm:flex-1', flexAuto: 'lm:flex-auto', flexInitial: 'lm:flex-initial', flexNone: 'lm:flex-none', none: '' },
	md: { default: 'md:flex-1', flexAuto: 'md:flex-auto', flexInitial: 'md:flex-initial', flexNone: 'md:flex-none', none: '' },
	lg: { default: 'lg:flex-1', flexAuto: 'lg:flex-auto', flexInitial: 'lg:flex-initial', flexNone: 'lg:flex-none', none: '' }
};

export const alignSelfOptions: Type.AlignSelfOptions = {
	def: { selfAuto: 'self-auto', selfStart: 'self-Start', selfEnd: 'self-end', selfCenter: 'self-center', selfStretch: 'self-stretch', selfBaseline: 'self-baseline', none: '' },
	mm: { selfAuto: 'mm:self-auto', selfStart: 'mm:self-Start', selfEnd: 'mm:self-end', selfCenter: 'mm:self-center', selfStretch: 'mm:self-stretch', selfBaseline: 'mm:self-baseline', none: '' },
	lm: { selfAuto: 'lm:self-auto', selfStart: 'lm:self-Start', selfEnd: 'lm:self-end', selfCenter: 'lm:self-center', selfStretch: 'lm:self-stretch', selfBaseline: 'lm:self-baseline', none: '' },
	md: { selfAuto: 'md:self-auto', selfStart: 'md:self-Start', selfEnd: 'md:self-end', selfCenter: 'md:self-center', selfStretch: 'md:self-stretch', selfBaseline: 'md:self-baseline', none: '' },
	lg: { selfAuto: 'lg:self-auto', selfStart: 'lg:self-Start', selfEnd: 'lg:self-end', selfCenter: 'lg:self-center', selfStretch: 'lg:self-stretch', selfBaseline: 'lg:self-baseline', none: '' }
};

// EXTERNAL_SPACING
export const marginTopOptions: Type.SpacingOptionsWithNegativeValue = {
	def: { '20': 'mt-60', '19': 'mt-56', '18': 'mt-52', '17': 'mt-48', '16': 'mt-44', '15': 'mt-40', '14': 'mt-36', '13': 'mt-32', '12': 'mt-28', '11': 'mt-24', '10': 'mt-20', '9': 'mt-16', '8': 'mt-14', '7': 'mt-12', '6': 'mt-10', '5': 'mt-8 ', '4': 'mt-6 ', '3': 'mt-4 ', '2': 'mt-3 ', '1': 'mt-2 ', '0': 'mt-0', '-1': '' },
	mm: { '20': 'mm:mt-60', '19': 'mm:mt-56', '18': 'mm:mt-52', '17': 'mm:mt-48', '16': 'mm:mt-44', '15': 'mm:mt-40', '14': 'mm:mt-36', '13': 'mm:mt-32', '12': 'mm:mt-28', '11': 'mm:mt-24', '10': 'mm:mt-20', '9': 'mm:mt-16', '8': 'mm:mt-14', '7': 'mm:mt-12', '6': 'mm:mt-10', '5': 'mm:mt-8 ', '4': 'mm:mt-6 ', '3': 'mm:mt-4 ', '2': 'mm:mt-3 ', '1': 'mm:mt-2 ', '0': 'mm:mt-0', '-1': '' },
	lm: { '20': 'lm:mt-60', '19': 'lm:mt-56', '18': 'lm:mt-52', '17': 'lm:mt-48', '16': 'lm:mt-44', '15': 'lm:mt-40', '14': 'lm:mt-36', '13': 'lm:mt-32', '12': 'lm:mt-28', '11': 'lm:mt-24', '10': 'lm:mt-20', '9': 'lm:mt-16', '8': 'lm:mt-14', '7': 'lm:mt-12', '6': 'lm:mt-10', '5': 'lm:mt-8 ', '4': 'lm:mt-6 ', '3': 'lm:mt-4 ', '2': 'lm:mt-3 ', '1': 'lm:mt-2 ', '0': 'lm:mt-0', '-1': '' },
	md: { '20': 'md:mt-60', '19': 'md:mt-56', '18': 'md:mt-52', '17': 'md:mt-48', '16': 'md:mt-44', '15': 'md:mt-40', '14': 'md:mt-36', '13': 'md:mt-32', '12': 'md:mt-28', '11': 'md:mt-24', '10': 'md:mt-20', '9': 'md:mt-16', '8': 'md:mt-14', '7': 'md:mt-12', '6': 'md:mt-10', '5': 'md:mt-8 ', '4': 'md:mt-6 ', '3': 'md:mt-4 ', '2': 'md:mt-3 ', '1': 'md:mt-2 ', '0': 'md:mt-0', '-1': '' },
	lg: { '20': 'lg:mt-60', '19': 'lg:mt-56', '18': 'lg:mt-52', '17': 'lg:mt-48', '16': 'lg:mt-44', '15': 'lg:mt-40', '14': 'lg:mt-36', '13': 'lg:mt-32', '12': 'lg:mt-28', '11': 'lg:mt-24', '10': 'lg:mt-20', '9': 'lg:mt-16', '8': 'lg:mt-14', '7': 'lg:mt-12', '6': 'lg:mt-10', '5': 'lg:mt-8 ', '4': 'lg:mt-6 ', '3': 'lg:mt-4 ', '2': 'lg:mt-3 ', '1': 'lg:mt-2 ', '0': 'lg:mt-0', '-1': '' }
};
export const marginBottompOptions: Type.SpacingOptionsWithNegativeValue = {
	def: { '20': 'mb-60', '19': 'mb-56', '18': 'mb-52', '17': 'mb-48', '16': 'mb-44', '15': 'mb-40', '14': 'mb-36', '13': 'mb-32', '12': 'mb-28', '11': 'mb-24', '10': 'mb-20', '9': 'mb-16', '8': 'mb-14', '7': 'mb-12', '6': 'mb-10', '5': 'mb-8 ', '4': 'mb-6 ', '3': 'mb-4 ', '2': 'mb-3 ', '1': 'mb-2 ', '0': 'mb-0', '-1': '' },
	mm: { '20': 'mm:mb-60', '19': 'mm:mb-56', '18': 'mm:mb-52', '17': 'mm:mb-48', '16': 'mm:mb-44', '15': 'mm:mb-40', '14': 'mm:mb-36', '13': 'mm:mb-32', '12': 'mm:mb-28', '11': 'mm:mb-24', '10': 'mm:mb-20', '9': 'mm:mb-16', '8': 'mm:mb-14', '7': 'mm:mb-12', '6': 'mm:mb-10', '5': 'mm:mb-8 ', '4': 'mm:mb-6 ', '3': 'mm:mb-4 ', '2': 'mm:mb-3 ', '1': 'mm:mb-2 ', '0': 'mm:mb-0', '-1': '' },
	lm: { '20': 'lm:mb-60', '19': 'lm:mb-56', '18': 'lm:mb-52', '17': 'lm:mb-48', '16': 'lm:mb-44', '15': 'lm:mb-40', '14': 'lm:mb-36', '13': 'lm:mb-32', '12': 'lm:mb-28', '11': 'lm:mb-24', '10': 'lm:mb-20', '9': 'lm:mb-16', '8': 'lm:mb-14', '7': 'lm:mb-12', '6': 'lm:mb-10', '5': 'lm:mb-8 ', '4': 'lm:mb-6 ', '3': 'lm:mb-4 ', '2': 'lm:mb-3 ', '1': 'lm:mb-2 ', '0': 'lm:mb-0', '-1': '' },
	md: { '20': 'md:mb-60', '19': 'md:mb-56', '18': 'md:mb-52', '17': 'md:mb-48', '16': 'md:mb-44', '15': 'md:mb-40', '14': 'md:mb-36', '13': 'md:mb-32', '12': 'md:mb-28', '11': 'md:mb-24', '10': 'md:mb-20', '9': 'md:mb-16', '8': 'md:mb-14', '7': 'md:mb-12', '6': 'md:mb-10', '5': 'md:mb-8 ', '4': 'md:mb-6 ', '3': 'md:mb-4 ', '2': 'md:mb-3 ', '1': 'md:mb-2 ', '0': 'md:mb-0', '-1': '' },
	lg: { '20': 'lg:mb-60', '19': 'lg:mb-56', '18': 'lg:mb-52', '17': 'lg:mb-48', '16': 'lg:mb-44', '15': 'lg:mb-40', '14': 'lg:mb-36', '13': 'lg:mb-32', '12': 'lg:mb-28', '11': 'lg:mb-24', '10': 'lg:mb-20', '9': 'lg:mb-16', '8': 'lg:mb-14', '7': 'lg:mb-12', '6': 'lg:mb-10', '5': 'lg:mb-8 ', '4': 'lg:mb-6 ', '3': 'lg:mb-4 ', '2': 'lg:mb-3 ', '1': 'lg:mb-2 ', '0': 'lg:mb-0', '-1': '' }
};

// // DIMENSIONS
// // Max width

export const paddingOptions: Type.SpacingOptionsWithNegativeValue = {
	def: { '20': 'p-72', '19': 'p-68', '18': 'p-64', '17': 'p-60', '16': 'p-56', '15': 'p-52', '14': 'p-48', '13': 'p-44', '12': 'p-40', '11': 'p-36', '10': 'p-32', '9': 'p-28', '8': 'p-24', '7': 'p-20', '6': 'p-16', '5': 'p-12', '4': 'p-8', '3': 'p-6', '2': 'p-4', '1': 'p-2', '0': 'p-0', '-1': '' },
	mm: { '20': 'mm:p-72', '19': 'mm:p-68', '18': 'mm:p-64', '17': 'mm:p-60', '16': 'mm:p-56', '15': 'mm:p-52', '14': 'mm:p-48', '13': 'mm:p-44', '12': 'mm:p-40', '11': 'mm:p-36', '10': 'mm:p-32', '9': 'mm:p-28', '8': 'mm:p-24', '7': 'mm:p-20', '6': 'mm:p-16', '5': 'mm:p-12', '4': 'mm:p-8', '3': 'mm:p-6', '2': 'mm:p-4', '1': 'mm:p-2', '0': 'mm:p-0', '-1': '' },
	lm: { '20': 'lm:p-72', '19': 'lm:p-68', '18': 'lm:p-64', '17': 'lm:p-60', '16': 'lm:p-56', '15': 'lm:p-52', '14': 'lm:p-48', '13': 'lm:p-44', '12': 'lm:p-40', '11': 'lm:p-36', '10': 'lm:p-32', '9': 'lm:p-28', '8': 'lm:p-24', '7': 'lm:p-20', '6': 'lm:p-16', '5': 'lm:p-12', '4': 'lm:p-8', '3': 'lm:p-6', '2': 'lm:p-4', '1': 'lm:p-2', '0': 'lm:p-0', '-1': '' },
	md: { '20': 'md:p-72', '19': 'md:p-68', '18': 'md:p-64', '17': 'md:p-60', '16': 'md:p-56', '15': 'md:p-52', '14': 'md:p-48', '13': 'md:p-44', '12': 'md:p-40', '11': 'md:p-36', '10': 'md:p-32', '9': 'md:p-28', '8': 'md:p-24', '7': 'md:p-20', '6': 'md:p-16', '5': 'md:p-12', '4': 'md:p-8', '3': 'md:p-6', '2': 'md:p-4', '1': 'md:p-2', '0': 'md:p-0', '-1': '' },
	lg: { '20': 'lg:p-72', '19': 'lg:p-68', '18': 'lg:p-64', '17': 'lg:p-60', '16': 'lg:p-56', '15': 'lg:p-52', '14': 'lg:p-48', '13': 'lg:p-44', '12': 'lg:p-40', '11': 'lg:p-36', '10': 'lg:p-32', '9': 'lg:p-28', '8': 'lg:p-24', '7': 'lg:p-20', '6': 'lg:p-16', '5': 'lg:p-12', '4': 'lg:p-8', '3': 'lg:p-6', '2': 'lg:p-4', '1': 'lg:p-2', '0': 'lg:p-0', '-1': '' }
};
export const yPaddingOptions: Type.SpacingOptionsWithNegativeValue = {
	def: { '20': 'py-72', '19': 'py-68', '18': 'py-64', '17': 'py-60', '16': 'py-56', '15': 'py-52', '14': 'py-48', '13': 'py-44', '12': 'py-40', '11': 'py-36', '10': 'py-32', '9': 'py-28', '8': 'py-24', '7': 'py-20', '6': 'py-16', '5': 'py-12', '4': 'py-8', '3': 'py-6', '2': 'py-4', '1': 'py-2', '0': 'py-0', '-1': '' },
	mm: { '20': 'mm:py-72', '19': 'mm:py-68', '18': 'mm:py-64', '17': 'mm:py-60', '16': 'mm:py-56', '15': 'mm:py-52', '14': 'mm:py-48', '13': 'mm:py-44', '12': 'mm:py-40', '11': 'mm:py-36', '10': 'mm:py-32', '9': 'mm:py-28', '8': 'mm:py-24', '7': 'mm:py-20', '6': 'mm:py-16', '5': 'mm:py-12', '4': 'mm:py-8', '3': 'mm:py-6', '2': 'mm:py-4', '1': 'mm:py-2', '0': 'mm:py-0', '-1': '' },
	lm: { '20': 'lm:py-72', '19': 'lm:py-68', '18': 'lm:py-64', '17': 'lm:py-60', '16': 'lm:py-56', '15': 'lm:py-52', '14': 'lm:py-48', '13': 'lm:py-44', '12': 'lm:py-40', '11': 'lm:py-36', '10': 'lm:py-32', '9': 'lm:py-28', '8': 'lm:py-24', '7': 'lm:py-20', '6': 'lm:py-16', '5': 'lm:py-12', '4': 'lm:py-8', '3': 'lm:py-6', '2': 'lm:py-4', '1': 'lm:py-2', '0': 'lm:py-0', '-1': '' },
	md: { '20': 'md:py-72', '19': 'md:py-68', '18': 'md:py-64', '17': 'md:py-60', '16': 'md:py-56', '15': 'md:py-52', '14': 'md:py-48', '13': 'md:py-44', '12': 'md:py-40', '11': 'md:py-36', '10': 'md:py-32', '9': 'md:py-28', '8': 'md:py-24', '7': 'md:py-20', '6': 'md:py-16', '5': 'md:py-12', '4': 'md:py-8', '3': 'md:py-6', '2': 'md:py-4', '1': 'md:py-2', '0': 'md:py-0', '-1': '' },
	lg: { '20': 'lg:py-72', '19': 'lg:py-68', '18': 'lg:py-64', '17': 'lg:py-60', '16': 'lg:py-56', '15': 'lg:py-52', '14': 'lg:py-48', '13': 'lg:py-44', '12': 'lg:py-40', '11': 'lg:py-36', '10': 'lg:py-32', '9': 'lg:py-28', '8': 'lg:py-24', '7': 'lg:py-20', '6': 'lg:py-16', '5': 'lg:py-12', '4': 'lg:py-8', '3': 'lg:py-6', '2': 'lg:py-4', '1': 'lg:py-2', '0': 'lg:py-0', '-1': '' }
};
export const xPaddingOptions: Type.SpacingOptionsWithNegativeValue = {
	def: { '20': 'px-72', '19': 'px-68', '18': 'px-64', '17': 'px-60', '16': 'px-56', '15': 'px-52', '14': 'px-48', '13': 'px-44', '12': 'px-40', '11': 'px-36', '10': 'px-32', '9': 'px-28', '8': 'px-24', '7': 'px-20', '6': 'px-16', '5': 'px-12', '4': 'px-8', '3': 'px-6', '2': 'px-4', '1': 'px-2', '0': 'px-0', '-1': '' },
	mm: { '20': 'mm:px-72', '19': 'mm:px-68', '18': 'mm:px-64', '17': 'mm:px-60', '16': 'mm:px-56', '15': 'mm:px-52', '14': 'mm:px-48', '13': 'mm:px-44', '12': 'mm:px-40', '11': 'mm:px-36', '10': 'mm:px-32', '9': 'mm:px-28', '8': 'mm:px-24', '7': 'mm:px-20', '6': 'mm:px-16', '5': 'mm:px-12', '4': 'mm:px-8', '3': 'mm:px-6', '2': 'mm:px-4', '1': 'mm:px-2', '0': 'mm:px-0', '-1': '' },
	lm: { '20': 'lm:px-72', '19': 'lm:px-68', '18': 'lm:px-64', '17': 'lm:px-60', '16': 'lm:px-56', '15': 'lm:px-52', '14': 'lm:px-48', '13': 'lm:px-44', '12': 'lm:px-40', '11': 'lm:px-36', '10': 'lm:px-32', '9': 'lm:px-28', '8': 'lm:px-24', '7': 'lm:px-20', '6': 'lm:px-16', '5': 'lm:px-12', '4': 'lm:px-8', '3': 'lm:px-6', '2': 'lm:px-4', '1': 'lm:px-2', '0': 'lm:px-0', '-1': '' },
	md: { '20': 'md:px-72', '19': 'md:px-68', '18': 'md:px-64', '17': 'md:px-60', '16': 'md:px-56', '15': 'md:px-52', '14': 'md:px-48', '13': 'md:px-44', '12': 'md:px-40', '11': 'md:px-36', '10': 'md:px-32', '9': 'md:px-28', '8': 'md:px-24', '7': 'md:px-20', '6': 'md:px-16', '5': 'md:px-12', '4': 'md:px-8', '3': 'md:px-6', '2': 'md:px-4', '1': 'md:px-2', '0': 'md:px-0', '-1': '' },
	lg: { '20': 'lg:px-72', '19': 'lg:px-68', '18': 'lg:px-64', '17': 'lg:px-60', '16': 'lg:px-56', '15': 'lg:px-52', '14': 'lg:px-48', '13': 'lg:px-44', '12': 'lg:px-40', '11': 'lg:px-36', '10': 'lg:px-32', '9': 'lg:px-28', '8': 'lg:px-24', '7': 'lg:px-20', '6': 'lg:px-16', '5': 'lg:px-12', '4': 'lg:px-8', '3': 'lg:px-6', '2': 'lg:px-4', '1': 'lg:px-2', '0': 'lg:px-0', '-1': '' }
};

export const maxWidthOptions: Type.SpacingOptionsWithNegativeValue = {
	def: { '20': 'max-w-max', '19': 'max-w-7xl', '18': 'max-w-6xl', '17': 'max-w-5xl', '16': 'max-w-[60rem]', '15': 'max-w-3xl', '14': 'max-w-2xl', '13': 'max-w-xl', '12': 'max-w-lg', '11': 'max-w-md', '10': 'max-w-sm', '9': 'max-w-64', '8': 'max-w-56', '7': 'max-w-48', '6': 'max-w-40', '5': 'max-w-32', '4': 'max-w-24', '3': 'max-w-16', '2': 'max-w-8', '1': 'max-w-6', '0': 'max-w-none', '-1': '' },
	mm: { '20': 'mm:max-w-max', '19': 'mm:max-w-7xl', '18': 'mm:max-w-6xl', '17': 'mm:max-w-5xl', '16': 'mm:max-w-[60rem]', '15': 'mm:max-w-3xl', '14': 'mm:max-w-2xl', '13': 'mm:max-w-xl', '12': 'mm:max-w-lg', '11': 'mm:max-w-md', '10': 'mm:max-w-sm', '9': 'mm:max-w-64', '8': 'mm:max-w-56', '7': 'mm:max-w-48', '6': 'mm:max-w-40', '5': 'mm:max-w-32', '4': 'mm:max-w-24', '3': 'mm:max-w-16', '2': 'mm:max-w-8', '1': 'mm:max-w-6', '0': 'mm:max-w-none', '-1': '' },
	lm: { '20': 'lm:max-w-max', '19': 'lm:max-w-7xl', '18': 'lm:max-w-6xl', '17': 'lm:max-w-5xl', '16': 'lm:max-w-[60rem]', '15': 'lm:max-w-3xl', '14': 'lm:max-w-2xl', '13': 'lm:max-w-xl', '12': 'lm:max-w-lg', '11': 'lm:max-w-md', '10': 'lm:max-w-sm', '9': 'lm:max-w-64', '8': 'lm:max-w-56', '7': 'lm:max-w-48', '6': 'lm:max-w-40', '5': 'lm:max-w-32', '4': 'lm:max-w-24', '3': 'lm:max-w-16', '2': 'lm:max-w-8', '1': 'lm:max-w-6', '0': 'lm:max-w-none', '-1': '' },
	md: { '20': 'md:max-w-max', '19': 'md:max-w-7xl', '18': 'md:max-w-6xl', '17': 'md:max-w-5xl', '16': 'md:max-w-[60rem]', '15': 'md:max-w-3xl', '14': 'md:max-w-2xl', '13': 'md:max-w-xl', '12': 'md:max-w-lg', '11': 'md:max-w-md', '10': 'md:max-w-sm', '9': 'md:max-w-64', '8': 'md:max-w-56', '7': 'md:max-w-48', '6': 'md:max-w-40', '5': 'md:max-w-32', '4': 'md:max-w-24', '3': 'md:max-w-16', '2': 'md:max-w-8', '1': 'md:max-w-6', '0': 'md:max-w-none', '-1': '' },
	lg: { '20': 'lg:max-w-max', '19': 'lg:max-w-7xl', '18': 'lg:max-w-6xl', '17': 'lg:max-w-5xl', '16': 'lg:max-w-[60rem]', '15': 'lg:max-w-3xl', '14': 'lg:max-w-2xl', '13': 'lg:max-w-xl', '12': 'lg:max-w-lg', '11': 'lg:max-w-md', '10': 'lg:max-w-sm', '9': 'lg:max-w-64', '8': 'lg:max-w-56', '7': 'lg:max-w-48', '6': 'lg:max-w-40', '5': 'lg:max-w-32', '4': 'lg:max-w-24', '3': 'lg:max-w-16', '2': 'lg:max-w-8', '1': 'lg:max-w-6', '0': 'lg:max-w-none', '-1': '' }
};

export const textAlignOptions: Type.TextAlignOptions = {
	def: { left: 'text-left', center: 'text-center', right: 'text-right', justify: 'text-justify', none: '' },
	mm: { left: 'mm:text-left', center: 'mm:text-center', right: 'mm:text-right', justify: 'mm:text-justify', none: '' },
	lm: { left: 'lm:text-left', center: 'lm:text-center', right: 'lm:text-right', justify: 'lm:text-justify', none: '' },
	md: { left: 'md:text-left', center: 'md:text-center', right: 'md:text-right', justify: 'md:text-justify', none: '' },
	lg: { left: 'lg:text-left', center: 'lg:text-center', right: 'lg:text-right', justify: 'lg:text-justify', none: '' }
};

export const heightOptions: Type.DimensionOptions = {
	def: { full: 'h-full', max: 'h-max', unset: '' },
	mm: { full: 'mm:h-full', max: 'mm:h-max', unset: '' },
	lm: { full: 'lm:h-full', max: 'lm:h-max', unset: '' },
	md: { full: 'md:h-full', max: 'md:h-max', unset: '' },
	lg: { full: 'lg:h-full', max: 'lg:h-max', unset: '' }
};
export const widthOptions: Type.DimensionOptions = {
	def: { full: 'w-full', max: 'w-max', unset: '' },
	mm: { full: 'mm:w-full', max: 'mm:w-max', unset: '' },
	lm: { full: 'lm:w-full', max: 'lm:w-max', unset: '' },
	md: { full: 'md:w-full', max: 'md:w-max', unset: '' },
	lg: { full: 'lg:w-full', max: 'lg:w-max', unset: '' }
};
// // PADDING

// export const yPaddingOptions: Type.SpacingOptions = {
// 	'20': 'py-36 md:py-48 lg:py-60', // 144px -> 192px -> 240px
// 	'19': 'py-34 md:py-46 lg:py-58', // 136px -> 184px -> 232px
// 	'18': 'py-32 md:py-44 lg:py-56', // 128px -> 176px -> 224px
// 	'17': 'py-30 md:py-42 lg:py-54', // 120px -> 168px -> 216px
// 	'16': 'py-28 md:py-40 lg:py-52', // 112px -> 160px -> 208px
// 	'15': 'py-26 md:py-38 lg:py-48', // 104px -> 152px -> 192px
// 	'14': 'py-24 md:py-36 lg:py-44', // 96px -> 144px -> 176px
// 	'13': 'py-22 md:py-32 lg:py-40', // 88px -> 128px -> 160px
// 	'12': 'py-20 md:py-28 lg:py-36', // 80px -> 112px -> 144px
// 	'11': 'py-18 md:py-24 lg:py-32', // 72px -> 96px -> 128px
// 	'10': 'py-16 md:py-20 lg:py-28', // 64px -> 80px -> 112px
// 	'9': 'py-14 md:py-18 lg:py-24', // 56px -> 72px -> 96px
// 	'8': 'py-12 md:py-16 lg:py-20', // 48px -> 64px -> 80px
// 	'7': 'py-10 md:py-14 lg:py-16', // 40px -> 56px -> 64px
// 	'6': 'py-8 md:py-12 lg:py-14', // 32px -> 48px -> 56px
// 	'5': 'py-6 md:py-10 lg:py-12', // 24px -> 40px -> 48px
// 	'4': 'py-7 md:py-10 lg:py-12', // 28px -> 40px -> 48px
// 	'3': 'py-5 md:py-7 lg:py-9', // 20px -> 28px -> 36px
// 	'2': 'py-3 md:py-5 lg:py-7', // 12px -> 20px -> 28px
// 	'1': 'py-1 md:py-3 lg:py-5', // 4px -> 12px -> 20px
// 	'0': '' // 0px -> 0px -> 0px
// };

// export const xPaddingOptions: Type.SpacingOptions = {
// 	'20': 'px-36 md:px-48 lg:px-60 xl:px-0', // 144px -> 192px -> 240px -> 0px
// 	'19': 'px-34 md:px-46 lg:px-58 xl:px-0', // 136px -> 184px -> 232px -> 0px
// 	'18': 'px-32 md:px-44 lg:px-56 xl:px-0', // 128px -> 176px -> 224px -> 0px
// 	'17': 'px-30 md:px-42 lg:px-54 xl:px-0', // 120px -> 168px -> 216px -> 0px
// 	'16': 'px-28 md:px-40 lg:px-52 xl:px-0', // 112px -> 160px -> 208px -> 0px
// 	'15': 'px-26 md:px-38 lg:px-48 xl:px-0', // 104px -> 152px -> 192px -> 0px
// 	'14': 'px-24 md:px-36 lg:px-44 xl:px-0', // 96px -> 144px -> 176px -> 0px
// 	'13': 'px-22 md:px-32 lg:px-40 xl:px-0', // 88px -> 128px -> 160px -> 0px
// 	'12': 'px-20 md:px-28 lg:px-36 xl:px-0', // 80px -> 112px -> 144px -> 0px
// 	'11': 'px-18 md:px-24 lg:px-32 xl:px-0', // 72px -> 96px -> 128px -> 0px
// 	'10': 'px-16 md:px-20 lg:px-28 xl:px-0', // 64px -> 80px -> 112px -> 0px
// 	'9': 'px-14 md:px-18 lg:px-24 xl:px-0', // 56px -> 72px -> 96px -> 0px
// 	'8': 'px-12 md:px-16 lg:px-20 xl:px-0', // 48px -> 64px -> 80px -> 0px
// 	'7': 'px-10 md:px-14 lg:px-16 xl:px-0', // 40px -> 56px -> 64px -> 0px
// 	'6': 'px-8 md:px-12 lg:px-14 xl:px-0', // 32px -> 48px -> 56px -> 0px
// 	'5': 'px-6 md:px-10 lg:px-12 xl:px-0', // 24px -> 40px -> 48px -> 0px
// 	'4': 'px-7 md:px-10 lg:px-12 xl:px-0', // 28px -> 40px -> 48px -> 0px
// 	'3': 'px-5 md:px-7 lg:px-9 xl:px-0', // 20px -> 28px -> 36px -> 0px
// 	'2': 'px-3 md:px-5 lg:px-7 xl:px-0', // 12px -> 20px -> 28px -> 0px
// 	'1': 'px-1 md:px-3 lg:px-5 xl:px-0', // 4px -> 12px -> 20px -> 0px
// 	'0': '' // 0px -> 0px -> 0px -> 0px
// };

// DIMENSION_OVERWRITES
// All custom code in the component

// STYLING
