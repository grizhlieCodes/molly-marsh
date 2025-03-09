# Accordion

The Accordion component provides a way to organize content into collapsible sections, making information more digestible and reducing visual clutter. It implements the accordion pattern where users can expand or collapse individual sections to view their contents.

## Purpose

- Display content in expandable/collapsible sections to save space
- Create a more organized and approachable interface for content-heavy pages
- Allow users to focus on specific content sections while keeping others hidden

## Core Functionalities

1. Groups related content into expandable/collapsible sections
2. Supports multiple sections being open simultaneously
3. Provides visual feedback for the current state (open/closed)
4. Implements accessibility features through the bits-ui Accordion component
5. Integrates with Storyblok CMS for content management

## Component Options

The Accordion component consists of two parts: the main Accordion container and individual AccordionItem elements.

### Accordion Component Options

| Property | Type | Description |
|----------|------|-------------|
| accordion_items | AccordionItemStoryblok[] | Array of accordion item blocks from Storyblok |

### AccordionItem Component Options

| Property | Type | Description |
|----------|------|-------------|
| accordion_item_title | StoryblokComponent[] | Title content for the accordion item |
| accordion_item_content | StoryblokComponent[] | Content displayed when the accordion item is expanded |

## Code Examples

### Basic Accordion

```svelte
<!-- In Storyblok -->
<Accordion>
  <AccordionItem 
    accordion_item_title={[Text Component with title]} 
    accordion_item_content={[Text Component with content]}
  />
  <AccordionItem 
    accordion_item_title={[Text Component with title]} 
    accordion_item_content={[Text Component with content]}
  />
</Accordion>
```

### Styled Accordion Items

The accordion items can be styled through Storyblok text components:

```svelte
<!-- In Storyblok -->
<Accordion>
  <AccordionItem 
    accordion_item_title={[Text Component with heading styles]} 
    accordion_item_content={[CustomRichtext Component with formatted content]}
  />
</Accordion>
```

## Implementation Notes

- The Accordion component uses the bits-ui Accordion component for accessibility and functionality
- Each AccordionItem is rendered as a collapsible section with a header and content
- When an accordion item is expanded, its content is displayed with a slide transition
- The chevron icon rotates to indicate the current state (expanded or collapsed)
- The component automatically applies focus styles and hover effects
- The `multiple` prop on Accordion.Root allows multiple sections to be open simultaneously
- When expanded, the accordion item has a light background (bg-surface-primary-50) for visual distinction