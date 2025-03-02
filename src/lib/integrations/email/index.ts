export { getEmailTransporter, EMAIL_SENDER, EMAIL_FORMATTED_SENDER } from './client';
export { 
  sendEmail,
  handleContactFormNotification,
  handleContactFormConfirmation,
  handleCheckoutConfirmation, 
  handleErrorReport
} from './handlers';
export type {
  EmailOptions,
  EmailAttachment,
  ContactFormData,
  CheckoutCustomerData,
  ErrorReportData
} from './types';