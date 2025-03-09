# CustomRichtext Component

The CustomRichtext component is designed to render rich text content from Storyblok CMS with customizable styling options and support for embedded components.

## Purpose

- Render rich text content from Storyblok with enhanced styling
- Provide typography customization options
- Support embedded components within rich text content
- Apply consistent prose styling across rich text content

## Core Functionalities

1. **Rich Text Rendering**: Renders Storyblok rich text content with proper formatting
2. **Typography Customization**: Allows customization of heading styles (serif or sans-serif)
3. **Component Embedding**: Supports embedding Storyblok components within rich text
4. **Responsive Typography**: Uses Tailwind's prose classes for responsive typography
5. **Node Rendering**: Handles different node types in the rich text content

## Component Options

### Basic Options

- **text**: The rich text content from Storyblok
- **heading_styles**: Font family selection for headings ('serif' or default sans-serif)

## Code Examples

### Basic Usage

```svelte
<CustomRichtext blok={{
  _uid: "richtext-1",
  component: "custom_richtext",
  heading_styles: "serif",
  text: {
    type: "doc",
    content: [
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "This is a paragraph with rich text formatting."
          }
        ]
      }
    ]
  }
}} />
```

### With Embedded Components

```svelte
<CustomRichtext blok={{
  _uid: "richtext-with-components",
  component: "custom_richtext",
  heading_styles: "sans",
  text: {
    type: "doc",
    content: [
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "Text before embedded component."
          }
        ]
      },
      {
        type: "blok",
        attrs: {
          body: [
            {
              _uid: "button-in-richtext",
              component: "button",
              label: "Click Me",
              link: {
                url: "/contact"
              }
            }
          ]
        }
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "Text after embedded component."
          }
        ]
      }
    ]
  }
}} />
```

## Implementation Notes

- Uses Tailwind's prose classes for consistent typography styling
- Leverages Storyblok's rich text renderer for proper HTML output
- Special styling for list items to improve readability
- Supports font weight customization for headings
- Handles different content node types (paragraphs, bloks, etc.)
- Renders at full width with no maximum width constraint