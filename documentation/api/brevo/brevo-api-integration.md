# Brevo API Integration

This documentation explains how the application integrates with Brevo (formerly Sendinblue) for email marketing, newsletter management, and subscriber handling. The integration provides functionality for managing contacts, creating email campaigns, and automating newsletter creation from Storyblok content.

## Overview

The Brevo integration serves three main purposes in the application:

1. **Contact Management** - Adding subscribers to newsletter lists
2. **Email Campaign Creation** - Creating and configuring email campaigns
3. **Newsletter Generation** - Automatically creating newsletters from Storyblok articles

The integration leverages Brevo's official JavaScript SDK (sib-api-v3-sdk) and implements MJML templating for responsive email generation.

## Architecture

```
┌───────────────┐     ┌──────────────────────┐     ┌───────────────┐
│               │     │                      │     │               │
│  Storyblok    │────▶│ /api/brevo/create-   │────▶│    Brevo      │
│  (Webhooks)   │     │    campaign          │     │    API        │
│               │     │                      │     │               │
└───────────────┘     └──────────────────────┘     └───────────────┘
                                                         ▲
                                                         │
┌───────────────┐     ┌──────────────────────┐          │
│               │     │                      │          │
│  Newsletter   │────▶│ /api/brevo/add-      │──────────┘
│  Signup Forms │     │    contact           │
│               │     │                      │
└───────────────┘     └──────────────────────┘
```

## Core Components

### Client Setup

The integration sets up Brevo API clients as singletons for efficiency:

```typescript
// Client initialzation
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = SECRET_BREVO_KEY;

// Singleton instances
let campaignsApiInstance: SibApiV3Sdk.EmailCampaignsApi | null = null;
let contactsApiInstance: SibApiV3Sdk.ContactsApi | null = null;

// Getter functions
export function getBrevoEmailCampaignsClient(): SibApiV3Sdk.EmailCampaignsApi {
  if (!campaignsApiInstance) {
    campaignsApiInstance = new SibApiV3Sdk.EmailCampaignsApi();
  }
  return campaignsApiInstance;
}
```

### API Endpoints

The integration exposes three main API endpoints:

1. **`/api/brevo/add-contact`** - Adds a subscriber to the newsletter list
2. **`/api/brevo/create-campaign`** - Creates an email campaign (triggered by Storyblok webhooks)
3. **`/api/brevo/send-newsletter`** - [Minimal implementation, possibly for future use]

### Contact Management

The contact management functionality handles newsletter subscribers:

```typescript
export async function addContactToNewsletter(email: string, name?: string) {
  try {
    // Get the contacts API client
    const apiInstance = getBrevoContactsClient();
    const createContact = new SibApiV3Sdk.CreateContact();
    
    // Create contact object
    createContact.email = email;
    createContact.listIds = [BREVO_NEWSLETTER_LIST_ID];
    
    // Add name if provided
    if (name) {
      createContact.attributes = {
        FIRSTNAME: name
      };
    }
    
    // Create the contact
    const result = await apiInstance.createContact(createContact);
    return {
      success: true,
      message: 'Contact added to newsletter',
      data: result
    };
  } catch (error) {
    // Handle errors...
  }
}
```

### Email Campaign Creation

The email campaign functionality creates campaigns in Brevo:

```typescript
export async function createCampaign(params: CreateCampaignParams): Promise<CampaignResponse> {
  try {
    const apiInstance = getBrevoEmailCampaignsClient();
    const emailCampaigns = new SibApiV3Sdk.CreateEmailCampaign();

    // Set up email campaign
    emailCampaigns.name = params.name;
    emailCampaigns.subject = params.subject;
    emailCampaigns.sender = DEFAULT_SENDER;
    emailCampaigns.type = 'classic';
    emailCampaigns.htmlContent = params.htmlContent;
    emailCampaigns.recipients = { 
      listIds: params.listIds || [BREVO_NEWSLETTER_LIST_ID] 
    };

    // Create the campaign
    const campaignData = await apiInstance.createEmailCampaign(emailCampaigns);
    
    return {
      message: 'Email campaign created successfully!',
      campaignId: campaignData.id
    };
  } catch (error) {
    // Handle errors...
  }
}
```

## Storyblok Integration

A key feature of the Brevo integration is automatic newsletter creation from Storyblok articles:

1. Storyblok sends a webhook when an article is published
2. The application receives the webhook at `/api/brevo/create-campaign`
3. The handler fetches the full article content from Storyblok
4. An MJML template is generated with the article content
5. The MJML is converted to HTML
6. A campaign is created in Brevo with the generated HTML

```typescript
export async function handleArticlePublication(webhook: StoryblokWebhook): Promise<CampaignResponse> {
  try {
    // Get story data from Storyblok
    const storyData = await getStoryData(webhook.story_id);
    
    // Check if it's a valid article
    if (!isValidArticle(storyData)) {
      return {
        message: 'Not an article, ignoring webhook'
      };
    }
    
    // Create newsletter data
    const newsletterData = createNewsletterData(webhook, storyData);
    
    // Create email template
    const mjmlTemplate = createNewsletterMjml(
      newsletterData.title, 
      newsletterData.content, 
      newsletterData.summary
    );
    
    // Convert MJML to HTML
    const { html, errors } = convertMjmlToHtml(mjmlTemplate);
    
    // Handle conversion errors
    if (errors && errors.length > 0) {
      // Log errors and return error response
    }
    
    // Create campaign in Brevo
    return await createCampaign({
      name: `Newsletter - ${newsletterData.title}`,
      subject: newsletterData.title,
      htmlContent: html
    });
  } catch (error) {
    // Handle errors...
  }
}
```

## Email Template Generation

The integration uses MJML for responsive email templates:

1. **Template Creation** - `createNewsletterMjml` generates MJML for the newsletter
2. **HTML Conversion** - `convertMjmlToHtml` converts MJML to HTML for the email
3. **Rich Text Rendering** - Uses Storyblok's `renderRichText` to convert content

```typescript
export function createNewsletterMjml(title: string, content: any, summary: string): string {
  const renderedHtml = renderRichText(content);

  return `
    <mjml>
      <mj-head>
        <!-- Email styles and configuration -->
      </mj-head>
      <mj-body>
        <!-- Email content structure -->
        <mj-section>
          <mj-column>
            <mj-text><h1>${title}</h1></mj-text>
          </mj-column>
        </mj-section>
        
        <mj-section>
          <mj-column>
            <mj-text><p class="summary">${summary}</p></mj-text>
          </mj-column>
        </mj-section>
        
        <mj-section>
          <mj-column>
            <mj-text>${renderedHtml}</mj-text>
          </mj-column>
        </mj-section>
        
        <!-- Signature and footer -->
      </mj-body>
    </mjml>
  `;
}
```

## Security

The integration implements several security measures:

1. **API Key Authentication** - Internal API calls are secured with `INTERNAL_API_KEY`
2. **Input Validation** - Required fields are validated before processing
3. **Error Handling** - Comprehensive error handling with appropriate status codes
4. **Sentry Logging** - Errors are logged to Sentry with context information

```typescript
// Authentication example
const authHeader = event.request.headers.get('Authorization');
const token = authHeader?.replace('Bearer ', '');

if (token !== INTERNAL_API_KEY) {
  return new Response('Unauthorized in brevo-contact handler', { status: 401 });
}
```

## Error Handling

The integration uses a consistent error handling approach:

1. **Try-Catch Blocks** - All API calls are wrapped in try-catch blocks
2. **Sentry Logging** - Errors are logged to Sentry with tags and context
3. **Friendly Error Messages** - User-friendly error messages are returned
4. **Error Status Codes** - Appropriate HTTP status codes are used

```typescript
try {
  // API operation
} catch (error) {
  // Log error to Sentry
  Sentry.captureException(error, {
    tags: {
      component: 'brevo-integration',
      action: 'create-campaign'
    },
    extra: {
      campaignName: params.name,
      subject: params.subject
    }
  });

  // Return error response
  return {
    message: 'Failed to create email campaign',
    error: `Brevo API error: ${errorMessage}`
  };
}
```

## Configuration

The integration requires the following environment variables:

1. **SECRET_BREVO_KEY** - API key for Brevo
2. **INTERNAL_API_KEY** - Internal API key for authentication

Additionally, there are configured constants:

1. **BREVO_NEWSLETTER_LIST_ID** - ID of the newsletter subscriber list
2. **DEFAULT_SENDER** - Default sender information for campaigns

## Integration with Other Systems

### Storyblok Integration

The Brevo integration works closely with Storyblok:

1. Listens for Storyblok webhooks about published articles
2. Fetches article content from Storyblok using the Storyblok client
3. Renders Storyblok rich text content for email templates

### Form Integration

The contact management endpoint is designed to integrate with form submissions:

1. Form submissions send subscriber data to `/api/brevo/add-contact`
2. The endpoint validates and processes the data
3. The subscriber is added to the newsletter list in Brevo

## Conclusion

The Brevo API integration provides essential email marketing functionality for the application, including contact management, email campaign creation, and automated newsletter generation. The integration follows best practices for security, error handling, and performance, using singleton patterns for API clients and comprehensive logging.

The modular architecture separates concerns into client setup, contact management, campaign creation, and template generation, making the codebase maintainable and extensible. The integration with Storyblok enables automated content-driven email marketing, allowing for seamless newsletter creation from published articles.