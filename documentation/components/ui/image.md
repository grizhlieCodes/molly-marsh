# Image Component

The Image component is a comprehensive and highly customizable component for displaying images with advanced styling, positioning, and filtering options. It's designed to work with Storyblok CMS and provides responsive image handling.

## Purpose

- Display images with fine-tuned control over appearance and behavior
- Provide extensive image customization options (filters, aspect ratio, positioning)
- Support responsive image delivery with appropriate sizes for different devices
- Allow for accessibility features like decorative image handling
- Optimize image loading with lazy loading and low-quality placeholders

## Core Functionalities

1. **Responsive Images**: Delivers different image sizes based on viewport width
2. **Aspect Ratio Control**: Maintains consistent image proportions
3. **Position Control**: Allows precise control of image object position across breakpoints
4. **Visual Effects**: Supports multiple filter effects (blur, grayscale, sepia, etc.)
5. **Performance Optimization**: Implements lazy loading and low-quality image placeholders
6. **Accessibility Support**: Handles decorative images appropriately for screen readers
7. **Dimensional Control**: Provides control over image dimensions with max-width/height constraints
8. **Custom Decorations**: Supports custom decorative elements around images

## Component Options

### Basic Options

- **image**: The Storyblok asset to display
- **aspect_ratio**: Controls the proportional relationship between width and height
- **decorative_image**: Boolean to indicate if the image is decorative (affects accessibility)
- **figcaption**: Optional caption text for the image

### Size and Dimension Options

- **max_width**: Maximum width constraint
- **max_height**: Maximum height constraint
- **min_height**: Minimum height constraint
- **min_height_unit**: Unit for minimum height (rem, em, px, vh, %)
- **base_width**: Base width value for the image

### Position and Display Options

- **object_position_[breakpoint]**: Object position at different breakpoints
- **border_radius**: Controls the rounded corners of the image
- **custom_decoration**: Adds decorative elements around the image

### Image Quality and Performance

- **image_quality**: Determines the image sizes delivered to different devices

### Visual Effects

- **mix_blendmode**: Controls how the image blends with its background
- **blur_filter**: Applies a blur effect to the image
- **grayscale_filter**: Controls grayscale conversion
- **sepia_filter**: Applies sepia tone effect
- **invert_filter**: Inverts the image colors
- **saturate_filter**: Controls color saturation
- **contrast_filter**: Adjusts image contrast

## Code Examples

### Basic Usage

```svelte
<Image blok={{
  _uid: "image-1",
  component: "image",
  image: {
    filename: "https://my-cdn.com/images/example.jpg",
    alt: "Example image description"
  },
  aspect_ratio: "16:9",
  max_width: "medium",
  border_radius: { value: 3 }
}} />
```

### Image with Filters and Effects

```svelte
<Image blok={{
  _uid: "filtered-image",
  component: "image",
  image: {
    filename: "https://my-cdn.com/images/example.jpg",
    alt: "Filtered image"
  },
  aspect_ratio: "1:1",
  grayscale_filter: { value: 80 },
  blur_filter: { value: 1 },
  contrast_filter: { value: 4 },
  mix_blendmode: "overlay",
  max_width: "50%"
}} />
```

### Decorative Image with Custom Positioning

```svelte
<Image blok={{
  _uid: "decorative-image",
  component: "image",
  image: {
    filename: "https://my-cdn.com/images/pattern.jpg"
  },
  decorative_image: true,
  aspect_ratio: "3:2",
  object_position_default: "center",
  object_position_md: "top",
  custom_decoration: "diagonalBackdrops",
  border_radius: { value: 5 }
}} />
```

## Implementation Notes

- Uses the `<picture>` element to deliver different image sizes based on screen size
- Implements lazy loading for performance optimization
- Shows a low-quality placeholder while the main image loads
- Uses CSS variables for responsive object positioning across breakpoints
- Object position allows granular control at different breakpoints (default, mm, lm, md, lg)
- Filters are applied through Tailwind CSS classes
- All dimension settings use Tailwind's sizing utilities
- Custom decorations use CSS ::before and ::after pseudo-elements
- Border radius is applied to both the image and any decorative elements

## List of All Option Names

### Basic Options
- image
- figcaption
- decorative_image
- custom_decoration

### Dimension Options
- aspect_ratio
- max_width
- max_height
- min_height
- min_height_unit
- base_width

### Object Position Options (per breakpoint)
- object_position_default
- object_position_mm
- object_position_lm
- object_position_md
- object_position_lg

### Style Options
- border_radius
- mix_blendmode
- image_quality

### Filter Options
- blur_filter
- grayscale_filter
- sepia_filter
- invert_filter
- saturate_filter
- contrast_filter