# CalEmbed

The CalEmbed component embeds a Cal.com scheduling widget into the page, allowing users to book appointments directly from the website. It offers customization options for appearance and behavior, and integrates with the user's information from localStorage.

## Purpose

- Enable seamless appointment scheduling directly on the website
- Integrate with Cal.com's scheduling service for calendar management
- Provide a user-friendly interface for booking appointments
- Automatically fill in user information when available
- Support customization of the booking widget's appearance

## Core Functionalities

1. Embeds Cal.com's scheduling widget using their JavaScript SDK
2. Supports different calendar views (month, week, day)
3. Offers customization of colors and theme
4. Automatically fills the user's email from localStorage when available
5. Integrates with Storyblok CMS for content management and configuration
6. Provides responsive design for various screen sizes

## Component Options

### Basic Options

| Property | Type | Description |
|----------|------|-------------|
| cal_username | String | Cal.com username for the correct calendar |
| cal_theme | String | Theme setting: 'light', 'dark', or 'auto' |
| cal_view | String | Calendar view: 'month', 'week', or 'day' |
| cal_hide_event_type_details | Boolean | Whether to hide detailed event information |
| cal_scheduling_instructions | String | Optional instructions displayed before booking |

### Advanced Options

| Property | Type | Description |
|----------|------|-------------|
| cal_background_color | String | Background color for the booking widget |
| cal_brand_color | String | Primary brand color for buttons and highlights |
| cal_text_color | String | Text color for the booking widget |
| cal_locale | String | Locale setting for internationalization (e.g., 'en', 'fr') |

## Code Examples

### Basic Calendar Embed

```svelte
<!-- In Storyblok -->
<CalEmbed
  cal_username="mollymarsh"
  cal_theme="light"
  cal_view="month"
  cal_hide_event_type_details={false}
/>
```

### Customized Calendar Embed

```svelte
<!-- In Storyblok -->
<CalEmbed
  cal_username="mollymarsh"
  cal_theme="auto"
  cal_view="week"
  cal_hide_event_type_details={true}
  cal_scheduling_instructions="Select a time that works for you."
  cal_background_color="#f8f9fa"
  cal_brand_color="#4f46e5"
  cal_text_color="#1f2937"
  cal_locale="en"
/>
```

## Implementation Notes

- The component dynamically loads the Cal.com JavaScript SDK when the component mounts
- User email is retrieved from localStorage to pre-fill the booking form
- The embed is initialized with configuration options using the Cal.js API
- Default values ensure the component works even with minimal configuration
- The component uses an onMount lifecycle method to initialize after the DOM is ready
- A loading indicator could be added for better user experience while the Cal.js SDK loads
- The component automatically adjusts to fit the container's width
- Calendar styling is controlled through Cal.com's theming system with the provided options
- The component is designed to be responsive, working well on both desktop and mobile devices
- Calendar views (month, week, day) affect how the initial calendar is displayed to users
- The hide_event_type_details option can be used to create a more streamlined booking experience