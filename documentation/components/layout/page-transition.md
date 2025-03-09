# PageTransition Component

The PageTransition component provides animated transitions between pages in a SvelteKit application, enhancing the user experience when navigating between routes.

## Purpose

- Add smooth animations when transitioning between pages
- Improve perceived performance during page navigation
- Provide a consistent transition experience across the application
- Track animation states through a centralized store
- Support customizable animation duration

## Core Functionalities

1. **Animated Transitions**: Implements fly-in and fly-out animations between page transitions
2. **Animation Tracking**: Updates a global animation state store during transitions
3. **URL Keying**: Uses the current URL as a key to trigger animations between different routes
4. **Customizable Duration**: Allows customization of animation duration
5. **Animation Events**: Provides lifecycle events for animation start and end

## Component Options

### Basic Options

- **children**: Slot content for the component (usually the page content)
- **url**: Current URL to use as a key for animations
- **duration**: Animation duration in milliseconds (defaults to 300ms)

## Code Examples

### Basic Usage in a Layout Component

```svelte
<script>
  import PageTransition from '$lib/components/layout/PageTransition.svelte';
  import { page } from '$app/stores';
</script>

<PageTransition url={$page.url.pathname} duration={300}>
  {() => $$slots.default ? $$slots.default() : null}
</PageTransition>
```

### With Custom Duration

```svelte
<script>
  import PageTransition from '$lib/components/layout/PageTransition.svelte';
  import { page } from '$app/stores';
</script>

<!-- Slower transition for a more dramatic effect -->
<PageTransition url={$page.url.pathname} duration={500}>
  {() => $$slots.default ? $$slots.default() : null}
</PageTransition>
```

### In SvelteKit Layout with Animation State Management

```svelte
<script>
  import PageTransition from '$lib/components/layout/PageTransition.svelte';
  import { page } from '$app/stores';
  import { aniStateStore } from '$lib/stores/animationState.svelte';
  
  // You can subscribe to animation state changes
  $: console.log($aniStateStore.animationState);
</script>

<PageTransition url={$page.url.pathname}>
  {() => $$slots.default ? $$slots.default() : null}
</PageTransition>
```

## Implementation Notes

- Uses Svelte's built-in `fly` transition for animations
- Entry animation flies in from the right (x: 300)
- Exit animation flies out to the left (x: -300)
- Animation duration applies to both entry and exit animations
- Entry animation has a delay equal to the duration to ensure proper sequencing
- Updates the `aniStateStore` with animation states and current URL
- Animation states include 'Intro Started' and 'Intro Ended'
- Tracks component mounting with an internal state variable
- Uses Svelte's key block to trigger animations when the URL changes
- Renders at full width and height (h-full w-full)