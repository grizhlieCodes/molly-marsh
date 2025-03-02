import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import * as Sentry from '@sentry/sveltekit';
import { 
  handleContactFormNotification,
  handleContactFormConfirmation,
  handleCheckoutConfirmation,
  handleErrorReport
} from '$lib/integrations/email';
import type { ContactFormData, CheckoutCustomerData, ErrorReportData } from '$lib/integrations/email';

/**
 * Unified email sending endpoint that handles different email types based on the request body
 */
export const POST: RequestHandler = async ({ request, getClientAddress }) => {
  try {
    const data = await request.json();
    const clientIp = getClientAddress();
    
    // Validate required type field
    if (!data.type) {
      throw error(400, 'Missing email type');
    }

    let result;

    // Route to appropriate handler based on type
    switch (data.type) {
      case 'contact-form':
        // Handle contact form submission (sends both admin and user emails)
        const contactData = data.data as ContactFormData;
        
        if (!contactData.name || !contactData.email || !contactData.subject || !contactData.message) {
          throw error(400, 'Missing required contact form fields');
        }
        
        await handleContactFormNotification(contactData);
        result = await handleContactFormConfirmation(contactData);
        break;
        
      case 'checkout-confirmation':
        // Handle checkout confirmation email
        const checkoutData = data.data as CheckoutCustomerData;
        
        if (!checkoutData.customer_name || !checkoutData.customer_email) {
          throw error(400, 'Missing required checkout customer fields');
        }
        
        result = await handleCheckoutConfirmation(checkoutData);
        break;
        
      case 'error-report':
        // Handle error report email
        const errorData = { ...data.data, clientIp } as ErrorReportData;
        
        if (!errorData.url || !errorData.timestamp) {
          throw error(400, 'Missing required error report fields');
        }
        
        result = await handleErrorReport(errorData);
        break;
        
      default:
        throw error(400, `Unsupported email type: ${data.type}`);
    }

    return json({ success: true, messageId: result?.messageId });
  } catch (err) {
    // Capture the error with Sentry
    Sentry.captureException(err, {
      tags: {
        endpoint: 'send-email-api'
      }
    });
    
    console.error('Error sending email:', err);
    return json(
      {
        success: false,
        message: err instanceof Error ? err.message : 'Unknown error'
      },
      { status: err.status || 500 }
    );
  }
};