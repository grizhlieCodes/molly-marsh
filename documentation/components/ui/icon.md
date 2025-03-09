# Icon Component

The Icon component is a versatile SVG icon renderer that provides access to a predefined set of icons with customizable styling options.

## Purpose

- Provide a consistent way to display SVG icons across the application
- Allow for customization of icon colors (fill and stroke)
- Support integration with Storyblok CMS
- Offer a collection of commonly used icons accessible by name

## Core Functionalities

1. **Icon Selection**: Renders SVG icons from a predefined collection by name
2. **Color Customization**: Allows customization of both fill and stroke colors
3. **CSS Integration**: Works with the theme's color system for consistent styling
4. **Custom Styling**: Supports custom CSS for additional styling needs
5. **Conditional Rendering**: Only renders when a valid icon is specified

## Component Options

### Basic Options

- **icon**: The name of the icon to display (e.g., 'heart', 'user', 'calendar')
- **icon_fill**: The fill color for the icon using the theme's color system
- **icon_stroke**: The stroke color for the icon using the theme's color system
- **custom_css**: Custom CSS styles to apply to the icon container

## Available Icons

The component includes a wide range of icons including:
- UI controls: arrowRight, chevronDown, plus, etc.
- Communication: chatBubble, twoChatBubbles, paperAirplane, etc.
- User interface: user, userGroup, users, etc. 
- Commerce: cart, gbp, etc.
- Status indicators: checkCircle, oneTick, twoTicks, etc.
- Objects: home, calendar, image, etc.
- And many more

## Code Examples

### Basic Usage

```svelte
<Icon blok={{
  _uid: "icon-1",
  component: "icon",
  icon: "heart",
  icon_fill: "primary-500",
  icon_stroke: "none"
}} />
```

### Icon with Custom CSS

```svelte
<Icon blok={{
  _uid: "custom-icon",
  component: "icon",
  icon: "calendar",
  icon_fill: "secondary-700",
  icon_stroke: "secondary-900",
  custom_css: "transform: scale(1.5); margin: 10px;"
}} />
```

### Conditional Icon Display

```svelte
{#if showNotification}
  <Icon blok={{
    _uid: "notification-icon",
    component: "icon",
    icon: "bell",
    icon_fill: "primary-600"
  }} />
{/if}
```

## Implementation Notes

- Icons are pre-defined SVG paths stored within the component
- Default size is set to 24x24 pixels (w-6 h-6)
- Uses Tailwind CSS classes for color management
- Supports both fill and stroke color customization
- Includes color transition effect with 200ms duration
- Renders inside a div container for proper positioning
- Only renders when a valid icon name is provided
- Uses inline SVG for better control over styling and animation

## List of All Option Names

### Icon Options
- icon (string, required)
- icon_fill (color theme option)
- icon_stroke (color theme option)
- custom_css (string)

### Color Options
Both icon_fill and icon_stroke accept the following values:
- none
- default
- primary-50 through primary-950
- secondary-50 through secondary-950