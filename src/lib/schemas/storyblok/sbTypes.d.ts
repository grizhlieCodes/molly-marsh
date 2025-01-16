import {StoryblokStory} from 'storyblok-generate-ts'

export type MultilinkStoryblok =
  | {
      id?: string;
      cached_url?: string;
      anchor?: string;
      linktype?: "story";
      target?: "_self" | "_blank";
      [k: string]: any;
    }
  | {
      url?: string;
      cached_url?: string;
      anchor?: string;
      linktype?: "asset" | "url";
      target?: "_self" | "_blank";
      [k: string]: any;
    }
  | {
      email?: string;
      linktype?: "email";
      target?: "_self" | "_blank";
      [k: string]: any;
    };

export interface ButtonStoryblok {
  meta_data?: any;
  content: (IconStoryblok | SimpleTextStoryblok)[];
  url: Exclude<MultilinkStoryblok, {linktype?: "email"} | {linktype?: "asset"}>;
  label: string;
  target: "newTab" | "currentTab";
  styling?: any;
  button_theme: "primary" | "secondary";
  button_width: "full" | "max";
  _uid: string;
  component: "button";
  [k: string]: any;
}

export interface ContainerStoryblok {
  metaData?: any;
  blocks: (
    | ButtonStoryblok
    | ContainerStoryblok
    | HeaderStoryblok
    | IconStoryblok
    | NavLinkStoryblok
    | NavLogoStoryblok
    | PageStoryblok
    | SectionStoryblok
    | SimpleTextStoryblok
    | TextStoryblok
  )[];
  container_id?: string;
  container_class?: string;
  layout?: any;
  content_direction: "row" | "onlyRow" | "column" | "rowReversed" | "columnReversed";
  justify_content: "start" | "center" | "end" | "stretch" | "between" | "around" | "evenly" | "normal";
  align_items: "start" | "end" | "center" | "baseline" | "stretch";
  wrap_content: "wrap" | "noWrap";
  child_layout?: any;
  flex: "default" | "flexAuto" | "flexInitial" | "flexNone";
  align_self: "selfAuto" | "selfStart" | "selfEnd" | "selfCenter" | "selfStretch" | "selfBaseline";
  external_spacing?: any;
  dimensions?: any;
  height: "full" | "max" | "unset";
  padding?: any;
  dimension_overwrites?: any;
  min_height_unit?: "" | "rem" | "em" | "px" | "vh" | "%";
  min_width_unit?: "" | "rem" | "em" | "px" | "viewWidth" | "perc" | "none";
  styling?: any;
  background_color:
    | "none"
    | "default"
    | "primary-50"
    | "primary-100"
    | "primary-200"
    | "primary-300"
    | "primary-400"
    | "primary-500"
    | "primary-600"
    | "primary-700"
    | "primary-800"
    | "primary-900"
    | "primary-950";
  overflow: "auto" | "hidden" | "scroll" | "visible";
  customStyling?: string;
  _uid: string;
  component: "container";
  [k: string]: any;
}

export interface HeaderStoryblok {
  logo: NavLogoStoryblok[];
  nav_links: NavLinkStoryblok[];
  button?: ButtonStoryblok[];
  _uid: string;
  component: "header";
  [k: string]: any;
}

export interface IconStoryblok {
  icon:
    | ""
    | "bars-4"
    | "users"
    | "arrowRight"
    | "beaker"
    | "calendar"
    | "cart"
    | "chatBubble"
    | "checkCircle"
    | "chevronDown"
    | "externalLink"
    | "squaresPlus"
    | "eye"
    | "gbp"
    | "heart"
    | "home"
    | "image"
    | "lightning"
    | "newsletter"
    | "oneTick"
    | "bookOpen"
    | "paperAirplane"
    | "pencilSquare"
    | "planet"
    | "plus"
    | "twoTicks"
    | "trendUp"
    | "user"
    | "userGroup";
  custom_css?: string;
  _uid: string;
  component: "icon";
  [k: string]: any;
}

export interface NavLinkStoryblok {
  main_link?: any;
  url: Exclude<MultilinkStoryblok, {linktype?: "email"} | {linktype?: "asset"}>;
  link_label: string;
  icon?: IconStoryblok[];
  link_description?: string;
  sub_link_data?: any;
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
  url: Exclude<MultilinkStoryblok, {linktype?: "email"} | {linktype?: "asset"}>;
  logo_image?: AssetStoryblok;
  logo_text?: string;
  _uid: string;
  component: "nav_logo";
  [k: string]: any;
}

export interface PageStoryblok {
  blocks: (
    | ButtonStoryblok
    | ContainerStoryblok
    | HeaderStoryblok
    | IconStoryblok
    | NavLinkStoryblok
    | NavLogoStoryblok
    | PageStoryblok
    | SectionStoryblok
    | SimpleTextStoryblok
    | TextStoryblok
  )[];
  mainAriaLabel: string;
  pagePosition: "" | "relative" | "absolute" | "fixed";
  _uid: string;
  component: "page";
  uuid?: string;
  [k: string]: any;
}

export interface SectionStoryblok {
  metaData?: any;
  section_id: string;
  section_label: string;
  type: "section" | "article";
  blocks: (
    | ButtonStoryblok
    | ContainerStoryblok
    | HeaderStoryblok
    | IconStoryblok
    | NavLinkStoryblok
    | NavLogoStoryblok
    | PageStoryblok
    | SectionStoryblok
    | SimpleTextStoryblok
    | TextStoryblok
  )[];
  layout?: any;
  grid_span:
    | "fullSpan"
    | "centeredSpan1"
    | "centeredSpan2"
    | "centeredSpan3"
    | "centeredSpan4"
    | "centeredSpan5"
    | "centeredSpan6";
  justify_content: "normal" | "start" | "end" | "center" | "between" | "around" | "evenly" | "stretch";
  align_items: "start" | "end" | "center" | "baseline" | "stretch";
  item_spacing?: any;
  styling?: any;
  background_color:
    | "none"
    | "default"
    | "primary-50"
    | "primary-100"
    | "primary-200"
    | "primary-300"
    | "primary-400"
    | "primary-500"
    | "primary-600"
    | "primary-700"
    | "primary-800"
    | "primary-900"
    | "primary-950";
  overflow: "auto" | "hidden" | "scroll" | "visible";
  customStyling?: string;
  _uid: string;
  component: "section";
  [k: string]: any;
}

export interface SimpleTextStoryblok {
  text?: string;
  _uid: string;
  component: "simple_text";
  [k: string]: any;
}

export interface RichtextStoryblok {
  type: string;
  content?: RichtextStoryblok[];
  marks?: RichtextStoryblok[];
  attrs?: any;
  text?: string;
  [k: string]: any;
}

export interface TextStoryblok {
  Content?: any;
  content: string;
  text_id?: string;
  text_type:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h6"
    | "h7"
    | "paraXs"
    | "paraSm"
    | "paraBase"
    | "paraLg"
    | "paraXl"
    | "overline"
    | "quote"
    | "sr";
  Styling?: any;
  text_style:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h6"
    | "h7"
    | "paraXs"
    | "paraSm"
    | "paraBase"
    | "paraLg"
    | "paraXl"
    | "overline"
    | "quote"
    | "sr";
  text_align: "left" | "center" | "right" | "justify" | "inherit";
  text_color_overwrite?:
    | ""
    | "primaryDark"
    | "primaryDefault"
    | "primaryMedium"
    | "primaryLight"
    | "secondaryDark"
    | "secondaryDefault"
    | "secondaryMedium"
    | "secondaryLight"
    | "redDark"
    | "redMid"
    | "redLight"
    | "black";
  rich_text?: RichtextStoryblok;
  customCss?: string;
  _uid: string;
  component: "text";
  [k: string]: any;
}
