# SimpleText Component

The SimpleText component is a minimal text rendering component designed to display simple text content from Storyblok CMS.

## Purpose

- Provide a lightweight component for rendering basic text strings
- Integrate with Storyblok for content management
- Offer a simpler alternative to the more complex Text component when only basic text is needed

## Core Functionalities

1. **Basic Text Rendering**: Renders simple text content without additional formatting
2. **Storyblok Integration**: Supports Storyblok's editable interface
3. **Efficient Rendering**: Lightweight component optimized for simple text display

## Component Options

### Basic Options

- **text**: The text content to display

## Code Examples

### Basic Usage

```svelte
<SimpleText blok={{
  _uid: "simple-text-1",
  component: "simple_text",
  text: "This is a simple text component."
}} />
```

### Conditional Usage

```svelte
{#if showText}
  <SimpleText blok={{
    _uid: "conditional-text",
    component: "simple_text",
    text: "This text only shows conditionally."
  }} />
{/if}
```

## Implementation Notes

- Renders as a `<span>` element for inline text display
- Does not apply any default styling to the text
- Contains conditional rendering to ensure the component only renders when a blok is provided
- Can be used within other components that need simple text elements
- Provides integration with Storyblok's visual editor through the storyblokEditable directive