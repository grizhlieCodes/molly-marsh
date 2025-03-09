# CustomHero Component

The CustomHero component serves as a flexible wrapper for different hero section layouts, dynamically selecting and rendering the appropriate hero style based on configuration.

## Purpose

- Provide a centralized component for managing different hero section styles
- Enable easy switching between different hero layouts through Storyblok
- Maintain consistent hero section structure while allowing layout variations
- Simplify the implementation of new hero styles by using a modular approach

## Core Functionalities

1. **Dynamic Hero Selection**: Selects the appropriate hero component based on configuration
2. **Storyblok Integration**: Works with Storyblok CMS for content management
3. **Conditional Rendering**: Only renders when a valid hero style is specified
4. **Component Registry**: Maintains a registry of available hero components

## Component Options

### Basic Options

- **hero_section_style**: The style/layout of hero section to use (e.g., 'fancyColumn')
- Additional options specific to the selected hero style

## Available Hero Styles

- **fancyColumn**: A column-based hero layout with heading, image, text, and call-to-action components

## Code Examples

### Basic Usage

```svelte
<CustomHero blok={{
  _uid: "hero-1",
  component: "custom_hero",
  hero_section_style: "fancyColumn",
  section: [
    {
      section_id: "hero-section",
      section_labelledby: "hero-heading"
    }
  ],
  hero_heading: [
    {
      _uid: "hero-heading",
      component: "text",
      text_type: "h1",
      text_style: "h1",
      content: "Welcome to Our Website"
    }
  ],
  hero_image: [
    {
      _uid: "hero-image",
      component: "image",
      image: {
        filename: "https://example.com/hero.jpg",
        alt: "Hero image"
      }
    }
  ],
  hero_description: [
    {
      _uid: "hero-description",
      component: "text",
      text_type: "p",
      text_style: "paraBase",
      content: "Discover our services and solutions."
    }
  ],
  hero_cta: [
    {
      _uid: "hero-cta",
      component: "button",
      label: "Learn More",
      link: { url: "/services" }
    }
  ]
}} />
```

## Implementation Notes

- Uses dynamic component selection based on the `hero_section_style` property
- Currently implements the 'fancyColumn' style, but is designed to be extensible
- Renders inside a div container with Storyblok's editable interface
- Conditional rendering ensures the component only renders when a valid hero style is specified
- The hero components can be extended by adding new entries to the `heroSectionOptions` object
- Internal state tracks whether the blok has a valid hero section style
- Each hero style component receives the entire blok object as a prop