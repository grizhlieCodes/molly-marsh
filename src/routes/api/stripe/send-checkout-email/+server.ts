import { SECRET_TRANSPORTER_USER, SECRET_TRANSPORTER_PASS } from '$env/static/private';
import nodemailer from 'nodemailer';

import { json } from '@sveltejs/kit';
import Stripe from 'stripe';
import { STRIPE_SECRET_KEY, STRIPE_SUCCESSFUL_CHECKOUT_SECRET } from '$env/static/private';

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
			console.log('Checkout Session Data:', session);
		}

		if (session.customer) {
			customer = await updateCustomerNameIfMissing(session.customer, session);
			console.log('Updated Customer or Customer: ', customer);
		}

		// send email here

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
const sendConfirmationEmail = async (data) => {
	const mailOptions = {
		from: SECRET_TRANSPORTER_USER,
		to: data.email,
		subject: `Thank you for contacting me!`,
		html: `<!doctype html>
      <html>
        <body>
          <div
            style='background-color:#edfff2;color:#242424;font-family:"Helvetica Neue", "Arial Nova", "Nimbus Sans", Arial, sans-serif;font-size:16px;font-weight:400;letter-spacing:0.15008px;line-height:1.5;margin:0;padding:32px 0;min-height:100%;width:100%'
          >
            <table
              align="center"
              width="100%"
              style="margin:0 auto;max-width:600px;background-color:#FFFFFF"
              role="presentation"
              cellspacing="0"
              cellpadding="0"
              border="0"
            >
              <tbody>
                <tr style="width:100%">
                  <td>
                    <div style="height:48px"></div>
                    <div style="font-weight:normal;padding:0px 24px 16px 24px">
                      Hi ${data.name} 👋,
                    </div>
                    <div style="font-weight:normal;padding:0px 24px 16px 24px">
                      Thank you for contacting me. I will try getting back to you
                      within 48 hours. Please keep in mind that this only includes
                      working days.
                    </div>
                    <div style="font-weight:normal;padding:8px 24px 8px 24px">
                      Kind regards,
                    </div>
                    <div style="font-weight:normal;padding:0px 24px 16px 24px">
                      Adie
                    </div>
                    <div style="padding:16px 0px 16px 0px">
                      <hr
                        style="width:100%;border:none;border-top:1px solid #CCD6CF;margin:0"
                      />
                    </div>
                    <div style="padding:0px 0px 0px 0px">
                      <div style="padding:0px 0px 0px 0px">
                        <table
                          align="center"
                          width="100%"
                          cellpadding="0"
                          border="0"
                          style="table-layout:fixed;border-collapse:collapse"
                        >
                          <tbody style="width:100%">
                            <tr style="width:100%">
                              <td
                                style="box-sizing:content-box;vertical-align:middle;padding-left:0;padding-right:0;width:112px"
                              >
                                <div style="padding:16px 0px 16px 36px">
                                  <img
                                    alt=""
                                    src="https://a.storyblok.com/f/290729/1024x768/4f8990025c/adie-writer-selfie.jpg/m/400x0"
                                    height="113"
                                    width="113"
                                    style="outline:none;border:none;text-decoration:none;object-fit:cover;height:113px;width:113px;max-width:100%;display:inline-block;vertical-align:middle;text-align:center;border-radius:113px"
                                  />
                                </div>
                              </td>
                              <td
                                style="box-sizing:content-box;vertical-align:middle;padding-left:0;padding-right:0;width:200px"
                              >
                                <div style="padding:16px 0px 16px 0px">
                                  <div style="padding:16px 0px 16px 0px">
                                    <h2
                                      style='font-weight:bold;margin:0;font-family:Charter, "Bitstream Charter", "Sitka Text", Cambria, serif;font-size:24px;padding:0px 0px 0px 0px'
                                    >
                                      Adie Pascual
                                    </h2>
                                    <div
                                      style="font-weight:normal;padding:0px 0px 0px 0px"
                                    >
                                      Profiler, Teacher &amp; Coach
                                    </div>
                                    <div style="padding:8px 0px 8px 0px">
                                      <hr
                                        style="width:100%;border:none;border-top:1px solid #CCD6CF;margin:0"
                                      />
                                    </div>
                                    <div
                                      style="color:#16A34A;font-size:16px;padding:0px 0px 0px 0px"
                                    >
                                      <a
                                        style="text-decoration: none; color:#15512C;"
                                        href="https://www.google.com"
                                        >www.adiepascual.com</a
                                      >
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td
                                style="box-sizing:content-box;vertical-align:middle;padding-left:0;padding-right:0;width:80px"
                              ></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </body>
      </html>` // I need to create this template
	};

	try {
		let res = await transporter.sendMail(mailOptions);
		return res;
	} catch (error) {
		console.log('fucked up', error);
		throw error;
	}
};
