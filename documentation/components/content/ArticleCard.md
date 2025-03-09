# ArticleCard

The ArticleCard component displays a preview of a blog article with essential information in an attractive card format. It serves as both an informative preview and a navigation element to the full article.

## Purpose

- Present article previews in a consistent, visually appealing format
- Display essential article metadata (title, date, category, summary)
- Feature article cover images to enhance visual appeal
- Provide intuitive navigation to the full article content
- Support responsive layouts for different device sizes

## Core Functionalities

1. Displays article cover image with proper sizing and positioning
2. Shows formatted publication date with consistent styling
3. Displays category/tag with tooltip showing full category name
4. Presents article title and summary with appropriate typography
5. Provides visual feedback on hover with subtle style changes
6. Links to the full article with semantic anchor element
7. Adapts layout between vertical (mobile) and horizontal (desktop) orientations

## Component Options

### Required Props

| Property | Type | Description |
|----------|------|-------------|
| article_title | string | The title of the article |
| article_tag | object | Tag/category information with short and full labels |
| article_summary | string | Brief description of the article content |
| article_cover_image | object | Image data including filename and alt text |
| article_date | string | Publication date of the article |
| article_slug | string | URL slug for linking to the full article |

### Tag Object Structure

The `article_tag` object should include:
```javascript
{
  content: {
    tag_label_short: "Short Label",  // Displayed in the tag pill
    tag_full: "Full Category Name"    // Displayed in tooltip
  }
}
```

### Image Object Structure

The `article_cover_image` object should include:
```javascript
{
  filename: "https://image-url.com/image",  // Base URL for the image
  alt: "Descriptive alt text"               // Accessibility text
}
```

## Code Examples

### Basic Usage

```svelte
<ArticleCard
  article_title="5 Strategies for Effective Leadership"
  article_tag={{
    content: {
      tag_label_short: "Leadership",
      tag_full: "Leadership Development"
    }
  }}
  article_summary="Discover practical approaches to enhance your leadership capabilities in challenging situations."
  article_cover_image={{
    filename: "https://example.com/images/leadership",
    alt: "Person leading a team meeting"
  }}
  article_date="2023-06-15"
  article_slug="effective-leadership-strategies"
/>
```

### In a List Context

```svelte
{#each articles as article}
  <ArticleCard
    article_title={article.content.article_title}
    article_tag={article.content.article_tag}
    article_summary={article.content.article_summary}
    article_cover_image={article.content.article_cover_image}
    article_date={article.content.article_date}
    article_slug={article.slug}
  />
{/each}
```

## Implementation Notes

- Uses responsive layout that switches orientation based on screen size:
  - Vertical card layout on small screens
  - Horizontal layout with side-by-side image and content on larger screens
- Implements tooltips through the Bits UI Tooltip component to show full category name
- Formats dates using the `formatNoteDate` utility function for consistent display
- Sets fixed aspect ratio for the cover image to maintain visual consistency
- Applies hover effects for visual feedback when users interact with the card
- Uses semantic HTML for better accessibility and SEO
- Applies consistent text styling from shared text component options
- Includes a "READ ARTICLE" call-to-action that changes style on hover
- Uses the image's transformation URL parameter (/m/500x0) for optimized loading