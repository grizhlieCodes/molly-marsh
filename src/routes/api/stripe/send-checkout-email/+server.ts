import { json } from '@sveltejs/kit';
import { SECRET_TRANSPORTER_USER, SECRET_TRANSPORTER_PASS } from '$env/static/private';
import nodemailer from 'nodemailer';
import { verifyStripeWebhook, isEventType, updateCustomerNameIfMissing } from '$lib/integrations/stripe';
import { signatureImage } from '$lib/email/molly-email-signature-for-nodemailer';
import { insertEmailWithTemplate } from '$lib/email/email-template.js';

// This webhook handler is deprecated and will be replaced by the main webhook handler
// It's kept for backwards compatibility

export async function POST({ request }) {
	const body = await request.text();
	const signature = request.headers.get('stripe-signature');

	try {
		// Verify the webhook
		const event = verifyStripeWebhook(body, signature);

		// Check event type
		if (isEventType(event, 'checkout.session.completed')) {
			const session = event.data.object;
			
			// Update customer name if needed
			if (session.customer) {
				const customer = await updateCustomerNameIfMissing(
					session.customer,
					session.customer_details.name
				);
				
				// Send email
				if (customer?.customer?.email && customer?.customer?.name) {
					await sendConfirmationEmail(
						customer.customer.name,
						customer.customer.email
					);
				}
			}
		}

		return json({ received: true });
	} catch (err) {
		// Only log if it's not a signature verification error
		if (!err.message.includes('Invalid webhook signature')) {
			console.error('Webhook Error:', err.message);
		}
		return json({ error: err.message }, { status: 400 });
	}
}

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: SECRET_TRANSPORTER_USER,
		pass: SECRET_TRANSPORTER_PASS
	}
});

const sendConfirmationEmail = async (client_name: string, client_email: string) => {
	const cal_link = `https://cal.com/mollymarsh/coaching-session?email=${client_email}&name=${client_name}`;
	const first_name = client_name && client_name.length > 0 ? client_name.split(' ')[0] : '';
	const emailContent = `
		<h2 class="mobile-text" style="color: #3a6a5f; font-family: TimesNewRoman, 'Times New Roman', Times, Baskerville, Georgia, serif; font-size: 30px; font-weight: 400; margin: 0 0 20px 0; line-height: 120%;">Thank you for your order ${first_name}.</h2>
                
		<p style="color: #101112; font-family: Arial, Helvetica, sans-serif; font-size: 16px; line-height: 1.5; margin: 0 0 16px 0;">You can use the below link to book your session(s).</p>
		
		<p style="color: #101112; font-family: Arial, Helvetica, sans-serif; font-size: 16px; line-height: 1.5; margin: 0 0 24px 0;">If you're unable to find a slot that suits your needs then please get in touch and so that we can look for a mutually convenient time. Looking forward to seeing you soon at your coaching session!</p>

		<a href="${cal_link}" style="background-color: #3a6a5f; border: none; border-radius: 4px; color: #ffffff; display: inline-block; font-family: Arial, Helvetica, sans-serif; font-size: 17px; font-weight: 400; padding: 12px 24px; text-align: center; text-decoration: none; width: 100%; margin: 0 0 24px 0; box-sizing: border-box;">BOOK YOUR SESSION</a>
	`;
	const mailOptions = {
		from: `Molly Marsh <${SECRET_TRANSPORTER_USER}>`,
		to: client_email,
		subject: `Book your coaching session`,
		replyTo: SECRET_TRANSPORTER_USER,
		priority: 'high',
		attachments: [
			{
				filename: 'signature.jpg',
				path: signatureImage,
				cid: 'unique@signature.img'
			}
		],
		html: insertEmailWithTemplate(emailContent)
	};

	try {
		let res = await transporter.sendMail(mailOptions);
		return res;
	} catch (error) {
		console.error('Email sending error:', error);
		throw error;
	}
};
