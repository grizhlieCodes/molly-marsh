# Article

The Article component renders a full blog article with rich content and metadata. It serves as the primary display for individual article pages, presenting the article's complete content in a formatted, readable layout.

## Purpose

- Display full article content with proper typography and formatting
- Present article metadata (title, date, category, author)
- Showcase featured images with appropriate sizing and positioning
- Create an optimal reading experience for blog content
- Support rich text content from Storyblok CMS

## Core Functionalities

1. Renders complete article content with proper formatting of headings, paragraphs, lists, etc.
2. Displays article metadata including publication date and categories
3. Shows the article's featured image in a prominent position
4. Formats article content with appropriate typography and spacing
5. Integrates with Storyblok's content delivery system
6. Supports responsive design for optimal viewing on different devices

## Component Options

### Required Props

| Property | Type | Description |
|----------|------|-------------|
| article_title | string | The title of the article |
| article_tag | object | The article's category/tag information |
| article_summary | string | Summary/excerpt of the article (may be used for meta description) |
| article_cover_image | object | Featured image data including filename and alt text |
| article_date | string | Publication date of the article |
| article_content | object | Rich text content from Storyblok |
| article_slug | string | URL slug of the article (for metadata and sharing) |

### Article Tag Structure

```javascript
{
  content: {
    tag_data: "category-id",      // Identifier for the tag
    tag_full: "Full Category Name", // Complete category name
    tag_label_short: "Category"     // Abbreviated category label
  }
}
```

### Article Content Structure

```javascript
{
  type: "doc",
  content: [
    // Array of rich text nodes from Storyblok
    // May include paragraphs, headings, lists, quotes, etc.
  ]
}
```

## Code Examples

### Basic Usage

```svelte
<script>
  import { Article } from '$lib/components/content';
  
  // Article data from Storyblok or API
  const articleData = {
    article_title: "5 Strategies for Effective Leadership",
    article_tag: {
      content: {
        tag_data: "leadership",
        tag_full: "Leadership Development",
        tag_label_short: "Leadership"
      }
    },
    article_summary: "Discover practical approaches to enhance your leadership capabilities.",
    article_cover_image: {
      filename: "https://example.com/images/leadership",
      alt: "Person leading a team meeting"
    },
    article_date: "2023-06-15",
    article_content: {
      // Rich text content structure
      type: "doc",
      content: [/* content nodes */]
    },
    article_slug: "effective-leadership-strategies"
  };
</script>

<Article {...articleData} />
```

### In a Page Route

```svelte
<script>
  import { Article } from '$lib/components/content';
  
  // Article data from page props
  export let data;
  const { article } = data;
</script>

<Article {...article.content} article_slug={article.slug} />
```

## Implementation Notes

- Likely uses a combination of custom styling and Storyblok's rich text renderer
- Implements proper semantic HTML structure for SEO and accessibility
- Formats publication date using the `formatNoteDate` utility function
- May include social sharing options for the article
- Implements responsive design that adapts to different screen sizes
- Could include navigation to previous/next articles or related content
- Probably uses the same tag display format as the ArticleCard component
- Potentially includes schema.org markup for improved SEO
- May implement progressive loading for large articles or lazy loading for images
- Could include scroll position tracking for analytics