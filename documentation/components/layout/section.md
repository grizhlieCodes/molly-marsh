# Section Component

The Section component is a flexible layout component that creates semantic section or article elements with extensive styling and layout customization options.

## Purpose

- Create semantic sectioning elements (`<section>` or `<article>`) with appropriate ARIA attributes
- Provide comprehensive layout control with flexbox properties
- Support consistent spacing and styling across the application
- Allow embedding of various child components within the section
- Enable fine-tuned customization of visual appearance

## Core Functionalities

1. **Semantic Structure**: Creates proper semantic sectioning elements
2. **Accessibility Support**: Implements ARIA attributes for improved accessibility
3. **Layout Control**: Provides extensive flexbox layout options (justify, align, gap)
4. **Spacing Control**: Offers granular control over padding in both directions
5. **Width Constraints**: Supports different maximum width options
6. **Visual Styling**: Allows customization of background color and overflow behavior
7. **Content Embedding**: Renders child components from Storyblok

## Component Options

### Semantic Options
- **type**: Element type to render ('section' or 'article')
- **section_id**: ID attribute for the element
- **section_labelledby**: ARIA labelledby attribute for accessibility

### Layout Options
- **grid_span**: Maximum width constraint for the section
- **justify_content**: Flexbox justify-content property
- **align_items**: Flexbox align-items property
- **gap**: Spacing between child elements
- **vertical_padding**: Padding on top and bottom
- **horizontal_padding**: Padding on left and right

### Visual Styling
- **background_color**: Background color of the section
- **overflow**: Overflow behavior
- **customStyling**: Custom CSS styles as a string

### Content
- **blocks**: Array of Storyblok components to render within the section

## Code Examples

### Basic Usage

```svelte
<Section blok={{
  _uid: "section-1",
  component: "section",
  type: "section",
  section_id: "features",
  section_labelledby: "features-heading",
  grid_span: "centeredSpan3",
  justify_content: "center",
  align_items: "center",
  gap: { value: 8 },
  vertical_padding: { value: 10 },
  horizontal_padding: { value: 5 },
  background_color: "primary-50",
  overflow: "visible",
  blocks: [
    {
      _uid: "section-heading",
      component: "text",
      text_type: "h2",
      text_style: "h2",
      text_align: "center",
      content: "Our Features"
    },
    // Other section content...
  ]
}} />
```

### Article with Custom Styling

```svelte
<Section blok={{
  _uid: "article-1",
  component: "section",
  type: "article",
  section_id: "blog-post",
  section_labelledby: "post-title",
  grid_span: "centeredSpan2",
  justify_content: "start",
  align_items: "stretch",
  gap: { value: 5 },
  vertical_padding: { value: 8 },
  horizontal_padding: { value: 4 },
  background_color: "none",
  overflow: "hidden",
  customStyling: "border-left: 4px solid var(--color-primary-500);",
  blocks: [
    // Article content...
  ]
}} />
```

## Implementation Notes

### Base Styling
- Renders with base classes that center the section horizontally (mx-auto)
- Uses flexbox with column direction (flex flex-col)
- Centers text by default (text-center)
- Has relative positioning and automatic height (relative h-max)

### Grid Span Options
- **centeredSpan1**: max-w-[50rem]
- **centeredSpan2**: max-w-[60rem]
- **centeredSpan3**: max-w-[70rem]
- **centeredSpan4**: max-w-[80rem]
- **centeredSpan5**: max-w-[90rem]
- **centeredSpan6**: max-w-[100rem]
- **fullSpan**: max-w-none

### Spacing and Padding
- Vertical and horizontal padding values range from 0-20, with responsive scaling for different viewport sizes
- Gap values also range from 0-20, with responsive scaling
- All spacing values map to Tailwind CSS utility classes

### Component Construction
- Uses svelte:element to dynamically render either a section or article element
- Applies storyblokEditable directive for Storyblok's visual editor
- Combines styling from multiple sources into a single class string
- Conditionally renders child components when they exist
- Uses $derived for efficient style computation