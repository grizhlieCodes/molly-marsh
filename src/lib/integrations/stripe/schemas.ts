import { z } from 'zod';

/**
 * Schema for validating Stripe checkout input
 */
export const stripeCheckoutInputSchema = z.object({
	priceId: z.string().min(1, 'Price ID is required'),
	email: z.string().email('Valid email is required')
});

export const stripeSuccessfulSessionSchema = z
	.object({
		id: z.string().min(1),
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
			created: z.number()
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
							})
						})
					})
				})
			)
		}),
		payment_intent: z.object({
			latest_charge: z.object({
				receipt_url: z.string().url()
			})
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
		invoice_number: data.invoice.number,
		invoice_date: new Date(data.invoice.created * 1000).toISOString(),
		item_amount_total: data.line_items.data[0].amount_total,
		item_description: data.line_items.data[0].description,
		item_notion_name: data.line_items.data[0].price.product.metadata.notion_name,
		item_image: data.line_items.data[0].price.product.images[0],
		products: data.line_items,
		receipt_url: data.payment_intent.latest_charge.receipt_url
	}));

export type StripeSuccessfulCheckoutSession = z.infer<typeof stripeSuccessfulSessionSchema>;
export type StripeCheckoutInput = z.infer<typeof stripeCheckoutInputSchema>;
