# Email API Integration

This documentation explains how the application handles email communications through a unified email API. The integration provides functionality for sending various types of emails, including contact form notifications, checkout confirmations, and error reports.

## Overview

The email integration serves several key functions in the application:

1. **Contact Form Communications** - Notifying administrators about form submissions and sending confirmation emails to users
2. **Transaction Confirmations** - Sending checkout confirmation emails with booking instructions
3. **Error Reporting** - Forwarding error reports to developers with contextual information
4. **Templated Emails** - Using consistent branding and styling across all email communications

The integration uses Nodemailer with Gmail SMTP for reliable email delivery and implements a consistent structure for all email types.

## Architecture

```
┌───────────────┐     ┌──────────────────────┐     ┌───────────────┐
│               │     │                      │     │               │
│  Contact      │     │                      │     │  Admin        │
│  Forms        │────▶│                      │────▶│  Notification │
│               │     │                      │     │               │
└───────────────┘     │                      │     └───────────────┘
                      │                      │
┌───────────────┐     │  /api/email/send-    │     ┌───────────────┐
│               │     │  email               │     │               │
│  Stripe       │────▶│                      │────▶│  User         │
│  Checkout     │     │                      │     │  Confirmation │
│               │     │                      │     │               │
└───────────────┘     │                      │     └───────────────┘
                      │                      │
┌───────────────┐     │                      │     ┌───────────────┐
│               │     │                      │     │               │
│  Error        │────▶│                      │────▶│  Developer    │
│  Reports      │     │                      │     │  Alert        │
│               │     │                      │     │               │
└───────────────┘     └──────────────────────┘     └───────────────┘
```

## Core Components

### Email Client Setup

The integration sets up a Nodemailer transporter as a singleton for efficiency:

```typescript
// Client setup
export function setupEmailTransporter() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: SECRET_TRANSPORTER_USER,
      pass: SECRET_TRANSPORTER_PASS
    }
  });
}

// Singleton pattern
let emailTransporter: nodemailer.Transporter | null = null;

export function getEmailTransporter() {
  if (!emailTransporter) {
    emailTransporter = setupEmailTransporter();
  }
  return emailTransporter;
}
```

### API Endpoint

The integration exposes a unified email endpoint that handles different email types:

```
/api/email/send-email
```

This endpoint:
1. Validates the request data and email type
2. Routes to the appropriate email handler based on the type
3. Returns success/failure status with appropriate HTTP codes

### Email Types and Handlers

The integration supports several email types, each with a dedicated handler:

#### 1. Contact Form Emails

Sends two emails for contact form submissions:
- Notification to the administrator with form details
- Confirmation to the user acknowledging receipt

```typescript
// Example: Contact form notification
export async function handleContactFormNotification(data: ContactFormData) {
  const mailOptions: EmailOptions = {
    from: EMAIL_SENDER,
    to: EMAIL_SENDER,
    subject: `New Form Submission from: ${data.name}`,
    html: contactNotificationTemplate(data)
  };

  return await sendEmail(mailOptions);
}

// Example: Contact form confirmation
export async function handleContactFormConfirmation(data: ContactFormData) {
  const emailContent = contactResponseTemplate(data.name);
  
  const mailOptions: EmailOptions = {
    from: EMAIL_FORMATTED_SENDER,
    to: data.email,
    subject: `Thank you for contacting me!`,
    replyTo: EMAIL_SENDER,
    attachments: [
      {
        filename: 'signature.jpg',
        path: signatureImage,
        cid: 'unique@signature.img'
      }
    ],
    html: baseTemplate(emailContent)
  };

  return await sendEmail(mailOptions);
}
```

#### 2. Checkout Confirmation Emails

Sends a confirmation email to customers after a successful purchase:

```typescript
export async function handleCheckoutConfirmation(data: CheckoutCustomerData) {
  const emailContent = checkoutConfirmationTemplate(data);
  
  const mailOptions: EmailOptions = {
    from: EMAIL_FORMATTED_SENDER,
    to: data.customer_email,
    subject: `Book your coaching session`,
    replyTo: EMAIL_SENDER,
    attachments: [
      {
        filename: 'signature.jpg',
        path: signatureImage,
        cid: 'unique@signature.img'
      }
    ],
    html: baseTemplate(emailContent)
  };

  return await sendEmail(mailOptions);
}
```

#### 3. Error Report Emails

Sends error reports to developers with detailed context:

```typescript
export async function handleErrorReport(data: ErrorReportData) {
  // Create attachments array for screenshots
  const attachments: Array<EmailOptions['attachments'][0]> = [];
  
  if (data.screenshot) {
    // Extract the base64 data
    const base64Data = data.screenshot.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
    attachments.push({
      filename: 'screenshot.png',
      content: base64Data,
      encoding: 'base64',
      cid: 'screenshot@report.com'
    });
  }

  const mailOptions: EmailOptions = {
    from: EMAIL_SENDER,
    to: 'developer@example.com',
    subject: `Error Report ~ Molly`,
    html: errorReportTemplate(data),
    attachments
  };

  return await sendEmail(mailOptions);
}
```

## Email Templates

The integration uses a consistent template structure for all emails:

### Base Template

The base template provides common styling and structure for all emails:

```typescript
export function baseTemplate(emailContent: string): string {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- Email head content -->
  </head>
  <body style="margin: 0; padding: 0; background-color: #eff8f6">
    <!-- Email structure -->
    <table>
      <!-- ... -->
      <td>
        ${emailContent}
        <!-- Common signature and footer -->
        <div>
          <img src="cid:unique@signature.img" alt="Molly Marsh" />
          <div><span>Molly Marsh</span> (She/Her)</div>
          <div>Transformative Life Coach</div>
          <a href="http://www.mollymarshcoaching.com">www.mollymarshcoaching.com</a>
        </div>
      </td>
      <!-- ... -->
    </table>
  </body>
</html>`;
}
```

### Specialized Templates

Each email type has a specialized template:

1. **Contact Form Templates**
   - `contactNotificationTemplate` - Detailed form submission for admin
   - `contactResponseTemplate` - Thank you message for users

2. **Checkout Template**
   - `checkoutConfirmationTemplate` - Purchase confirmation with booking instructions

3. **Error Report Template**
   - `errorReportTemplate` - Detailed error information for developers

## Integration with Other Systems

### Stripe Integration

The email system is called from the Stripe webhook handler to send purchase confirmations:

```typescript
// From Stripe webhook handler
const emailResponse = await event.fetch('/api/email/send-email', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    type: 'checkout-confirmation',
    data: {
      customer_name: customerData.customer.name,
      customer_email: customerData.customer.email
    }
  }),
  duplex: 'half'
});
```

### Contact Form Integration

The email system is called from the form handler to send notifications and confirmations:

```typescript
// From form handler
const emailResponse = await event.fetch('/api/email/send-email', {
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

### Error Reporting Integration

The email system is called from the error reporting system to send detailed error reports:

```typescript
// From error report handler
const emailResponse = await event.fetch('/api/email/send-email', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    type: 'error-report',
    data: reportData
  })
});
```

## Security

The integration implements several security measures:

1. **Environment Variables** - All sensitive information is stored in environment variables
2. **Data Validation** - Validates required fields before processing
3. **Error Handling** - Comprehensive error handling with appropriate status codes

## Error Handling and Monitoring

The integration includes robust error handling and monitoring:

1. **Sentry Integration** - Detailed error logging to Sentry
2. **Contextual Error Information** - Rich context for debugging
3. **Appropriate Status Codes** - Returns meaningful HTTP status codes

```typescript
try {
  // Email operation
} catch (error) {
  // Log to Sentry with detailed context
  Sentry.captureException(error, {
    tags: {
      component: 'email-handler',
      action: 'contact-confirmation'
    },
    extra: { email: data.email }
  });
  throw error;
}
```

## Configuration

The integration requires the following environment variables:

1. **SECRET_TRANSPORTER_USER** - Gmail account username
2. **SECRET_TRANSPORTER_PASS** - Gmail account password (app password recommended)

## Best Practices

The integration follows several email best practices:

1. **Responsive Design** - Emails are designed to work well on mobile and desktop
2. **Consistent Branding** - Uses consistent styling and signature across all emails
3. **Plain Text Alternative** - Provides fallback for email clients that don't support HTML
4. **Embedded Images** - Uses Content-ID (CID) attachments for reliable image display

## Limitations

The current implementation has some potential limitations:

1. **Single Email Provider** - Uses only Gmail, which may have sending limits
2. **No Template Engine** - Uses string concatenation rather than a dedicated template engine
3. **No Queue System** - Sends emails synchronously, which could be a bottleneck

## Conclusion

The Email API integration provides a comprehensive system for handling various types of email communications in the application. The unified API approach with specialized handlers for different email types keeps the codebase organized and maintainable.

The integration with Nodemailer ensures reliable email delivery, while the templating system maintains consistent branding across all communications. Error handling with Sentry provides robust monitoring and debugging capabilities.

This email system effectively supports the application's communication needs, from contact form acknowledgments to purchase confirmations and error reporting.