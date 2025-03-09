# Text Component

The Text component is a versatile and powerful typography component designed to handle various text rendering scenarios in the application. It integrates with Storyblok CMS and provides extensive customization options for styling, alignment, and formatting text content.

## Purpose

- Provide a unified component for rendering different types of text elements (headings, paragraphs, quotes, etc.)
- Support rich text content from Storyblok CMS
- Allow for extensive styling customization including font styles, weights, colors, and alignment
- Support both simple text content and multi-line block content

## Core Functionalities

1. **Rich Text Rendering**: Renders Storyblok rich text content with custom schema options
2. **Element Type Selection**: Dynamically renders as different HTML elements (h1, h2, h3, p, span, etc.)
3. **Font Styling**: Supports various text styles with responsive sizing
4. **Text Alignment**: Provides options for text alignment (left, right, center, justify)
5. **Color Customization**: Allows overwriting default text colors
6. **Font Weight Control**: Supports both variable and fixed font weights
7. **Maximum Width Setting**: Controls the maximum width of the text container
8. **Multi-line Block Support**: Can render collections of Storyblok components within the text

## Component Options

### Basic Options

- **text_type**: Determines the HTML element to render (h1, h2, h3, h4, h5, h6, p, span, blockquote, cite, sr)
- **text_style**: Controls the visual styling of text independently from the HTML element type
- **text_align**: Sets the text alignment (left, center, right, justify, inherit)
- **text_id**: Optional ID attribute for the text element
- **content**: Plain text content (used when rich_text is not provided)

### Advanced Options

- **text_color_overwrite**: Overrides the default text color
- **max_width**: Controls the maximum width of the text container
- **font_weight_variable**: Sets a custom variable font weight (1-1000)
- **font_weight_set**: Sets a standard font weight (100, 200, 300, etc.)
- **custom_css**: Apply custom CSS styles directly to the element
- **mode**: Choose between standard 'text' mode or 'multi-line' mode for complex content

## Code Examples

### Basic Usage

```svelte
<!-- Simple heading with default styling -->
<Text blok={{
  _uid: "heading-1",
  component: "text",
  text_type: "h2",
  text_style: "h2",
  text_align: "left",
  content: "Welcome to our website",
}} />

<!-- Paragraph with custom styling -->
<Text blok={{
  _uid: "paragraph-1",
  component: "text",
  text_type: "p",
  text_style: "para5",
  text_align: "justify",
  content: "This is a paragraph with justify alignment.",
}} />
```

### Using Rich Text from Storyblok

```svelte
<!-- Rich text content from Storyblok -->
<Text blok={{
  _uid: "rich-text-1",
  component: "text",
  text_type: "div",
  text_style: "paraBase",
  text_align: "left",
  rich_text: {
    type: "doc",
    content: [
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "This is rich text with "
          },
          {
            type: "text",
            text: "formatted content",
            marks: [{ type: "bold" }]
          }
        ]
      }
    ]
  }
}} />
```

### Custom Text Styling

```svelte
<!-- Text with custom color and font weight -->
<Text blok={{
  _uid: "custom-text-1",
  component: "text",
  text_type: "h3",
  text_style: "h3",
  text_align: "center",
  text_color_overwrite: "primary-600",
  font_weight_variable: { value: 450 },
  content: "Custom styled heading",
}} />

<!-- Text with maximum width constraint -->
<Text blok={{
  _uid: "limited-width-text",
  component: "text",
  text_type: "p",
  text_style: "para6",
  text_align: "left",
  max_width: { value: 15 },
  content: "This text will have a maximum width applied based on the value 15.",
}} />
```

### Multi-line Mode

```svelte
<!-- Multiple text blocks rendered in sequence -->
<Text blok={{
  _uid: "multi-line-text",
  component: "text",
  text_type: "div",
  text_style: "paraBase",
  text_align: "left",
  mode: "multi-line",
  multi_line_bloks: [
    {
      _uid: "embedded-text-1",
      component: "embed_text",
      content: "First line of text"
    },
    {
      _uid: "embedded-text-2",
      component: "embed_text",
      content: "Second line of text",
      mode: "inline"
    }
  ]
}} />
```

## Implementation Notes

- The component dynamically adapts its styling based on provided options
- Rich text rendering preserves formatting while allowing for custom schema overrides
- Built with responsive design in mind, with different text sizes for different screen sizes
- Uses Tailwind CSS utility classes for styling
- Preserves accessibility with support for screen reader only text (`sr` option)