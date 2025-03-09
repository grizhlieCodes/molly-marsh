# ReportButton

The ReportButton component provides a fixed-position button in the bottom-right corner of the page that allows users to report issues with the website. It captures detailed information about the user's environment, takes a screenshot, and submits this data to the server.

## Purpose

- Provide an easy way for users to report website issues or bugs
- Collect comprehensive diagnostic information to help resolve issues
- Capture visual evidence through screenshots
- Streamline the bug reporting process for both users and developers
- Enable effective debugging with detailed context information

## Core Functionalities

1. Displays a fixed-position button in the bottom-right corner of the page
2. Captures screenshots of the current page using the MediaDevices API
3. Collects browser information, screen dimensions, and URL data
4. Gathers console errors that occurred during the session
5. Submits the collected data to the server via a POST request
6. Provides user feedback during the submission process

## Component Options

This component does not accept any configuration options as it's designed to be a self-contained utility. It's implemented directly in the code rather than being configured through Storyblok.

## Code Examples

### Basic Implementation

The component is typically included once in the main layout of the application:

```svelte
<!-- In your layout file -->
<ReportButton />
```

## Implementation Notes

- Uses the `fixed` positioning to ensure the button is always visible in the bottom-right corner
- Captures screenshots using the MediaDevices API with `getDisplayMedia()`, which requires user permission
- Processes the screenshot as a base64-encoded image for submission
- Collects detailed browser information:
  - User agent
  - Browser dimensions
  - Screen dimensions
  - Current URL and pathname
  - Console errors that occurred during the session
- Uses a form submission approach for reliability, with a hidden iframe to avoid page navigation
- Shows loading indicators during the submission process
- Provides success/error feedback to the user
- Designed to work across different browsers and devices
- The report data is sent to the `/api/email/send-error-report` endpoint
- The button has a low opacity by default and becomes more visible on hover