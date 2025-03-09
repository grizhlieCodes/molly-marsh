# Container Component

The Container component is a highly flexible and customizable layout component designed to provide robust layout control across multiple breakpoints. It's built to work with Storyblok CMS and uses Tailwind CSS for styling.

## Purpose

- Serve as the primary layout building block for constructing complex UI layouts
- Provide fine-grained control over spacing, alignment, and responsive behavior
- Enable layout customization across five different breakpoints (default, mm, lm, md, lg)
- Support flexible box model with various display, flex, and positioning options
- Allow for nested components through Storyblok integration

## Core Functionalities

1. **Flexible Layouts**: Implements flexbox layout with extensive customization options
2. **Responsive Control**: Provides separate controls for each breakpoint
3. **Styling Options**: Includes background colors, borders, padding, margin, and more
4. **Aspect Ratio Control**: Supports custom aspect ratios across breakpoints
5. **Content Rendering**: Renders child components from Storyblok
6. **Visual Customization**: Allows for background colors, border styles, and overflow behavior
7. **Custom Styling**: Accepts custom CSS for additional styling needs

## Component Options

The Container component has an extensive set of options that can be configured at five different breakpoints:
- **default**: Mobile (smallest screens)
- **mm**: Medium mobile
- **lm**: Large mobile/small tablet
- **md**: Medium devices (tablets)
- **lg**: Large devices (desktop)

### Option Categories

#### Identification and Custom Styling
- container_id
- container_class
- custom_css

#### Visual Styling
- overflow
- background_color
- border_color
- border_radius
- border_thickness

#### Layout Control (per breakpoint)
- display_*
- content_direction_*
- justify_content_*
- align_items_*
- wrap_content_*
- gap_*
- text_align_*

#### Flex Properties (per breakpoint)
- flex_*
- align_self_*

#### Spacing (per breakpoint)
- margin_top_*
- margin_bottom_*
- all_padding_*
- vertical_padding_*
- horizontal_padding_*

#### Dimensions (per breakpoint)
- max_width_*
- width_*
- height_*
- min_width_default
- min_height_default
- aspect_ratio_*

## Code Examples

### Basic Container

```svelte
<Container blok={{
  _uid: "container-1",
  component: "container_two",
  content_direction_default: "column",
  align_items_default: "center",
  justify_content_default: "center",
  background_color: "primary-100",
  padding_default: { value: 5 },
  blocks: [/* child components here */]
}} />
```

### Responsive Layout Container

```svelte
<Container blok={{
  _uid: "responsive-container",
  component: "container_two",
  // Mobile: vertical stack
  content_direction_default: "column",
  gap_default: { value: 4 },
  // Desktop: horizontal row
  content_direction_md: "row",
  justify_content_md: "between",
  gap_md: { value: 8 },
  // Padding that increases with screen size
  all_padding_default: { value: 4 },
  all_padding_md: { value: 8 },
  all_padding_lg: { value: 10 },
  blocks: [/* child components here */]
}} />
```

### Styled Container With Border

```svelte
<Container blok={{
  _uid: "styled-container",
  component: "container_two",
  background_color: "secondary-50",
  border_color: "secondary-500",
  border_thickness: { value: 1 },
  border_radius: { value: 3 },
  all_padding_default: { value: 5 },
  max_width_default: { value: 16 },
  blocks: [/* child components here */]
}} />
```

### Container with Aspect Ratio

```svelte
<Container blok={{
  _uid: "aspect-container",
  component: "container_two",
  aspect_ratio_default: "16/9",
  aspect_ratio_md: "3/2",
  overflow: "hidden",
  blocks: [/* child components here */]
}} />
```

## Implementation Notes

- The component builds complex styling by combining classes from multiple breakpoints
- Uses CSS custom properties for aspect ratio handling
- All breakpoint-specific options cascade (larger breakpoints inherit from smaller if not specified)
- Integrates with Storyblok's `StoryblokComponent` for rendering nested components
- The container is built with a flexbox model as its foundation
- All spacing and dimension values are mapped to Tailwind CSS utility classes

## List of All Option Names

### Static Options
- container_id
- container_class
- custom_css
- overflow
- background_color
- border_color
- border_radius
- border_thickness

### Breakpoint Specific Options
For each breakpoint (default, mm, lm, md, lg), the following options are available:

#### Display and Flex Options
- display_[breakpoint]
- content_direction_[breakpoint]
- justify_content_[breakpoint]
- align_items_[breakpoint]
- wrap_content_[breakpoint]
- flex_[breakpoint]
- align_self_[breakpoint]
- text_align_[breakpoint]

#### Spacing Options
- gap_[breakpoint]
- margin_top_[breakpoint]
- margin_bottom_[breakpoint]
- all_padding_[breakpoint]
- vertical_padding_[breakpoint]
- horizontal_padding_[breakpoint]

#### Dimension Options
- max_width_[breakpoint]
- width_[breakpoint]
- height_[breakpoint]
- aspect_ratio_[breakpoint]

#### Default-Only Options
- min_width_default
- min_width_unit_default
- min_height_default
- min_height_unit_default