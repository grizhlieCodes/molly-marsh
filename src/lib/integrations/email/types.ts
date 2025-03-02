// Basic email types
export interface EmailAttachment {
  filename: string;
  path?: string;
  content?: string;
  encoding?: string;
  cid?: string;
}

export interface EmailOptions {
  from: string;
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
  attachments?: EmailAttachment[];
}

// Contact form types
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Checkout types
export interface CheckoutCustomerData {
  customer_name: string;
  customer_email: string;
}

// Error report types
export interface ErrorReportData {
  url: string;
  timestamp: string;
  browser?: {
    name: string;
    version: string;
  };
  clientIp: string;
  errors?: Array<{
    message?: string;
    filename?: string;
    lineno?: string;
    colno?: string;
  }>;
  screenshot?: string;
}