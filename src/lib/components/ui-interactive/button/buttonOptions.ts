import type * as Type from './buttonTypes';

export const sizeStylingOptions: Type.SizeOptions = {
	1: 'text-sm lg:text-base px-4 py-2 gap-1.5 ',
	2: 'text-base lg:text-lg px-5 py-3 gap-1.5 tracking-[-0.1px]',
	3: 'text-lg px-6 py-4 gap-2',
	4: 'text-xl px-8 py-5 gap-2.5',
	5: 'text-2xl px-10 py-6 gap-3'
};
export const themeStylingOptions: Type.ThemeOptions = {
	primary: `
	duration-300 
	text-button-primary-text-default 
	hover:text-button-primary-text-hover 
	fill-button-primary-text-default 
	hover:fill-button-primary-text-hover 
	bg-button-primary-surface-default 
	border border--button-primary-border-default
	group-focus-within:outline-2 group-focus-within:outline-button-primary-outline-focus`,

	// secondary: 'text-slate-700 border border-slate-700 bg-white hover:text-white duration-300 group-focus-within:outline-2 group-focus-within:outline-slate-700',

	secondary: `
	duration-300 
	text-button-secondary-text-default 
	hover:text-button-secondary-text-hover 
	fill-button-secondary-text-default 
	hover:fill-button-secondary-text-hover 
	bg-button-secondary-surface-default 
	border border--button-secondary-border-default
	group-focus-within:outline-2 group-focus-within:outline-button-secondary-outline-focus`
};
// export const themeStylingOptions: Type.ThemeOptions = {

// 	primary: 'text-emerald-800 border border-emerald-800 bg-emerald-200 hover:text-white duration-300 group-focus-within:outline-2 group-focus-within:outline-emerald-800',

// 	secondary: 'text-slate-700 border border-slate-700 bg-white hover:text-white duration-300 group-focus-within:outline-2 group-focus-within:outline-slate-700'
// };
export const widthStylingOptions: Type.WidthOptions = {
	full: 'w-full',
	max: 'w-full max-w-max'
};

export const targetOptions: Type.TargetOptions = {
	newTab: '_blank',
	currentTab: '_self'
};
