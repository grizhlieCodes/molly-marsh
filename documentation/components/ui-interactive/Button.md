# Button

The Button component provides a customizable, interactive button element with rich styling options, hover effects, and various configuration possibilities. It's built with accessibility and user experience in mind, offering consistent styling while remaining flexible.

## Purpose

- Create consistent, visually appealing call-to-action elements
- Provide interactive elements for user navigation and form submissions
- Support different visual themes and sizes to match design requirements
- Enable smooth hover effects and focus states for improved user experience

## Core Functionalities

1. Renders a semantically correct button or anchor element based on the provided URL
2. Supports different sizes (1-5) for text size, padding, and spacing
3. Implements primary and secondary theme options with distinct styling
4. Offers width variations (full-width or max-content)
5. Handles different target behaviors for links (new tab, current tab)
6. Provides animated hover effects with custom transitions
7. Includes focus styling for accessibility
8. Integrates with Storyblok CMS for content management

## Component Options

### Basic Options

| Property | Type | Description |
|----------|------|-------------|
| content | Array | Array of Storyblok components (icons or text) to render inside the button |
| url | Object | URL configuration from Storyblok multilink field |
| label | String | Accessibility label for the button |
| target | String | Target behavior for links: 'newTab', 'currentTab', or 'none' |

### Styling Options

| Property | Type | Description |
|----------|------|-------------|
| button_theme | String | Visual theme: 'primary' or 'secondary' |
| button_width | String | Width configuration: 'full' or 'max' |
| button_size | Object | Size configuration (1-5) controlling text size, padding, and spacing |

#### Size Options (button_size.value)

| Size | Text Size | Padding | Gap |
|------|-----------|---------|-----|
| 1 | text-sm (lg:text-base) | px-4 py-2 | gap-1.5 |
| 2 | text-base (lg:text-lg) | px-5 py-3 | gap-1.5 |
| 3 | text-lg | px-6 py-4 | gap-2 |
| 4 | text-xl | px-8 py-5 | gap-2.5 |
| 5 | text-2xl | px-10 py-6 | gap-3 |

#### Theme Options

| Theme | Description |
|-------|-------------|
| primary | Uses primary brand colors with matching hover effects |
| secondary | Uses secondary colors with corresponding hover effects |

#### Width Options

| Width | Description |
|-------|-------------|
| full | Full width (w-full) |
| max | Maximum width needed for content (w-full max-w-max) |

## Code Examples

### Basic Button with Text

```svelte
<!-- In Storyblok -->
<Button 
  content={[SimpleText Component]}
  url={internal or external link}
  label="Click me"
  target="currentTab"
  button_theme="primary"
  button_width="max"
  button_size={value: 2}
/>
```

### Button with Icon and Text

```svelte
<!-- In Storyblok -->
<Button 
  content={[Icon Component, SimpleText Component]}
  url={internal or external link}
  label="Learn more"
  target="newTab"
  button_theme="secondary"
  button_width="full"
  button_size={value: 3}
/>
```

## Implementation Notes

- The Button component uses the bits-ui Button component for accessibility
- Custom CSS is applied for hover effects using a ::before pseudo-element
- The hover effect is controlled via JavaScript with the buttonHoverManager action
- All styling uses CSS variables for theming, allowing for consistent design system implementation
- The component is fully responsive with different text sizes at various breakpoints
- The button renders as a semantic anchor (`<a>`) element since it always includes a URL
- Font styling includes uppercase text and consistent font weight (font-[620])
- Focus styles are applied through the group-focus-within utility classes