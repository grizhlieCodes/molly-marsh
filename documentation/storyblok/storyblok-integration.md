# Storyblok Integration: Complete Lifecycle Documentation

This document explains how the application integrates with Storyblok, from initial configuration to rendering content on different page types. It provides a comprehensive overview of the data flow and component rendering process.

## Table of Contents

1. [Core Configuration](#core-configuration)
2. [Application Initialization](#application-initialization)
3. [Content Fetching Flow](#content-fetching-flow)
4. [Rendering Process](#rendering-process)
5. [Component Bridge System](#component-bridge-system)
6. [Route Structure and Content Types](#route-structure-and-content-types)
7. [Special Content Types](#special-content-types)
8. [Visual Editor Integration](#visual-editor-integration)

## Core Configuration

The Storyblok integration starts with configuring components and setting up the SDK in `src/lib/integrations/storyblok/useStoryblok.js`. This file:

1. Registers all Svelte components that will be used to render Storyblok content
2. Maps Storyblok component names to their Svelte implementations
3. Configures SDK settings like caching and API options

```javascript
// Simplified example from useStoryblok.js
export async function useStoryblok(accessToken = '') {
  accessToken = accessToken === '' ? PUBLIC_STORYBLOK_ACCESS_TOKEN : accessToken;

  storyblokInit({
    accessToken: PUBLIC_STORYBLOK_ACCESS_TOKEN,
    use: [apiPlugin],
    components: {
      // Layout components
      page,
      section,
      container,
      // UI components
      text,
      image,
      button,
      // ... other components
    },
    apiOptions: {
      https: true,
      maxRetries: 2,
      cache: {
        type: 'memory'
      }
    }
  });
}
```

The component mapping is crucial - it connects Storyblok's component identifiers with your Svelte components. Each component in the `components` object should have a name matching its Storyblok counterpart.

## Application Initialization

The application's Storyblok integration initializes in the root layout file (`src/routes/+layout.ts`):

1. The layout load function initializes Storyblok and creates the API client
2. It fetches global navigation data from Storyblok
3. It determines which version of content to load (draft or published)
4. It passes this data and the Storyblok API client to child routes

```javascript
// From +layout.ts
export const load: LayoutLoad = async ({ url }) => {
  let storyblokApi;
  let initError = null;

  try {
    await useStoryblok();
    storyblokApi = await useStoryblokApi();
  } catch (initializationError) {
    console.error('Error initializing Storyblok API:', initializationError);
    initError = initializationError;
  }

  // Determine content version based on environment
  const version = dev || url.searchParams.has('_storyblok') ? 'draft' : 'published';
  
  // Fetch navigation data
  let navData = null;
  if (storyblokApi) {
    try {
      const navResponse = await storyblokApi.get('cdn/stories/_navigation', {
        version: 'published',
        cv: Date.now()
      });
      navData = navResponse?.data?.story?.content;
    } catch (error) {
      console.error('Navigation fetch error:', error);
    }
  }

  return {
    url: url.pathname,
    storyblokApi,
    initError: initError?.message,
    navData,
    storyblokInitialized: !!storyblokApi,
    version
  };
};
```

This approach ensures that the Storyblok API client is available throughout the application and that global content like navigation is fetched only once.

## Content Fetching Flow

The content fetching flow follows a hierarchical pattern:

1. **Root Layout**: Initializes Storyblok and fetches global data (navigation)
2. **Page Routes**: Fetch specific content for each page type
   - Homepage: Fetches the "home" story
   - Dynamic routes: Fetch content based on the URL slug
   - Nested routes: Fetch specialized content like blog articles

Each route's page load function accesses the Storyblok API client from the parent layout and fetches its specific content:

```javascript
// From +page.ts (homepage)
export const load: PageServerLoad = async ({ url, params, parent }) => {
  const { storyblokApi } = await parent();
  const version = dev || url.searchParams.has('_storyblok') ? 'draft' : 'published';

  const dataStory = await storyblokApi.get(`cdn/stories/home`, {
    version,
    resolve_links: 'url'
  });

  return {
    story: dataStory.data.story
  };
};
```

For dynamic routes like `/[slug]`, the slug parameter determines which content to fetch:

```javascript
// From [slug]/+page.server.ts
export const load: PageServerLoad = async ({ parent, params, url }) => {
  const { storyblokApi } = await parent();
  const version = dev || url.searchParams.has('_storyblok') ? 'draft' : 'published';
  const slug = params.slug;

  try {
    dataStory = await storyblokApi.get(`cdn/stories/${slug}`, {
      version,
      cv: Date.now()
    });
    
    // Special case for blog pages
    if (slug.includes('blog')) {
      // Fetch blog-related content...
    }
    
    return {
      story: dataStory.data.story,
      // Additional data as needed
    };
  } catch (err) {
    // Error handling...
  }
};
```

## Rendering Process

The rendering process transforms Storyblok content into Svelte components:

1. Page components receive story data from their respective load functions
2. The `StoryblokComponent` iterates through the content structure
3. Each Storyblok component is mapped to its Svelte counterpart (defined in useStoryblok.js)
4. Components are rendered recursively, building the complete page

```svelte
<!-- From +page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  let { data } = $props();
  import { useStoryblokBridge, StoryblokComponent } from '@storyblok/svelte';

  let mounted = $state(false);
  let story = $state(data.story);

  onMount(async () => {
    if (typeof window !== 'undefined') {
      useStoryblokBridge(
        story.id,
        (newStory) => {
          story = newStory;
        },
        {
          preventClicks: true,
          resolveLinks: 'url'
        }
      );
    }
    mounted = true;
  });
</script>

{#key story}
  {#if story && mounted}
    <StoryblokComponent blok={story.content}></StoryblokComponent>
  {/if}
{/key}
```

Each Svelte component receives its content via the `blok` prop, which contains the component's data from Storyblok.

## Component Bridge System

The Visual Editor integration is handled by the Storyblok Bridge, which enables real-time content updates:

1. The `useStoryblokBridge` function connects to the Storyblok Visual Editor
2. It listens for content changes and updates the local content state
3. The `storyblokEditable` directive marks components as editable in the Visual Editor

```svelte
<!-- Inside a typical component -->
<script>
  import { storyblokEditable } from '@storyblok/svelte';
  let { blok } = $props();
</script>

<div use:storyblokEditable={blok} class="some-styling">
  <!-- Component content -->
</div>
```

This system creates a bidirectional connection between your application and the Storyblok editor, enabling visual editing directly in the context of your site.

## Route Structure and Content Types

The application handles several content types with different routing patterns:

1. **Home Page** (`/`): Fetches the "home" story
2. **Standard Pages** (`/[slug]`): Dynamic routes for regular content pages
3. **Blog Articles** (`/[slug]/[slug]`): Nested routes for blog articles
4. **Special Pages**: Content types with custom handlers

For blog articles, there's a special nested route structure:

```javascript
// From [slug]/[slug]/+page.server.ts
export const load: PageServerLoad = async ({ parent, url, params }) => {
  const slug = url.pathname.slice(1);
  const version = dev || url.searchParams.has('_storyblok') ? 'draft' : 'published';
  
  const article = await sbJsClient.get(`cdn/stories/${slug}`, {
    content_type: 'article',
    version,
    resolve_relations: ['article.article_tag']
  });

  return {
    article: article.data.story
  };
};
```

This pattern allows for organizing content hierarchically while maintaining clean URLs.

## Special Content Types

The application handles special content types like blog articles and forms:

### Blog System

For blog pages, the application fetches both the blog page content and the articles:

```javascript
// Simplified excerpt from [slug]/+page.server.ts
if (slug.includes('blog')) {
  try {
    tags = await storyblokApi.get('cdn/stories', {
      content_type: 'tag',
      version: 'published'
    });

    articles = await storyblokApi.get('cdn/stories', {
      content_type: 'article',
      version: 'published',
      resolve_relations: ['article.article_tag']
    });
  } catch (err) {
    console.log('err: ', err);
  }
}
```

This data is then provided to the page component via Svelte's context API:

```javascript
// In [slug]/+page.svelte
$effect(() => {
  if (data.articles) {
    setContext('articles', () => data.articles);
  }
});

$effect(() => {
  if (data.tags) {
    setContext('tags', () => data.tags);
  }
});
```

### Forms

Forms are handled through a special process:

1. Form components are identified in the content
2. Form schemas are extracted during the load phase
3. Form data is passed to components via Svelte's context API
4. Form submissions are processed in server action handlers

```javascript
// From [slug]/+page.server.ts
if (dataStory && dataStory.data && dataStory.data.story) {
  function isComponentForm(item) {
    return item && typeof item === 'object' && item.component === 'form';
  }
  const allForms = await getAllFormsDuringLoad(dataStory.data.story.content, isComponentForm);

  if (allForms && allForms.length > 0) {
    return {
      forms: allForms,
      story: dataStory.data.story,
      // Other data...
    };
  }
}
```

## Visual Editor Integration

The Visual Editor integration offers real-time content editing:

1. The application detects if it's running in the Storyblok editor (via URL parameter `_storyblok`)
2. In development or editor mode, draft content is fetched
3. The Storyblok Bridge connects the editor to your components
4. Content changes in the editor immediately update the page

```javascript
// Editor detection
const version = dev || url.searchParams.has('_storyblok') ? 'draft' : 'published';

// Bridge setup
useStoryblokBridge(
  story.id,
  (newStory) => {
    story = newStory;
  },
  {
    preventClicks: true,
    resolveLinks: 'url'
  }
);
```

This allows content editors to see their changes immediately and in context, improving the content management workflow.

## Conclusion

The application's Storyblok integration follows a systematic approach:

1. Component registration in `useStoryblok.js`
2. Global initialization in the root layout
3. Page-specific content fetching in route load functions
4. Recursive component rendering with `StoryblokComponent`
5. Special handling for content types like blog articles and forms
6. Real-time editing via the Storyblok Bridge

This architecture provides a flexible, component-based content management system that separates content from presentation while enabling visual editing.