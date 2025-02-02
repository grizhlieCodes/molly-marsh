import { error, json } from '@sveltejs/kit';
import Stripe from 'stripe';
import { STRIPE_SECRET_KEY } from '$env/static/private';

const stripe = new Stripe(STRIPE_SECRET_KEY, {
	apiVersion: '2024-11-20.acacia'
});

async function getInvoicePdf(invoiceId: string) {
	// console.log('Attempting to retrieve invoice:', invoiceId);
	if (!invoiceId) {
		throw new Error('Missing required parameter: invoiceId');
	}

	try {
		// First retrieve the invoice
		const invoice = await stripe.invoices.retrieve(invoiceId);

		if (!invoice || !invoice.invoice_pdf) {
			throw new Error('PDF not available for this invoice id');
		}

		// Fetch the PDF content from the URL
		const pdfResponse = await fetch(invoice.invoice_pdf);
		if (!pdfResponse.ok) {
			throw new Error('Failed to fetch PDF from Stripe');
		}

		const pdfBuffer = await pdfResponse.arrayBuffer();
		return {
			pdfBuffer,
			number: invoice.number
		};
	} catch (err) {
		console.error('Stripe API error:', err);

		if (err instanceof Stripe.errors.StripeError) {
			console.error('Stripe error details:', {
				type: err.type,
				code: err.code,
				message: err.message
			});
		}
		throw err;
	}
}

export async function GET({ params }) {
	console.log('Received request with params:', params);

	try {
		const { invoiceId } = params;
		if (!invoiceId) {
			return json({ message: 'invoiceId is required' }, { status: 400 });
		}

		const response = await getInvoicePdf(invoiceId);

		console.log('Invoice PDF response: ', response);

		return new Response(response.pdfBuffer, {
			headers: {
				'Content-Type': 'application/pdf',
				'Content-Disposition': `attachment; filename="invoice-${response.number}.pdf"`,
				'Cache-Control': 'no-cache'
			}
		});
	} catch (err) {
		console.error('Invoice download error:', err);

		// Return a proper JSON error response
		return json(
			{
				message: err.message || 'Failed to retrieve invoice',
				error: process.env.NODE_ENV === 'development' ? err.stack : undefined
			},
			{ status: 400 }
		);
	}
}
