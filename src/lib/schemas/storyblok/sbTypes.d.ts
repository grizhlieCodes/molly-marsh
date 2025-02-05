import {StoryblokStory} from 'storyblok-generate-ts'

export interface AccordionStoryblok {
  accordion_items: AccordionItemStoryblok[];
  _uid: string;
  component: "accordion";
  [k: string]: any;
}

export interface AccordionItemStoryblok {
  accordion_item_title: TextStoryblok[];
  accordion_item_content: TextStoryblok[];
  storyblok_name?: string;
  _uid: string;
  component: "accordion_item";
  [k: string]: any;
}

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
  layout_options_desktop?: any;
  content_direction_lg: "row" | "rowReversed" | "column" | "columnReversed" | "none";
  justify_content_lg: "start" | "center" | "end" | "stretch" | "between" | "around" | "evenly" | "normal" | "none";
  align_items_lg: "start" | "end" | "center" | "baseline" | "stretch" | "none";
  wrap_content_lg: "wrap" | "noWrap" | "none";
  self_layout_options_desktop?: any;
  flex_lg: "default" | "flexAuto" | "flexInitial" | "flexNone" | "none";
  align_self_lg: "selfAuto" | "selfStart" | "selfEnd" | "selfCenter" | "selfStretch" | "selfBaseline" | "none";
  margin_options_desktop?: any;
  padding_options_desktop?: any;
  width_options_desktop?: any;
  width_lg:
    | "full"
    | "Unset"
    | "Simple way to manipulate the width of our element based on its content or based on its parent's height.";
  height_options_desktop?: any;
  height_lg: "full" | "max" | "unset";
  child_styling_desktop?: any;
  text_align_lg?: "left" | "center" | "right" | "justify" | "none";
  blocks: (
    | AccordionStoryblok
    | AccordionItemStoryblok
    | ButtonStoryblok
    | ContainerStoryblok
    | ContainerLegacyStoryblok
    | CustomHeroStoryblok
    | CustomRichtextStoryblok
    | DividerStoryblok
    | EmbedTextStoryblok
    | FooterStoryblok
    | FooterColumnStoryblok
    | FormStoryblok
    | FormInputStoryblok
    | FormInputValidationStoryblok
    | FormTextareaStoryblok
    | HeaderStoryblok
    | IconStoryblok
    | ImageStoryblok
    | NavLinkStoryblok
    | NavLogoStoryblok
    | PageStoryblok
    | PriceCardStoryblok
    | PriceCardStripeBtnStoryblok
    | PriceCardUrlBtnStoryblok
    | SectionStoryblok
    | SimpleCardStoryblok
    | SimpleTextStoryblok
    | SvgDividerStoryblok
    | TestimonialStoryblok
    | TextStoryblok
  )[];
  storyblok_name?: string;
  meta_data?: any;
  container_id?: string;
  container_class?: string;
  style_options?: any;
  custom_css?: string;
  overflow: "auto" | "hidden" | "scroll" | "visible";
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
    | "primary-950"
    | "secondary-50"
    | "secondary-100"
    | "secondary-200"
    | "secondary-300"
    | "secondary-400"
    | "secondary-500"
    | "secondary-600"
    | "secondary-700"
    | "secondary-800"
    | "secondary-900"
    | "secondary-950";
  border_color:
    | "none"
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
    | "primary-950"
    | "secondary-50"
    | "secondary-100"
    | "secondary-200"
    | "secondary-300"
    | "secondary-400"
    | "secondary-500"
    | "secondary-600"
    | "secondary-700"
    | "secondary-800"
    | "secondary-900"
    | "secondary-950";
  layout_options_tab?: any;
  content_direction_md: "row" | "rowReversed" | "column" | "columnReversed" | "none";
  justify_content_md: "start" | "center" | "end" | "stretch" | "between" | "around" | "evenly" | "normal" | "none";
  align_items_md: "start" | "end" | "center" | "baseline" | "stretch" | "none";
  wrap_content_md: "wrap" | "noWrap" | "none";
  self_layout_options_tab?: any;
  flex_md: "default" | "flexAuto" | "flexInitial" | "flexNone" | "none";
  align_self_md: "selfAuto" | "selfStart" | "selfEnd" | "selfCenter" | "selfStretch" | "selfBaseline" | "none";
  margin_options_tab?: any;
  padding_options_tab?: any;
  width_options_tab?: any;
  width_md: "full" | "max" | "unset";
  height_options_tab?: any;
  height_md: "full" | "max" | "unset";
  child_styling_tab?: any;
  text_align_md?: "left" | "center" | "right" | "justify" | "none";
  layout_options_small_tab?: any;
  content_direction_lm: "row" | "rowReversed" | "column" | "columnReversed" | "none";
  justify_content_lm: "start" | "center" | "end" | "stretch" | "between" | "around" | "evenly" | "normal" | "none";
  align_items_lm: "start" | "end" | "center" | "baseline" | "stretch" | "none";
  wrap_content_lm: "wrap" | "noWrap" | "none";
  self_layout_options_small_tab?: any;
  flex_lm: "default" | "flexAuto" | "flexInitial" | "flexNone" | "none";
  align_self_lm: "selfAuto" | "selfStart" | "selfEnd" | "selfCenter" | "selfStretch" | "selfBaseline" | "none";
  margin_options_small_tab?: any;
  padding_options_small_tab?: any;
  width_options_small_tab?: any;
  width_lm: "full" | "max" | "unset";
  height_options_small_tab?: any;
  height_lm: "full" | "max" | "unset";
  child_styling_small_tab?: any;
  text_align_lm?: "left" | "center" | "right" | "justify" | "none";
  layout_options_med_mob?: any;
  content_direction_mm: "row" | "rowReversed" | "column" | "columnReversed" | "none";
  justify_content_mm: "start" | "center" | "end" | "stretch" | "between" | "around" | "evenly" | "normal" | "none";
  align_items_mm: "start" | "end" | "center" | "baseline" | "stretch" | "none";
  wrap_content_mm: "wrap" | "noWrap" | "none";
  self_layout_options_med_mob?: any;
  flex_mm: "default" | "flexAuto" | "flexInitial" | "flexNone" | "none";
  align_self_mm: "selfAuto" | "selfStart" | "selfEnd" | "selfCenter" | "selfStretch" | "selfBaseline" | "none";
  margin_options_med_mob?: any;
  padding_options_med_mob?: any;
  width_options_med_mob?: any;
  width_mm: "full" | "max" | "unset";
  height_options_med_mob?: any;
  height_mm: "full" | "max" | "unset";
  child_styling_med_mob?: any;
  text_align_mm?: "left" | "center" | "right" | "justify" | "none";
  layout_options_mob?: any;
  content_direction_default: "row" | "rowReversed" | "column" | "columnReversed" | "none";
  justify_content_default: "start" | "center" | "end" | "stretch" | "between" | "around" | "evenly" | "normal";
  align_items_default: "start" | "end" | "center" | "baseline" | "stretch";
  wrap_content_default: "wrap" | "noWrap" | "none";
  self_layout_options_mob?: any;
  flex_default: "default" | "flexAuto" | "flexInitial" | "flexNone";
  align_self_default: "selfAuto" | "selfStart" | "selfEnd" | "selfCenter" | "selfStretch" | "selfBaseline";
  margin_options_mob?: any;
  padding_options_mob?: any;
  width_options_mob?: any;
  width_default: "full" | "max" | "unset";
  min_width_unit_default?: "" | "rem" | "em" | "px" | "vw" | "%" | "none";
  height_options_mob?: any;
  height_default: "full" | "max" | "unset";
  min_height_unit_default?: "rem" | "em" | "px" | "vh" | "%" | "none";
  child_styling_mob?: any;
  text_align_default?: "left" | "center" | "right" | "justify" | "none";
  _uid: string;
  component: "container";
  [k: string]: any;
}

export interface ContainerLegacyStoryblok {
  metaData?: any;
  storyblok_name?: string;
  blocks: (
    | AccordionStoryblok
    | AccordionItemStoryblok
    | ButtonStoryblok
    | ContainerStoryblok
    | ContainerLegacyStoryblok
    | CustomHeroStoryblok
    | CustomRichtextStoryblok
    | DividerStoryblok
    | EmbedTextStoryblok
    | FooterStoryblok
    | FooterColumnStoryblok
    | FormStoryblok
    | FormInputStoryblok
    | FormInputValidationStoryblok
    | FormTextareaStoryblok
    | HeaderStoryblok
    | IconStoryblok
    | ImageStoryblok
    | NavLinkStoryblok
    | NavLogoStoryblok
    | PageStoryblok
    | PriceCardStoryblok
    | PriceCardStripeBtnStoryblok
    | PriceCardUrlBtnStoryblok
    | SectionStoryblok
    | SimpleCardStoryblok
    | SimpleTextStoryblok
    | SvgDividerStoryblok
    | TestimonialStoryblok
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
  min_width_unit?: "" | "rem" | "em" | "px" | "vw" | "%" | "none";
  customStyling?: string;
  overflow: "auto" | "hidden" | "scroll" | "visible";
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
    | "primary-950"
    | "secondary-50"
    | "secondary-100"
    | "secondary-200"
    | "secondary-300"
    | "secondary-400"
    | "secondary-500"
    | "secondary-600"
    | "secondary-700"
    | "secondary-800"
    | "secondary-900"
    | "secondary-950";
  border?: any;
  border_color:
    | "none"
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
    | "primary-950"
    | "secondary-50"
    | "secondary-100"
    | "secondary-200"
    | "secondary-300"
    | "secondary-400"
    | "secondary-500"
    | "secondary-600"
    | "secondary-700"
    | "secondary-800"
    | "secondary-900"
    | "secondary-950";
  _uid: string;
  component: "container-legacy";
  [k: string]: any;
}

export interface CustomHeroStoryblok {
  hero_section_style: "fancyColumn";
  section_id?: string;
  section: SectionStoryblok[];
  hero_heading: TextStoryblok[];
  hero_image: ImageStoryblok[];
  hero_description: TextStoryblok[];
  hero_cta?: ButtonStoryblok[];
  _uid: string;
  component: "custom_hero";
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

export interface CustomRichtextStoryblok {
  heading_styles?: "serif" | "sans-serif";
  text?: RichtextStoryblok;
  _uid: string;
  component: "custom_richtext";
  [k: string]: any;
}

export interface DividerStoryblok {
  divider_color:
    | "none"
    | "default"
    | "secondary-50"
    | "secondary-100"
    | "secondary-200"
    | "secondary-300"
    | "secondary-400"
    | "secondary-500"
    | "secondary-600"
    | "secondary-700"
    | "secondary-800"
    | "secondary-900"
    | "secondary-950"
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
  _uid: string;
  component: "divider";
  [k: string]: any;
}

export interface EmbedTextStoryblok {
  rich_text?: RichtextStoryblok;
  display: "none" | "block" | "inline";
  _uid: string;
  component: "embed_text";
  [k: string]: any;
}

export interface FooterStoryblok {
  must_haves?: any;
  footer_logo?: NavLogoStoryblok[];
  footer_columns?: (
    | AccordionStoryblok
    | AccordionItemStoryblok
    | ButtonStoryblok
    | ContainerStoryblok
    | ContainerLegacyStoryblok
    | CustomHeroStoryblok
    | CustomRichtextStoryblok
    | DividerStoryblok
    | EmbedTextStoryblok
    | FooterStoryblok
    | FooterColumnStoryblok
    | FormStoryblok
    | FormInputStoryblok
    | FormInputValidationStoryblok
    | FormTextareaStoryblok
    | HeaderStoryblok
    | IconStoryblok
    | ImageStoryblok
    | NavLinkStoryblok
    | NavLogoStoryblok
    | PageStoryblok
    | PriceCardStoryblok
    | PriceCardStripeBtnStoryblok
    | PriceCardUrlBtnStoryblok
    | SectionStoryblok
    | SimpleCardStoryblok
    | SimpleTextStoryblok
    | SvgDividerStoryblok
    | TestimonialStoryblok
    | TextStoryblok
  )[];
  footer_disclaimer?: (
    | AccordionStoryblok
    | AccordionItemStoryblok
    | ButtonStoryblok
    | ContainerStoryblok
    | ContainerLegacyStoryblok
    | CustomHeroStoryblok
    | CustomRichtextStoryblok
    | DividerStoryblok
    | EmbedTextStoryblok
    | FooterStoryblok
    | FooterColumnStoryblok
    | FormStoryblok
    | FormInputStoryblok
    | FormInputValidationStoryblok
    | FormTextareaStoryblok
    | HeaderStoryblok
    | IconStoryblok
    | ImageStoryblok
    | NavLinkStoryblok
    | NavLogoStoryblok
    | PageStoryblok
    | PriceCardStoryblok
    | PriceCardStripeBtnStoryblok
    | PriceCardUrlBtnStoryblok
    | SectionStoryblok
    | SimpleCardStoryblok
    | SimpleTextStoryblok
    | SvgDividerStoryblok
    | TestimonialStoryblok
    | TextStoryblok
  )[];
  footer_cta?: any;
  show_cta?: boolean;
  footer_cta_bloks?: (
    | AccordionStoryblok
    | AccordionItemStoryblok
    | ButtonStoryblok
    | ContainerStoryblok
    | ContainerLegacyStoryblok
    | CustomHeroStoryblok
    | CustomRichtextStoryblok
    | DividerStoryblok
    | EmbedTextStoryblok
    | FooterStoryblok
    | FooterColumnStoryblok
    | FormStoryblok
    | FormInputStoryblok
    | FormInputValidationStoryblok
    | FormTextareaStoryblok
    | HeaderStoryblok
    | IconStoryblok
    | ImageStoryblok
    | NavLinkStoryblok
    | NavLogoStoryblok
    | PageStoryblok
    | PriceCardStoryblok
    | PriceCardStripeBtnStoryblok
    | PriceCardUrlBtnStoryblok
    | SectionStoryblok
    | SimpleCardStoryblok
    | SimpleTextStoryblok
    | SvgDividerStoryblok
    | TestimonialStoryblok
    | TextStoryblok
  )[];
  _uid: string;
  component: "footer";
  [k: string]: any;
}

export interface FooterColumnStoryblok {
  column_label: TextStoryblok[];
  column_links?: NavLinkStoryblok[];
  _uid: string;
  component: "footer_column";
  [k: string]: any;
}

export interface FormStoryblok {
  form_top_text?: TextStoryblok[];
  form_inputs?: (FormInputStoryblok | FormTextareaStoryblok)[];
  form_action: string;
  _uid: string;
  component: "form";
  [k: string]: any;
}

export interface FormInputStoryblok {
  basic_data?: any;
  zod_base_type: "string";
  input_type: "text" | "email" | "number" | "tel" | "url";
  input_autocomplete?:
    | ""
    | "name"
    | "email"
    | "tel"
    | "given-name"
    | "additional-name"
    | "nickname"
    | "username"
    | "new-password"
    | "current-password"
    | "organization"
    | "address-line1"
    | "address-line2"
    | "address-line3"
    | "country"
    | "country-name"
    | "postal-code"
    | "url"
    | "sex";
  input_name: string;
  input_label: string;
  input_placeholder?: string;
  field_validation?: any;
  validation_rules: FormInputValidationStoryblok[];
  required_error?: string;
  invalid_type_error?: string;
  custom_styling?: any;
  custom_label_css?: string;
  custom_label_span_css?: string;
  custom_input_css?: string;
  custom_error_span_css?: string;
  _uid: string;
  component: "form_input";
  [k: string]: any;
}

export interface FormInputValidationStoryblok {
  validation_rule_type?: "" | "min" | "max" | "regex" | "email" | "url" | "optional";
  validation_rule_value?: string;
  validation_rule_message: string;
  _uid: string;
  component: "form_input_validation";
  [k: string]: any;
}

export interface FormTextareaStoryblok {
  basic_data?: any;
  zod_base_type: "string";
  input_name: string;
  textarea_label: string;
  textarea_placeholder?: string;
  field_validation?: any;
  validation_rules: FormInputValidationStoryblok[];
  required_error?: string;
  invalid_type_error?: string;
  custom_styling?: any;
  custom_label_css?: string;
  custom_label_span_css?: string;
  custom_input_css?: string;
  custom_error_span_css?: string;
  _uid: string;
  component: "form_textarea";
  [k: string]: any;
}

export interface HeaderStoryblok {
  header?: any;
  fixed_to_top?: boolean;
  logo: NavLogoStoryblok[];
  nav_links: NavLinkStoryblok[];
  button?: ButtonStoryblok[];
  footer?: any;
  footer_logo?: NavLogoStoryblok[];
  footer_columns?: FooterColumnStoryblok[];
  footer_disclaimer?: TextStoryblok[];
  footer_show_cta?: boolean;
  footer_cta_bloks?: (
    | AccordionStoryblok
    | AccordionItemStoryblok
    | ButtonStoryblok
    | ContainerStoryblok
    | ContainerLegacyStoryblok
    | CustomHeroStoryblok
    | CustomRichtextStoryblok
    | DividerStoryblok
    | EmbedTextStoryblok
    | FooterStoryblok
    | FooterColumnStoryblok
    | FormStoryblok
    | FormInputStoryblok
    | FormInputValidationStoryblok
    | FormTextareaStoryblok
    | HeaderStoryblok
    | IconStoryblok
    | ImageStoryblok
    | NavLinkStoryblok
    | NavLogoStoryblok
    | PageStoryblok
    | PriceCardStoryblok
    | PriceCardStripeBtnStoryblok
    | PriceCardUrlBtnStoryblok
    | SectionStoryblok
    | SimpleCardStoryblok
    | SimpleTextStoryblok
    | SvgDividerStoryblok
    | TestimonialStoryblok
    | TextStoryblok
  )[];
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
  icon_fill?:
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
    | "primary-950"
    | "secondary-50"
    | "secondary-100"
    | "secondary-200"
    | "secondary-300"
    | "secondary-400"
    | "secondary-500"
    | "secondary-600"
    | "secondary-700"
    | "secondary-800"
    | "secondary-900"
    | "secondary-950";
  icon_stroke?:
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
    | "primary-950"
    | "secondary-50"
    | "secondary-100"
    | "secondary-200"
    | "secondary-300"
    | "secondary-400"
    | "secondary-500"
    | "secondary-600"
    | "secondary-700"
    | "secondary-800"
    | "secondary-900"
    | "secondary-950";
  _uid: string;
  component: "icon";
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

export interface ImageStoryblok {
  image?: AssetStoryblok;
  figcaption?: string;
  custom_decoration: "diagonalBackdrops" | "none";
  decorative_image?: boolean;
  dimensions_and_display?: any;
  aspect_ratio: "1:1" | "1.59:1" | "3:2" | "4:3" | "2:3" | "3:4" | "16:9" | "9:16" | "none";
  max_width: "screen" | "100%" | "75%" | "50%" | "25%" | "large" | "medium" | "normal" | "small" | "none";
  max_height: "screen" | "100%" | "75%" | "50%" | "25%" | "large" | "medium" | "normal" | "small" | "none";
  min_height_unit: "rem" | "em" | "px" | "vh" | "%" | "none";
  object_position:
    | "top"
    | "bottom"
    | "left"
    | "right"
    | "center"
    | "leftTop"
    | "leftBottom"
    | "rightTop"
    | "rightBottom"
    | "top20";
  mix_blendmode:
    | "normal"
    | "multiply"
    | "screen"
    | "overlay"
    | "darken"
    | "lighten"
    | "colorDodge"
    | "colorBurn"
    | "hardLight"
    | "softLight"
    | "difference"
    | "exclusion"
    | "hue"
    | "saturation"
    | "color"
    | "luminosity";
  data?: any;
  image_quality: "original" | "large" | "medium" | "small";
  _uid: string;
  component: "image";
  [k: string]: any;
}

export interface NavLinkStoryblok {
  main_link?: any;
  url: Exclude<MultilinkStoryblok, {linktype?: "email"} | {linktype?: "asset"}>;
  link_label: TextStoryblok[];
  icon?: IconStoryblok[];
  link_description?: string;
  sub_link_data?: any;
  sub_links?: NavLinkStoryblok[];
  sub_link_type?: "defaultLink" | "mobileMainLink";
  _uid: string;
  component: "nav_link";
  [k: string]: any;
}

export interface NavLogoStoryblok {
  url: Exclude<MultilinkStoryblok, {linktype?: "email"} | {linktype?: "asset"}>;
  logo_image?: AssetStoryblok;
  logo_text?: TextStoryblok[];
  _uid: string;
  component: "nav_logo";
  [k: string]: any;
}

export interface PageStoryblok {
  blocks: (
    | AccordionStoryblok
    | AccordionItemStoryblok
    | ButtonStoryblok
    | ContainerStoryblok
    | ContainerLegacyStoryblok
    | CustomHeroStoryblok
    | CustomRichtextStoryblok
    | DividerStoryblok
    | EmbedTextStoryblok
    | FooterStoryblok
    | FooterColumnStoryblok
    | FormStoryblok
    | FormInputStoryblok
    | FormInputValidationStoryblok
    | FormTextareaStoryblok
    | HeaderStoryblok
    | IconStoryblok
    | ImageStoryblok
    | NavLinkStoryblok
    | NavLogoStoryblok
    | PageStoryblok
    | PriceCardStoryblok
    | PriceCardStripeBtnStoryblok
    | PriceCardUrlBtnStoryblok
    | SectionStoryblok
    | SimpleCardStoryblok
    | SimpleTextStoryblok
    | SvgDividerStoryblok
    | TestimonialStoryblok
    | TextStoryblok
  )[];
  mainAriaLabel: string;
  pagePosition: "" | "relative" | "absolute" | "fixed";
  _uid: string;
  component: "page";
  uuid?: string;
  [k: string]: any;
}

export interface PriceCardStoryblok {
  card_title: string;
  card_recommended_option?: boolean;
  card_price: string;
  card_price_helper_text?: string;
  card_description?: string;
  card_info_points?: SimpleTextStoryblok[];
  card_button?: (PriceCardStripeBtnStoryblok | PriceCardUrlBtnStoryblok)[];
  _uid: string;
  component: "price_card";
  [k: string]: any;
}

export interface PriceCardStripeBtnStoryblok {
  price_id: string;
  label: string;
  _uid: string;
  component: "price_card_stripe_btn";
  [k: string]: any;
}

export interface PriceCardUrlBtnStoryblok {
  url?: Exclude<MultilinkStoryblok, {linktype?: "email"} | {linktype?: "asset"}>;
  label: string;
  _uid: string;
  component: "price_card_url_btn";
  [k: string]: any;
}

export interface SectionStoryblok {
  metaData?: any;
  section_id: string;
  section_labelledby: string;
  type: "section" | "article";
  blocks?: (
    | AccordionStoryblok
    | AccordionItemStoryblok
    | ButtonStoryblok
    | ContainerStoryblok
    | ContainerLegacyStoryblok
    | CustomHeroStoryblok
    | CustomRichtextStoryblok
    | DividerStoryblok
    | EmbedTextStoryblok
    | FooterStoryblok
    | FooterColumnStoryblok
    | FormStoryblok
    | FormInputStoryblok
    | FormInputValidationStoryblok
    | FormTextareaStoryblok
    | HeaderStoryblok
    | IconStoryblok
    | ImageStoryblok
    | NavLinkStoryblok
    | NavLogoStoryblok
    | PageStoryblok
    | PriceCardStoryblok
    | PriceCardStripeBtnStoryblok
    | PriceCardUrlBtnStoryblok
    | SectionStoryblok
    | SimpleCardStoryblok
    | SimpleTextStoryblok
    | SvgDividerStoryblok
    | TestimonialStoryblok
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

export interface SimpleCardStoryblok {
  text_content: (TextStoryblok | SimpleTextStoryblok | ImageStoryblok)[];
  self_flex_layout?: any;
  flex: "default" | "flexAuto" | "flexInitial" | "flexNone";
  align_self: "selfAuto" | "selfStart" | "selfEnd" | "selfCenter" | "selfStretch" | "selfBaseline";
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
  _uid: string;
  component: "simple_card";
  [k: string]: any;
}

export interface SimpleTextStoryblok {
  text?: string;
  _uid: string;
  component: "simple_text";
  [k: string]: any;
}

export interface SvgDividerStoryblok {
  svg: "dotsAscending" | "dotsStacked" | "arrowArcUp" | "arrowSquiggleDown";
  fill_color:
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
    | "primary-950"
    | "secondary-50"
    | "secondary-100"
    | "secondary-200"
    | "secondary-300"
    | "secondary-400"
    | "secondary-500"
    | "secondary-600"
    | "secondary-700"
    | "secondary-800"
    | "secondary-900"
    | "secondary-950";
  stroke_color: number | string;
  flip_horizontally?: boolean;
  y_translate_unit?: number | string;
  x_translate_unit?: number | string;
  top_absolute_unit?: number | string;
  right_absolute_unit?: number | string;
  bottom_absolute_unit?: number | string;
  left_absolute_unit?: number | string;
  _uid: string;
  component: "svg_divider";
  [k: string]: any;
}

export interface TestimonialStoryblok {
  testimonial_title: TextStoryblok[];
  testimonial_summary: TextStoryblok[];
  testimonial_full_message: TextStoryblok[];
  testimonial_name: TextStoryblok[];
  testimonial_button_text: TextStoryblok[];
  _uid: string;
  component: "testimonial";
  [k: string]: any;
}

export interface TextStoryblok {
  Content?: any;
  content?: string;
  storyblok_name?: string;
  text_id?: string;
  text_type: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "h7" | "p" | "span" | "blockquote" | "cite" | "sr";
  core_styles?: any;
  text_style:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "h7"
    | "h8"
    | "h9"
    | "h10"
    | "h11"
    | "h12"
    | "para1"
    | "para2"
    | "para3"
    | "para4"
    | "para5"
    | "paraBase"
    | "para6"
    | "para7"
    | "para8"
    | "para9"
    | "para10"
    | "quote"
    | "overline"
    | "sr"
    | "navLink";
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
  font_weight_overwrites?: any;
  custom_styling?: any;
  custom_css?: string;
  rich_text?: RichtextStoryblok;
  multi_line_bloks?: EmbedTextStoryblok[];
  mode?: "text" | "multi-line";
  _uid: string;
  component: "text";
  [k: string]: any;
}
