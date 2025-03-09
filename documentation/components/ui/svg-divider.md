# SvgDivider Component

The SvgDivider component is a versatile decorative element that renders customizable SVG graphics with extensive positioning and styling options.

## Purpose

- Add decorative SVG elements to layouts
- Provide visual indicators or dividers between content sections
- Support precise positioning and styling of SVG graphics
- Enhance visual design with scalable vector graphics

## Core Functionalities

1. **SVG Selection**: Offers a selection of predefined SVG paths
2. **Positioning**: Supports absolute positioning with customizable units
3. **Transformation**: Allows translation, rotation, and flipping of SVG elements
4. **Color Customization**: Provides fill and stroke color options from the theme palette
5. **Responsive Sizing**: Implements responsive width and height across breakpoints
6. **Custom Styling**: Enables custom container styling

## Component Options

### Basic Options

- **svg**: The SVG pattern to display (e.g., 'dotsAscending', 'arrowArcUp')
- **width**: Width of the SVG element (0-20 scale)
- **height**: Height of the SVG element (0-20 scale)
- **fill_color**: The fill color for the SVG
- **stroke_color**: The stroke color for the SVG

### Transformation Options

- **rotate**: Rotation angle in degrees (0-360)
- **flip_horizontally**: Boolean to flip the SVG horizontally
- **x_translate_value**: Horizontal translation value
- **x_translate_unit**: Unit for horizontal translation (px, %, rem, em, vw)
- **y_translate_value**: Vertical translation value
- **y_translate_unit**: Unit for vertical translation (px, %, rem, em, vh)

### Positioning Options

- **top_absolute_value**: Distance from top edge
- **top_absolute_unit**: Unit for top position
- **right_absolute_value**: Distance from right edge
- **right_absolute_unit**: Unit for right position
- **bottom_absolute_value**: Distance from bottom edge
- **bottom_absolute_unit**: Unit for bottom position
- **left_absolute_value**: Distance from left edge
- **left_absolute_unit**: Unit for left position

### Styling Options

- **custom_container_css**: Custom CSS for the container

## Available SVG Types

The component includes the following SVG patterns:
- **dotsAscending**: A pattern of dots in ascending size
- **dotsStacked**: A pattern of vertically stacked dots
- **arrowArcUp**: An upward curved arrow
- **arrowSquiggleDown**: A squiggly downward arrow

## Code Examples

### Basic Usage

```svelte
<SvgDivider blok={{
  _uid: "svg-divider-1",
  component: "svg_divider",
  svg: "dotsAscending",
  width: { value: 8 },
  height: { value: 12 },
  fill_color: "primary-500",
  stroke_color: "none",
  rotate: { value: 0 }
}} />
```

### Positioned SVG with Translation

```svelte
<SvgDivider blok={{
  _uid: "positioned-svg",
  component: "svg_divider",
  svg: "arrowArcUp",
  width: { value: 10 },
  height: { value: 10 },
  fill_color: "secondary-600",
  stroke_color: "none",
  top_absolute_value: { value: 20 },
  top_absolute_unit: "px",
  left_absolute_value: { value: 10 },
  left_absolute_unit: "%",
  y_translate_value: { value: -15 },
  y_translate_unit: "px",
  rotate: { value: 45 }
}} />
```

### Flipped SVG with Custom Container

```svelte
<SvgDivider blok={{
  _uid: "flipped-svg",
  component: "svg_divider",
  svg: "arrowSquiggleDown",
  width: { value: 15 },
  height: { value: 15 },
  fill_color: "primary-300",
  stroke_color: "primary-600",
  flip_horizontally: true,
  custom_container_css: "overflow: visible; height: 5rem;"
}} />
```

## Implementation Notes

- Uses SVG markup for crisp rendering at any scale
- Responsive sizes adapt to different screen sizes
- SVGs are positioned absolutely within their container
- Container has a minimum height to ensure visibility
- All SVGs use a consistent viewBox of "0 0 72 72"
- Supports CSS transforms (translate, rotate) for precise positioning
- Color transitions have a 200ms duration for smooth color changes
- All SVG paths are predefined within the component

## List of All Option Names

### SVG Options
- svg
- width
- height
- fill_color
- stroke_color
- custom_container_css

### Transformation Options
- rotate
- flip_horizontally
- x_translate_value
- x_translate_unit
- y_translate_value
- y_translate_unit

### Positioning Options
- top_absolute_value
- top_absolute_unit
- right_absolute_value
- right_absolute_unit
- bottom_absolute_value
- bottom_absolute_unit
- left_absolute_value
- left_absolute_unit