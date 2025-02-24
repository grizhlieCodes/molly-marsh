import { SECRET_TRANSPORTER_USER, SECRET_TRANSPORTER_PASS } from '$env/static/private';
import nodemailer from 'nodemailer';

import { json } from '@sveltejs/kit';
import Stripe from 'stripe';
import { STRIPE_SECRET_KEY, STRIPE_SUCCESSFUL_CHECKOUT_SECRET } from '$env/static/private';
import { signatureImage } from '$lib/email/molly-email-signature-for-nodemailer';
import { insertEmailWithTemplate } from '$lib/email/email-template.js';

const stripe = new Stripe(STRIPE_SECRET_KEY, {
	apiVersion: '2024-11-20.acacia'
});

const updateCustomerNameIfMissing = async (customer_id, sessionData) => {
	const customer = await stripe.customers.retrieve(customer_id);

	if (customer && (!customer.name || customer.name === null)) {
		const updatedCustomer = await stripe.customers.update(customer_id, {
			name: sessionData.customer_details.name
		});
		return { customer: updatedCustomer, status: 'Updated customer name.' };
	}

	return { customer, status: 'Customer already had a name.' };
};

export async function POST({ request }) {
	const body = await request.text();
	const signature = request.headers.get('stripe-signature');

	try {
		let session = null;
		let customer = null;
		// Verify stripe event & unpack data
		const event = stripe.webhooks.constructEvent(body, signature, STRIPE_SUCCESSFUL_CHECKOUT_SECRET);

		if (event.type === 'checkout.session.completed') {
			session = event.data.object;
			// console.log('Checkout Session Data:', session);
		}

		if (session.customer) {
			customer = await updateCustomerNameIfMissing(session.customer, session);
			// console.log('Updated Customer or Customer: ', customer);
		}

		// send email here
		if (session && customer) {
			const customer_email = customer.customer.email;
			const customer_name = customer.customer.name;
			// console.log('HERE ==============================!!!!!!!!!!!!!!==============', {
			// 	customer_email,
			// 	customer_name
			// });
			const emailRes = await sendConfirmationEmail(customer_name, customer_email);
			// console.log(emailRes)
		}

		return json({ received: true });
	} catch (err) {
		// Only log if it's not a signature verification error
		if (!err.message.includes('No signatures found')) {
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
		console.log('fucked up', error);
		throw error;
	}
};
