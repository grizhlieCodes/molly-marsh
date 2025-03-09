# CookieBanner

The CookieBanner component displays a notification banner at the bottom of the page to inform users about cookie usage and privacy policies. It allows users to acknowledge this information and stores their preference to prevent the banner from appearing on subsequent visits.

## Purpose

- Comply with privacy regulations by informing users about cookie usage
- Provide users with access to the cookie policy for more information
- Obtain user acknowledgment for cookie usage
- Create a minimally intrusive user experience while meeting legal requirements
- Store user preferences to avoid showing the banner repeatedly

## Core Functionalities

1. Displays a fixed-position banner at the bottom of the page
2. Provides information about cookie usage and a link to the cookie policy
3. Includes an acknowledgment button to dismiss the banner
4. Stores user acknowledgment in localStorage to prevent the banner from reappearing
5. Checks localStorage on component load to determine whether to show the banner

## Component Options

This component does not accept any configuration options as it's designed to be a self-contained utility. It's implemented directly in the code rather than being configured through Storyblok.

## Code Examples

### Basic Implementation

The component is typically included once in the main layout of the application:

```svelte
<!-- In your layout file -->
<CookieBanner />
```

## Implementation Notes

- Uses the `fixed` positioning to ensure the banner appears at the bottom of the page
- Stores the user's acknowledgment in localStorage with the key "cookieConsent"
- Only shows the banner if "cookieConsent" is not set in localStorage
- The banner includes:
  - An informative message about cookie usage
  - A link to the cookie policy page
  - An "OK" button to acknowledge and dismiss
- Applies a clean, minimalist design with appropriate spacing and typography
- Uses a semi-transparent background color to maintain visibility without being overly intrusive
- The component fades in when it first appears for a smoother user experience
- On mobile devices, the banner takes up more vertical space to ensure readability
- The cookie policy link opens in the same tab to maintain the user's browsing context
- The localStorage value is set without an expiration, so the user won't see the banner again until they clear their browser data