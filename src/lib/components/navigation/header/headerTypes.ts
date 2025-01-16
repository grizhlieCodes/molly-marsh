export interface Link {
	url: string;
	label: string;
	linkType?: string;
	icon?: string;
	description?: string;
	sublinks?: Link[];
}

export type MultilinkStoryblok =
	| {
			id?: string;
			cached_url?: string;
			anchor?: string;
			linktype?: 'story';
			target?: '_self' | '_blank';
			[k: string]: any;
	  }
	| {
			url?: string;
			cached_url?: string;
			anchor?: string;
			linktype?: 'asset' | 'url';
			target?: '_self' | '_blank';
			[k: string]: any;
	  }
	| {
			email?: string;
			linktype?: 'email';
			target?: '_self' | '_blank';
			[k: string]: any;
	  };

// export interface NavLinkStoryblok {
// 	url: Exclude<MultilinkStoryblok, { linktype?: 'email' } | { linktype?: 'asset' }>;
// 	link_label: string;
// 	icon?: IconStoryblok[];
// 	link_description?: string;
// 	sub_links?: NavLinkStoryblok[];
// 	_uid: string;
// 	component: 'nav_link';
// 	[k: string]: any;
// }

export interface NavLinkStoryblok {
  main_link?: any; // group
  url: Exclude<MultilinkStoryblok, {linktype?: "email"} | {linktype?: "asset"}>;
  link_label: string;
  icon?: IconStoryblok[];
  link_description?: string;
  sub_link_data?: any; //group
  sub_links?: NavLinkStoryblok[];
  sub_link_type?: "defaultLink" | "mobileMainLink";
  _uid: string;
  component: "nav_link";
  [k: string]: any;
}

export interface AssetStoryblok {
	_uid?: string;
	id: number;
	alt?: string;
	name: string;
	focus?: string;
	source?: string;
	title?: string;
	filename: string;
	copyright?: string;
	fieldtype?: string;
	meta_data?: null | {
		[k: string]: any;
	};
	is_external_url?: boolean;
	[k: string]: any;
}

export interface NavLogoStoryblok {
	url: Exclude<MultilinkStoryblok, { linktype?: 'email' } | { linktype?: 'asset' }>;
	logo_image?: AssetStoryblok;
	logo_text?: string;
	_uid: string;
	component: 'nav_logo';
	[k: string]: any;
}

export type GapKey = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | '13' | '14' | '15' | '16' | '17' | '18' | '19' | '20';
export type GapOptions = Record<SpacingKey, string>;
