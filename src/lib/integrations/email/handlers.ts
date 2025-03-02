import { getEmailTransporter, EMAIL_SENDER, EMAIL_FORMATTED_SENDER } from './client';
import { baseTemplate } from './templates/baseTemplate';
import { contactResponseTemplate, contactNotificationTemplate } from './templates/contact';
import { checkoutConfirmationTemplate } from './templates/checkout';
import { errorReportTemplate } from './templates/error';
import { signatureImage } from './signature';
import type { 
  EmailOptions, 
  ContactFormData, 
  CheckoutCustomerData, 
  ErrorReportData 
} from './types';
import * as Sentry from '@sentry/sveltekit';

/**
 * Common function to send an email
 * @param options Email sending options
 * @returns Promise with nodemailer send result
 */
export async function sendEmail(options: EmailOptions) {
  try {
    const transporter = getEmailTransporter();
    const result = await transporter.sendMail(options);
    return result;
  } catch (error) {
    Sentry.captureException(error, {
      tags: {
        component: 'email-handler',
        action: 'send-email'
      },
      extra: {
        emailOptions: {
          to: options.to,
          subject: options.subject,
          from: options.from
        }
      }
    });
    throw error;
  }
}

/**
 * Handle contact form submission - sends notification email to admin
 * @param data Contact form data
 * @returns Promise with email send result
 */
export async function handleContactFormNotification(data: ContactFormData) {
  const mailOptions: EmailOptions = {
    from: EMAIL_SENDER,
    to: EMAIL_SENDER,
    subject: `New Form Submission from: ${data.name}`,
    html: contactNotificationTemplate(data)
  };

  try {
    return await sendEmail(mailOptions);
  } catch (error) {
    Sentry.captureException(error, {
      tags: {
        component: 'email-handler',
        action: 'contact-notification'
      },
      extra: { formData: data }
    });
    throw error;
  }
}

/**
 * Handle contact form submission - sends confirmation email to user
 * @param data Contact form data
 * @returns Promise with email send result
 */
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

  try {
    return await sendEmail(mailOptions);
  } catch (error) {
    Sentry.captureException(error, {
      tags: {
        component: 'email-handler',
        action: 'contact-confirmation'
      },
      extra: { email: data.email }
    });
    throw error;
  }
}

/**
 * Handle successful checkout - sends booking link email
 * @param data Customer data from checkout
 * @returns Promise with email send result
 */
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

  try {
    return await sendEmail(mailOptions);
  } catch (error) {
    Sentry.captureException(error, {
      tags: {
        component: 'email-handler',
        action: 'checkout-confirmation'
      },
      extra: { customerData: data }
    });
    throw error;
  }
}

/**
 * Handle error report submission
 * @param data Error report data
 * @returns Promise with email send result
 */
export async function handleErrorReport(data: ErrorReportData) {
  // Create attachments array for screenshots
  const attachments: Array<EmailOptions['attachments'][0]> = [];
  
  if (data.screenshot) {
    // Extract the base64 data by removing the data URI prefix
    const base64Data = data.screenshot.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
    attachments.push({
      filename: 'screenshot.png',
      content: base64Data,
      encoding: 'base64',
      cid: 'screenshot@report.com' // Content ID for referencing in the HTML
    });
  }

  const mailOptions: EmailOptions = {
    from: EMAIL_SENDER,
    to: 'rafal.potasz@gmail.com', // Developer email address
    subject: `Error Report ~ Molly`,
    html: errorReportTemplate(data),
    attachments
  };

  try {
    return await sendEmail(mailOptions);
  } catch (error) {
    Sentry.captureException(error, {
      tags: {
        component: 'email-handler',
        action: 'error-report'
      },
      extra: { 
        url: data.url,
        timestamp: data.timestamp
      }
    });
    throw error;
  }
}