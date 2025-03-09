# Divider Component

The Divider component is a simple UI element designed to create visual separation between content sections with customizable styling options.

## Purpose

- Create visual separation between content sections
- Provide customizable styling options for horizontal rules
- Allow for consistent divider styling across the application
- Support responsive design with configurable width constraints

## Core Functionalities

1. **Visual Separation**: Creates horizontal lines to separate content sections
2. **Color Customization**: Supports various color options from the theme palette
3. **Thickness Control**: Allows adjustment of divider height/thickness
4. **Width Constraint**: Provides maximum width options for responsive layouts

## Component Options

### Basic Options

- **divider_color**: The background color of the divider (uses theme color system)
- **divider_height**: The height/thickness of the divider in pixels (1-10)
- **divider_max_width**: Maximum width constraint for the divider (0-20 scale)

## Code Examples

### Basic Usage

```svelte
<Divider blok={{
  _uid: "divider-1",
  component: "divider",
  divider_color: "primary-500",
  divider_height: { value: 2 },
  divider_max_width: { value: 16 }
}} />
```

### Full-Width Divider

```svelte
<Divider blok={{
  _uid: "full-width-divider",
  component: "divider",
  divider_color: "secondary-300",
  divider_height: { value: 1 },
  divider_max_width: { value: 0 }
}} />
```

### Thick Accent Divider

```svelte
<Divider blok={{
  _uid: "accent-divider",
  component: "divider",
  divider_color: "primary-800",
  divider_height: { value: 8 },
  divider_max_width: { value: 10 }
}} />
```

## Implementation Notes

- Renders as a `<span>` element with block display property
- Uses Tailwind CSS classes for styling
- Default color is primary-100 if no color is specified
- Max width options correspond to Tailwind's width scale
- Height is directly applied as an inline style
- Automatically centers the divider with margin auto
- Full width (no constraint) is achieved by setting divider_max_width to 0 or not providing it

## List of All Option Names

### Width Options
The divider_max_width parameter accepts values from 0-20, where:
- 0: No max width (full width)
- 1-20: Increasing width constraints, from smallest (max-w-6) to largest (max-w-max)

### Color Options
The divider_color parameter supports the following theme colors:
- none
- default
- primary-50 through primary-950
- secondary-50 through secondary-950

### Height Options
The divider_height parameter accepts values from 1-10, representing the thickness in pixels.