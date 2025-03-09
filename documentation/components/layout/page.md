# Page Component

The Page component serves as the primary layout wrapper for page content, providing a structured container that integrates with Storyblok CMS and SvelteKit routing.

## Purpose

- Provide a semantic `<main>` element for page content
- Integrate with SvelteKit's routing system
- Support accessibility through proper ARIA labeling
- Allow dynamic rendering of content blocks from Storyblok
- Provide positioning control for the main content area

## Core Functionalities

1. **Page Structure**: Creates a semantic main element with appropriate attributes
2. **Dynamic ID Generation**: Automatically generates page-specific IDs based on the current route
3. **Accessibility Support**: Implements proper ARIA labeling for screen readers
4. **Content Rendering**: Renders child components from Storyblok
5. **Positioning Control**: Allows control over the CSS position property of the main element

## Component Options

### Basic Options

- **pageName**: Name of the page (optional, derived from route if not provided)
- **mainAriaLabel**: ARIA label for the main element, improves accessibility
- **position**: CSS position property ('relative', 'absolute', or 'fixed')
- **blocks**: Array of Storyblok components to render as page content

## Code Examples

### Basic Usage

```svelte
<Page 
  pageName="Home"
  mainAriaLabel="Main content"
  position="relative"
  blok={{
    _uid: "home-page",
    component: "page",
    mainAriaLabel: "Home page content",
    pagePosition: "relative",
    blocks: [
      {
        _uid: "hero-section",
        component: "section",
        // Section configuration...
      },
      {
        _uid: "features-section",
        component: "section",
        // Section configuration...
      }
    ]
  }} 
/>
```

### With Absolute Positioning

```svelte
<Page 
  pageName="Contact"
  mainAriaLabel="Contact page content"
  position="absolute"
  blok={{
    _uid: "contact-page",
    component: "page",
    mainAriaLabel: "Contact page content",
    pagePosition: "absolute",
    blocks: [
      // Page content blocks...
    ]
  }} 
/>
```

## Implementation Notes

- Renders as a `<main>` element with appropriate ARIA attributes
- Automatically generates an ID based on the current route (e.g., 'home-main' for the home page)
- Uses SvelteKit's `page` store to access the current route information
- Applies position styling from the `pagePosition` property
- Spans the full width and height of its container
- Integrates with Storyblok's editable interface through the `storyblokEditable` directive
- Conditionally renders child components only when they exist
- The first argument in `page.route.id` is used to identify the current page