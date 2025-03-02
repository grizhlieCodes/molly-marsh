import { z } from 'zod';

/**
 * Schema for validating Stripe Checkout Session data
 */
export const stripeCheckoutSessionSchema = z
  .object({
    id: z.string(),
    customer: z.object({
      id: z.string(),
      email: z.string().email().nullable().optional(),
      name: z.string().nullable().optional()
    }),
    customer_details: z.object({
      name: z.string(),
      email: z.string().email()
    }),
    invoice: z.object({
      id: z.string(),
      number: z.string(),
      hosted_invoice_url: z.string().url(),
      invoice_pdf: z.string().url(),
      created: z.number()
    }),
    payment_intent: z.object({
      latest_charge: z.object({
        receipt_url: z.string().url()
      })
    }),
    line_items: z.object({
      data: z.array(
        z.object({
          amount_total: z.number(),
          description: z.string(),
          price: z.object({
            product: z.object({
              images: z.array(z.string()),
              metadata: z.object({
                notion_name: z.string()
              }).optional()
            })
          })
        })
      )
    })
  })
  .transform((data) => ({
    session_id: data.id,
    session_customer_name: data.customer_details.name,
    session_customer_email: data.customer_details.email,
    customer_id: data.customer.id,
    customer_email: data.customer.email,
    customer_name: data.customer.name,
    invoice_id: data.invoice.id,
    invoice_url: data.invoice.hosted_invoice_url,
    invoice_pdf_url: data.invoice.invoice_pdf,
    invoice_number: data.invoice.number,
    invoice_date: new Date(data.invoice.created * 1000).toISOString(),
    item_amount_total: data.line_items.data[0].amount_total,
    item_description: data.line_items.data[0].description,
    item_image: data.line_items.data[0].price.product.images[0],
    receipt_url: data.payment_intent.latest_charge.receipt_url,
    item_notion_name: data.line_items.data[0].price.product.metadata?.notion_name
  }));

/**
 * Schema for validating Stripe session data from the successful purchase page
 */
export const stripeSuccessSessionSchema = z
  .object({
    customer_details: z.object({
      name: z.string(),
      email: z.string().email()
    }),
    invoice: z.object({
      id: z.string(),
      number: z.string(),
      invoice_pdf: z.string().url(),
      created: z.number()
    }),
    line_items: z.object({
      data: z.array(
        z.object({
          amount_total: z.number(),
          description: z.string(),
          price: z.object({
            product: z.object({
              images: z.array(z.string())
            })
          })
        })
      ).min(1)
    }),
    payment_intent: z.object({
      latest_charge: z.object({
        receipt_url: z.string().url()
      })
    })
  })
  .transform((data) => ({
    customerName: data.customer_details.name,
    customerEmail: data.customer_details.email,
    invoiceId: data.invoice.id,
    invoiceNumber: data.invoice.number,
    invoicePdfUrl: data.invoice.invoice_pdf,
    invoiceDate: new Date(data.invoice.created * 1000).toISOString(),
    itemAmount: data.line_items.data[0].amount_total,
    itemDescription: data.line_items.data[0].description,
    itemImage: data.line_items.data[0].price.product.images[0],
    receipt_url: data.payment_intent.latest_charge.receipt_url
  }));

/**
 * Schema for validating Stripe checkout input
 */
export const stripeCheckoutInputSchema = z.object({
  priceId: z.string().min(1, "Price ID is required"),
  email: z.string().email("Valid email is required")
});

// Define TypeScript types from schemas
export type StripeCheckoutSession = z.infer<typeof stripeCheckoutSessionSchema>;
export type StripeCheckoutInput = z.infer<typeof stripeCheckoutInputSchema>;
export type StripeSuccessSession = z.infer<typeof stripeSuccessSessionSchema>;