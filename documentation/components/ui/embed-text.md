# EmbedText Component

The EmbedText component is a lightweight component designed to render rich text content within other components, particularly useful when embedded inside the Text component's multi-line mode.

## Purpose

- Provide a simple way to embed rich text content within other components
- Allow for inline or block-level display of text content
- Ensure consistent rendering of rich text from Storyblok CMS
- Support a simplified HTML structure for embedded text

## Core Functionalities

1. **Rich Text Rendering**: Renders Storyblok rich text content with custom schema
2. **Display Mode Control**: Supports inline or block-level display
3. **Simplified Markup**: Converts block elements to span elements for consistent inline display
4. **Storyblok Integration**: Works seamlessly with Storyblok's visual editor

## Component Options

### Basic Options

- **rich_text**: The rich text content from Storyblok to render
- **display**: Display mode for the text ('none', 'inline', or 'block')

## Code Examples

### Basic Usage

```svelte
<EmbedText blok={{
  _uid: "embed-text-1",
  component: "embed_text",
  rich_text: {
    type: "doc",
    content: [
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "This is embedded text content."
          }
        ]
      }
    ]
  },
  display: "inline"
}} />
```

### Block-Level Display

```svelte
<EmbedText blok={{
  _uid: "block-embed-text",
  component: "embed_text",
  rich_text: {
    type: "doc",
    content: [
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "This text displays as a block element."
          }
        ]
      }
    ]
  },
  display: "block"
}} />
```

### Using Within Text Component's Multi-line Mode

```svelte
<Text blok={{
  _uid: "multi-line-text",
  component: "text",
  text_type: "p",
  text_style: "para5",
  mode: "multi-line",
  multi_line_bloks: [
    {
      _uid: "embed-text-part1",
      component: "embed_text",
      rich_text: { /* rich text content */ },
      display: "inline"
    },
    {
      _uid: "embed-text-part2",
      component: "embed_text",
      rich_text: { /* rich text content */ },
      display: "inline"
    }
  ]
}} />
```

## Implementation Notes

- Uses a custom schema for rich text rendering that simplifies the HTML structure
- Converts block-level elements (paragraphs, headings, blockquotes) to span elements
- Renders inside a div with either inline or block display property
- Supports Storyblok's editable directive for visual editing
- When display is set to 'none', no display property is applied (inherits from parent)
- Particularly useful when combined with the Text component's multi-line mode
- HTML is rendered directly using Svelte's {@html} syntax for the rich text content
- Maintains all marks (bold, italic, etc.) from the rich text while simplifying nodes

## List of All Option Names

- rich_text
- display