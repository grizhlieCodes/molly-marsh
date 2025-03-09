# CtaContainer Component

The CtaContainer component is a specialized layout component designed to create prominent call-to-action sections with a distinctive styling.

## Purpose

- Create visually distinct call-to-action (CTA) sections
- Provide a consistent container for promotional content
- Use a styled container with primary brand color and rounded corners
- Support embedding of various child components within the CTA container

## Core Functionalities

1. **Styled Container**: Provides a pre-styled container with primary brand color and rounded corners
2. **Component Embedding**: Allows embedding of Storyblok components within the container
3. **Visual Focus**: Creates a strong visual element to attract attention to important content
4. **Responsive Design**: Maintains proper display across different viewport sizes

## Component Options

- **bloks**: Array of Storyblok components to render within the container

## Code Examples

### Basic Usage

```svelte
<CtaContainer blok={{
  _uid: "cta-section-1",
  component: "cta_container",
  bloks: [
    {
      _uid: "cta-heading",
      component: "text",
      text_type: "h2",
      text_style: "h2",
      text_align: "center",
      content: "Ready to Get Started?"
    },
    {
      _uid: "cta-button",
      component: "button",
      label: "Contact Us Today",
      link: { url: "/contact" },
      button_style: "primary",
      button_size: "large"
    }
  ]
}} />
```

### With Multiple Components

```svelte
<CtaContainer blok={{
  _uid: "newsletter-cta",
  component: "cta_container",
  bloks: [
    {
      _uid: "newsletter-heading",
      component: "text",
      text_type: "h3",
      text_style: "h3",
      text_align: "center",
      content: "Subscribe to Our Newsletter"
    },
    {
      _uid: "newsletter-description",
      component: "text",
      text_type: "p",
      text_style: "para5",
      text_align: "center",
      content: "Stay updated with our latest news and offers."
    },
    {
      _uid: "newsletter-form",
      component: "form",
      // Form configuration...
    }
  ]
}} />
```

## Implementation Notes

- Uses a grid layout for easy component centering
- Features a deep primary color background (bg-surface-primary-900)
- Has rounded corners on the top left and top right (rounded-tl-4xl rounded-tr-4xl)
- Maximum width is set to 90% of parent width (max-w-[90%])
- Height adjusts automatically to content (h-max)
- Centers its child components using CSS grid (place-items-center)
- Conditionally renders child components only when they exist
- Doesn't apply any default spacing between child components