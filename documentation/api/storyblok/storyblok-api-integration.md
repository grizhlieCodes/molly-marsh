# Storyblok API Integration (Server-Side)

This documentation explains how the application integrates with Storyblok's API for content management and webhook handling, focusing on the server-side interactions rather than the rendering aspects covered in the previous Storyblok documentation.

## Overview

The server-side Storyblok integration serves several important functions in the application:

1. **Content Loading** - Fetching content from Storyblok's Content Delivery API (CDN)
2. **Webhook Processing** - Handling events when content is published
3. **Newsletter Generation** - Creating email campaigns when articles are published
4. **Form Integration** - Handling form submissions with Storyblok content

The integration uses both the Storyblok JavaScript SDK and direct API calls to implement these features.

## Architecture

```
┌───────────────┐     ┌──────────────────────┐     ┌───────────────┐
│               │     │                      │     │               │
│  SvelteKit    │     │ Server-Side Data     │     │  Storyblok    │
│  Pages        │────▶│ Loading              │────▶│  Content API  │
│               │     │                      │     │               │
└───────────────┘     └──────────────────────┘     └───────────────┘
                                                          │
                                                          │
                                                          ▼
┌───────────────┐     ┌──────────────────────┐     ┌───────────────┐
│               │     │                      │     │               │
│  Article      │────▶│ Webhook Handler      │────▶│  Email        │
│  Publication  │     │                      │     │  Campaign     │
│  (Webhook)    │     │                      │     │  Creation     │
│               │     │                      │     │               │
└───────────────┘     └──────────────────────┘     └───────────────┘
```

## Content Loading

The integration fetches content from Storyblok in several key places:

### Layout Loading

In `/src/routes/+layout.ts`, the application initializes Storyblok and loads global navigation data:

```typescript
export const load: LayoutLoad = async ({ url }) => {
  let storyblokApi;
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

  // Return data for child routes
  return {
    url: url.pathname,
    storyblokApi,
    navData,
    version
  };
};
```

### Page Loading

For individual pages, the content is loaded based on the route:

#### Homepage

```typescript
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

#### Dynamic Routes

```typescript
// From [slug]/+page.server.ts
export const load: PageServerLoad = async ({ parent, params, url }) => {
  const { storyblokApi } = await parent();
  const version = dev || url.searchParams.has('_storyblok') ? 'draft' : 'published';
  const slug = params.slug;

  try {
    // Fetch the story content
    dataStory = await storyblokApi.get(`cdn/stories/${slug}`, {
      version,
      cv: Date.now()
    });
    
    // Special handling for blog pages
    if (slug.includes('blog')) {
      // Fetch blog tags
      tags = await storyblokApi.get('cdn/stories', {
        content_type: 'tag',
        version: 'published'
      });

      // Fetch all articles
      articles = await storyblokApi.get('cdn/stories', {
        content_type: 'article',
        version: 'published',
        resolve_relations: ['article.article_tag']
      });
    }
    
    // Return the data
    return {
      story: dataStory.data.story,
      tags: tags?.data?.stories,
      articles: articles?.data?.stories,
      version
    };
  } catch (err) {
    // Error handling...
  }
};
```

#### Blog Articles

For nested routes like blog articles, the integration uses a separate client:

```typescript
// From [slug]/[slug]/+page.server.ts
export const load: PageServerLoad = async ({ parent, url, params }) => {
  const slug = url.pathname.slice(1);
  const version = dev || url.searchParams.has('_storyblok') ? 'draft' : 'published';
  
  // Create a Storyblok client
  const sbJsClient = new StoryblokClient({
    accessToken: PUBLIC_STORYBLOK_ACCESS_TOKEN
  });
  
  // Fetch the article with its tag relationship
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

## Webhook Processing

The integration includes webhook handling for Storyblok events, primarily for article publications:

### IP Validation

The webhook handler validates that requests come from Storyblok's IP addresses:

```typescript
// Storyblok AWS IPs
const STORYBLOK_IPS = [
  '3.68.233.63',  // EU (Frankfurt)
  '3.127.108.63', // EU (Frankfurt)
  '3.67.105.118', // EU (Frankfurt)
  '63.177.76.6',  // Additional Storyblok IP
  '3.76.34.218'
];

function isValidStoryblokIP(ip) {
  if (SKIP_IP_VALIDATION) {
    return true;
  }
  return STORYBLOK_IPS.includes(ip);
}
```

### Event Processing

The webhook handler processes publication events:

```typescript
export async function POST({ request, getClientAddress }) {
  try {
    // Validate IP
    const clientIP = getOriginalIP(request);
    if (!isValidStoryblokIP(clientIP)) {
      return json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check event type
    const topic = request.headers.get('x-storyblok-topic');
    const body = await request.json();

    if (topic !== 'story.published') {
      return json({
        message: 'Webhook received but ignored - not a publication event'
      });
    }

    // Get story data
    const storyRes = await Storyblok.getStory(body.story_id, {
      version: 'published'
    });
    const storyData = storyRes.data.story;

    // Check if it's an article
    if (storyData?.content?.component !== 'article') {
      return json({
        message: 'Webhook received but ignored - not an article'
      });
    }

    // Process article publication...
  } catch (error) {
    // Error handling...
  }
}
```

## Newsletter Generation

When articles are published, the webhook handler creates an email newsletter:

### MJML Template Generation

The handler uses MJML to create responsive HTML emails:

```typescript
// Create MJML template
const renderedHtml = renderRichText(newsletterData.content.article_content);
let mjmlTemplate = `
  <mjml>
    <mj-head>
      <!-- Email styles and configuration -->
    </mj-head>
    <mj-body background-color="#f4f4f4">
      <mj-section>
        <mj-column>
          <mj-text>
            <h1>${newsletterData.title}</h1>
          </mj-text>
        </mj-column>
      </mj-section>
      <mj-section>
        <mj-column>
          <mj-text>
            ${renderedHtml}
          </mj-text>
        </mj-column>
      </mj-section>
    </mj-body>
  </mjml>
`;

// Convert MJML to HTML
const { html, errors } = mjml2html(mjmlTemplate);
```

### Email Campaign Creation

The processed content is sent to the email service provider (Brevo):

```typescript
// Initialize Brevo API client
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = SECRET_BREVO_KEY;

const apiInstance = new SibApiV3Sdk.EmailCampaignsApi();
const emailCampaigns = new SibApiV3Sdk.CreateEmailCampaign();

// Set up email campaign
emailCampaigns.name = `Newsletter - ${storyData.name}`;
emailCampaigns.subject = storyData.name;
emailCampaigns.sender = {
  name: 'Molly Marsh',
  email: 'molly@mollymarshcoaching.com'
};
emailCampaigns.type = 'classic';
emailCampaigns.htmlContent = html;
emailCampaigns.recipients = { listIds: [brevoListId] };

// Create campaign
const campaignData = await apiInstance.createEmailCampaign(emailCampaigns);
```

## Legacy Forwarding

The integration includes a legacy endpoint that forwards requests to the new API:

```typescript
export async function POST({ request, fetch }) {
  try {
    console.log('Forwarding request to new Brevo API endpoint');
    
    // Forward the request to the new endpoint
    const response = await fetch('/api/brevo/create-campaign', {
      method: 'POST',
      headers: request.headers,
      body: request.body,
      duplex: 'half' // Required when forwarding a request body
    });
    
    // Get the response
    const responseData = await response.json();
    
    // Return the response from the new endpoint
    return json(responseData, { status: response.status });
  } catch (err) {
    // Error handling...
  }
}
```

## Form Integration

The Storyblok integration includes form handling capabilities:

### Form Discovery

The integration scans Storyblok content for form components:

```typescript
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

### Form Actions

Forms found in Storyblok content can be processed through server actions:

```typescript
// From [slug]/+page.server.ts
export const actions = {
  sendQuery: async ({ request, fetch }) => {
    try {
      const reqClone = request.clone();
      const formData = await request.formData();
      const schemaDataString = JSON.parse(formData.get('schemaData'));
      const formSchema = createFormSchema(schemaDataString);
      const form = await superValidate(reqClone, zod(formSchema));

      if (!form.valid) {
        return fail(400, {
          form,
          type: 'failure',
          message: 'Validation failed'
        });
      }

      // Send email
      const emailResponse = await fetch('/api/email/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type: 'contact-form',
          data: form.data
        })
      });

      // Handle response...
    } catch (error) {
      // Error handling...
    }
  },
  // Additional actions...
};
```

## Error Handling

The integration implements comprehensive error handling:

1. **Retry Logic** - Retries Storyblok API initialization if it fails
2. **Error Logging** - Detailed error logging for debugging
3. **Graceful Degradation** - Continues operation even if some components fail
4. **Appropriate Status Codes** - Returns meaningful HTTP status codes

```typescript
// Retry logic example
if (!storyblokApi) {
  const maxRetries = 3;
  for (let i = 0; i < maxRetries; i++) {
    try {
      storyblokApi = await useStoryblokApi();
      if (storyblokApi) {
        break;
      }
    } catch (error) {
      console.error(`Attempt ${i + 1} to get API instance failed:`, error);
      if (i < maxRetries - 1) {
        await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1)));
      }
    }
  }

  // Final fallback
  if (!storyblokApi) {
    await useStoryblok();
    storyblokApi = await useStoryblokApi();
  }
}
```

## Security Considerations

The integration implements several security measures:

1. **IP Validation** - Validates that webhooks come from Storyblok's IPs
2. **Environment Variables** - Stores sensitive information in environment variables
3. **Request Validation** - Validates incoming data before processing
4. **Error Control** - Limits error information in responses

## Integration with Other Systems

### Email Integration

The webhook handler integrates with the Brevo API to send newsletters:

```typescript
// Set up email campaign
emailCampaigns.name = `Newsletter - ${storyData.name}`;
emailCampaigns.subject = storyData.name;
emailCampaigns.sender = {
  name: 'Molly Marsh',
  email: 'molly@mollymarshcoaching.com'
};
emailCampaigns.type = 'classic';
emailCampaigns.htmlContent = html;
emailCampaigns.recipients = { listIds: [brevoListId] };

// Create campaign
const campaignData = await apiInstance.createEmailCampaign(emailCampaigns);
```

### Form Submission Integration

Form data from Storyblok is integrated with the email API:

```typescript
// Send email
const emailResponse = await fetch('/api/email/send-email', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    type: 'contact-form',
    data: form.data
  })
});
```

## Configuration

The integration requires the following environment variables:

1. **PUBLIC_STORYBLOK_ACCESS_TOKEN** - Storyblok API access token
2. **SECRET_BREVO_KEY** - Brevo API key for newsletter sending

## Future Considerations

Based on the code, there are signs of transitions between different email providers:

1. **Brevo Integration** - Currently used for newsletter sending
2. **Legacy Forwarding** - API endpoints that forward to new implementations
3. **MailerLite Comments** - Commented-out code suggests previous use of MailerLite

This indicates that the email provider integration might be in flux, with ongoing migration between services.

## Conclusion

The Storyblok API integration provides robust server-side functionality for content management and webhook handling. It enables dynamic content loading for pages and blog articles, automatic newsletter generation when articles are published, and seamless form integration.

The architecture follows best practices for security, error handling, and code organization, with clear separation of concerns between content loading, webhook processing, and newsletter generation. The integration with email services enables automated marketing workflows triggered by content updates in Storyblok.