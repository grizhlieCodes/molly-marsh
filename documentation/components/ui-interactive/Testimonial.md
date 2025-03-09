# Testimonial

The Testimonial component displays client testimonials in a compact card format with the ability to expand into a modal dialog to show the full testimonial content. It provides an engaging way to showcase social proof with a clean, focused interface.

## Purpose

- Display client testimonials in a space-efficient manner
- Allow users to read the full testimonial content through an expandable modal
- Add social proof to landing pages and service offerings
- Showcase client feedback in a visually appealing format
- Maintain focus on the primary content while providing access to detailed testimonials

## Core Functionalities

1. Displays a compact testimonial card with a summary and optional author name
2. Expands into a full modal dialog when clicked to show the complete testimonial
3. Uses smooth animations for opening and closing the modal
4. Provides keyboard navigation and accessibility features through the bits-ui Dialog component
5. Supports customization of button text and display options
6. Integrates with Storyblok CMS for content management

## Component Options

### Basic Options

| Property | Type | Description |
|----------|------|-------------|
| testimonial_title | StoryblokComponent[] | Title displayed in both the card and modal |
| testimonial_summary | StoryblokComponent[] | Short summary displayed on the card |
| testimonial_full_message | StoryblokComponent[] | Complete testimonial text shown in the modal |
| testimonial_name | StoryblokComponent[] | Name of the person giving the testimonial |
| hide_name_on_front | Boolean | Option to hide the name on the card (still shows in modal) |
| testimonial_button_text | StoryblokComponent[] | Text for the "Read more" button |

## Code Examples

### Basic Testimonial

```svelte
<!-- In Storyblok -->
<Testimonial
  testimonial_title={[Text Component with "Great Experience"]}
  testimonial_summary={[Text Component with "Working with Molly was transformative..."]}
  testimonial_full_message={[Text Component with full testimonial content]}
  testimonial_name={[Text Component with "Jane Smith, CEO"]}
  hide_name_on_front={false}
  testimonial_button_text={[Text Component with "Read more"]}
/>
```

### Testimonial with Hidden Name on Card

```svelte
<!-- In Storyblok -->
<Testimonial
  testimonial_title={[Text Component with "Life-Changing Coaching"]}
  testimonial_summary={[Text Component with "The coaching program exceeded my expectations..."]}
  testimonial_full_message={[Text Component with full testimonial content]}
  testimonial_name={[Text Component with "John Doe, Entrepreneur"]}
  hide_name_on_front={true}
  testimonial_button_text={[Text Component with "See full testimonial"]}
/>
```

## Implementation Notes

- The component uses the bits-ui Dialog component for the modal functionality
- The modal appears with a combination of fade and fly transitions:
  - Background overlay uses a fade transition
  - Dialog content uses a fly transition that slides up from below
- The component is fully accessible with proper keyboard navigation:
  - Dialog can be closed with the Escape key
  - Focus is trapped inside the dialog when open
  - Focus returns to the trigger button when closed
- The dialog has a close button in the top-right corner
- Card styling includes:
  - Shadow effects for depth
  - Border radius for rounded corners
  - Responsive padding that adjusts based on screen size
  - Hover effects to indicate interactivity
- The testimonial name is conditionally rendered on the card based on the hide_name_on_front property
- Dialog content is styled with a maximum width and centered on the screen
- The component uses Tailwind CSS for styling with responsive design principles