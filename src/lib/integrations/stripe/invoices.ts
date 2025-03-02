import { getStripeClient } from './client';

/**
 * Retrieve a Stripe invoice by ID
 * @param invoiceId The Stripe invoice ID
 * @returns The invoice object
 */
export async function getInvoice(invoiceId: string) {
  const stripe = getStripeClient();
  
  try {
    return await stripe.invoices.retrieve(invoiceId);
  } catch (err) {
    throw new Error(`Failed to retrieve invoice: ${err.message}`);
  }
}

/**
 * Get the PDF URL for an invoice
 * @param invoiceId The Stripe invoice ID
 * @returns The invoice PDF URL
 */
export async function getInvoicePdfUrl(invoiceId: string): Promise<string> {
  const invoice = await getInvoice(invoiceId);
  
  if (!invoice.invoice_pdf) {
    throw new Error('Invoice PDF not available');
  }
  
  return invoice.invoice_pdf;
}