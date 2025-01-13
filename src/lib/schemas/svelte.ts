// Generic
export interface ObjectOfStrings {
	[key: string]: string;
}

// Text.svelte
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
}

export type TextStyles = keyof Styles;

export type TextTypes = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'blockquote' | 'cite';

// Navigation Links
export interface Link {
	url: string;
	label: string;
	linkType?: string;
	icon?: string;
	description?: string;
	sublinks?: Link[];
}

export interface FooterCategory {
	category: string;
	links: Link[];
}

export interface Provider {
	name: string;
	link: string;
}

export interface Qualification {
	qualificationName: string;
	year: number;
	description: string;
	provider: Provider;
}
