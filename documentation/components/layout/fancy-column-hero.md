# FancyColumnHero Component

The FancyColumnHero component is a specialized hero section layout that arranges content in a vertical column format with specific styling and responsive behavior.

## Purpose

- Provide a pre-styled hero section with a vertical column layout
- Create a visually appealing introduction section for pages
- Support responsive image handling across different screen sizes
- Organize hero content in a structured, predictable way

## Core Functionalities

1. **Section Structure**: Creates a semantic section element with proper accessibility attributes
2. **Content Organization**: Arranges content in a vertical column format (heading, image, text, CTA)
3. **Responsive Design**: Adapts layout and styling for different viewport sizes
4. **Component Embedding**: Renders various child components for different parts of the hero
5. **Image Handling**: Provides specialized image styling and responsive behavior

## Component Options

The FancyColumnHero component expects the following structure in its blok property:

### Section Configuration
- **section**: Array containing section configuration with:
  - **section_id**: ID attribute for the section element
  - **section_labelledby**: ARIA labelledby attribute for accessibility

### Content Elements
- **hero_heading**: Array of heading components
- **hero_image**: Array of image components
- **hero_description**: Array of text components for the hero description
- **hero_cta**: Array of call-to-action components (typically buttons)

## Code Examples

### Basic Usage

```svelte
<FancyColumnHero blok={{
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

### Layout and Structure
- Renders as a `<section>` element with appropriate ARIA attributes
- Uses a flex column layout for content arrangement
- Centers content horizontally
- Applies consistent spacing between elements (gap-10)
- Has horizontal padding (px-6) and vertical padding (py-12)
- Sets a maximum width of 4xl (max-w-4xl) and centers the section horizontally

### Content Elements
- Each content element is wrapped in a div with appropriate class names:
  - `.fancy-column-hero__heading` for the heading
  - `.fancy-column-hero__image` for the image
  - `.fancy-column-hero__text` for the description text (with max-w-3xl)
  - `.fancy-column-hero__button` for the CTA button(s)

### Responsive Image Handling
- Applies special styling for images at different breakpoints:
  - Mobile (<460px): Square aspect ratio (1:1)
  - Small devices (>=460px): 2:1 aspect ratio
  - Medium devices (>=768px): 413:144 aspect ratio
- Adjusts image object position across breakpoints for optimal framing
- Default object position focuses on 60% horizontal, 40% vertical
- On larger screens, adjusts to 60% horizontal, 0% vertical

### Rendering and Content Flow
- Each main section (heading, image, description) expects exactly one component
- The CTA section supports multiple components with conditional rendering
- Uses StoryblokComponent to render each content element