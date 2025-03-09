# AllArticles

The AllArticles component displays a collection of articles with comprehensive filtering and sorting functionality. It allows users to browse, filter, and sort blog articles in a visually appealing grid layout.

## Purpose

- Display a collection of blog articles with consistent card presentation
- Provide intuitive sorting capabilities (by date and alphabetically)
- Enable filtering by article categories/tags
- Create a responsive article browsing experience that works across devices
- Present article metadata in a user-friendly format

## Core Functionalities

1. Renders a grid of article cards with consistent styling
2. Offers multiple sorting options (newest/oldest, alphabetical A-Z/Z-A)
3. Provides tag-based filtering with toggleable options
4. Displays article previews with images, titles, and summaries
5. Implements smooth animations when filtering and sorting articles
6. Adapts layout responsively for different screen sizes
7. Shows tooltips for tag labels to provide more context

## Component Options

The AllArticles component doesn't accept direct props but instead retrieves data through Svelte's context API.

### Required Context Data

| Context Key | Description |
|-------------|-------------|
| 'articles' | Function that returns the collection of article data from Storyblok |
| 'tags' | Function that returns the collection of tag data for filtering |

### Article Data Structure

Each article object should include:
- `id`: Unique identifier
- `slug`: URL slug for the article
- `content`: Object containing article details:
  - `article_title`: Title of the article
  - `article_date`: Publication date
  - `article_tag`: Category/tag information
  - `article_summary`: Brief description
  - `article_cover_image`: Image information
  - `article_content`: Full content data

### Sorting Options

| Option | Description |
|--------|-------------|
| date_newest | Sort articles by date (newest first) |
| date_oldest | Sort articles by date (oldest first) |
| alph_a-z | Sort articles alphabetically (A to Z) |
| alph_z-a | Sort articles alphabetically (Z to A) |

## Code Examples

### Basic Implementation

```svelte
<script>
  import { AllArticles } from '$lib/components/content';
  import { setContext } from 'svelte';
  
  // Provide article and tag data through context
  setContext('articles', () => articleData);
  setContext('tags', () => tagData);
</script>

<AllArticles />
```

### Parent Component with Data Fetching

```svelte
<script>
  import { AllArticles } from '$lib/components/content';
  import { setContext } from 'svelte';
  import { onMount } from 'svelte';
  
  let articles = [];
  let tags = [];
  
  onMount(async () => {
    // Fetch articles and tags from an API
    articles = await fetchArticles();
    tags = await fetchTags();
    
    // Provide the data through context
    setContext('articles', () => articles);
    setContext('tags', () => tags);
  });
</script>

{#if articles.length > 0 && tags.length > 0}
  <AllArticles />
{:else}
  <p>Loading articles...</p>
{/if}
```

## Implementation Notes

- Uses Svelte's `flip` animation to provide smooth transitions when articles are reordered
- Implements the `ToggleGroup` component from bits-ui for tag filtering
- Manages complex filter logic that handles the "All" option intelligently
- Ensures the sort order is maintained when changing filters
- Displays condensed tag labels on mobile devices to optimize space
- Implements tooltips for tags to show full category names when hovering
- Uses reactive statements ($effect) to automatically update the article list when sort or filter options change
- Renders all articles through the ArticleCard component for consistent presentation