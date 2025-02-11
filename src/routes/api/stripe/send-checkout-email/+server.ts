import { SECRET_TRANSPORTER_USER, SECRET_TRANSPORTER_PASS } from '$env/static/private';
import nodemailer from 'nodemailer';

import { json } from '@sveltejs/kit';
import Stripe from 'stripe';
import { STRIPE_SECRET_KEY, STRIPE_SUCCESSFUL_CHECKOUT_SECRET } from '$env/static/private';
import { signatureImage } from '$lib/data/molly-email-signature-for-nodemailer';

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

	const mailOptions = {
		from: SECRET_TRANSPORTER_USER,
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

		html: `
      <!DOCTYPE html>

<html
  lang="en"
  xmlns:o="urn:schemas-microsoft-com:office:office"
  xmlns:v="urn:schemas-microsoft-com:vml"
>
  <head>
    <title></title>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    <!--[if mso
      ]><xml
        ><o:OfficeDocumentSettings
          ><o:PixelsPerInch>96</o:PixelsPerInch
          ><o:AllowPNG /></o:OfficeDocumentSettings></xml
    ><![endif]-->
    <!--[if !mso]><!-->
    <!--<![endif]-->
    <style>
      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        padding: 0;
      }

      a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: inherit !important;
      }

      #MessageViewBody a {
        color: inherit;
        text-decoration: none;
      }

      p {
        line-height: inherit;
      }

      .desktop_hide,
      .desktop_hide table {
        mso-hide: all;
        display: none;
        max-height: 0px;
        overflow: hidden;
      }

      .image_block img + div {
        display: none;
      }

      sup,
      sub {
        font-size: 75%;
        line-height: 0;
      }

      @media (max-width: 660px) {
        .desktop_hide table.icons-inner {
          display: inline-block !important;
        }

        .icons-inner {
          text-align: center;
        }

        .icons-inner td {
          margin: 0 auto;
        }

        .mobile_hide {
          display: none;
        }

        .row-content {
          width: 100% !important;
        }

        .stack .column {
          width: 100%;
          display: block;
        }

        .mobile_hide {
          min-height: 0;
          max-height: 0;
          max-width: 0;
          overflow: hidden;
          font-size: 0px;
        }

        .desktop_hide,
        .desktop_hide table {
          display: table !important;
          max-height: none !important;
        }
      }

      .row-1 .column-1 .block-3 .button:hover {
        background-color: #274a42 !important;
        border-bottom: 0 solid transparent !important;
        border-left: 0 solid transparent !important;
        border-right: 0px solid transparent !important;
        border-top: 0 solid transparent !important;
        color: #ffffff !important;
      }
    </style>
    <!--[if mso
      ]><style>
        sup,
        sub {
          font-size: 100% !important;
        }
        sup {
          mso-text-raise: 10%;
        }
        sub {
          mso-text-raise: -10%;
        }
      </style>
    <![endif]-->
  </head>
  <body
    class="body"
    style="
      background-color: #eff8f6;
      margin: 0;
      padding: 0;
      -webkit-text-size-adjust: none;
      text-size-adjust: none;
    "
  >
    <table
      border="0"
      cellpadding="0"
      cellspacing="0"
      class="nl-container"
      role="presentation"
      style="
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
        background-color: #eff8f6;
      "
      width="100%"
    >
      <tbody>
        <tr>
          <td>
            <table
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              class="row row-1"
              role="presentation"
              style="
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                background-size: auto;
              "
              width="100%"
            >
              <tbody>
                <tr>
                  <td>
                    <table
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      class="row-content stack"
                      role="presentation"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        background-size: auto;
                        color: #000000;
                        border-radius: 0;
                        background-color: #ffffff;
                        padding: 60px 32px 10px;
                        width: 640px;
                        margin: 0 auto;
                      "
                      width="640"
                    >
                      <tbody>
                        <tr>
                          <td
                            class="column column-1"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              font-weight: 400;
                              text-align: left;
                              padding-bottom: 5px;
                              padding-left: 5px;
                              padding-right: 5px;
                              padding-top: 5px;
                              vertical-align: top;
                              border-radius: 0px;
                              border-top: 0px;
                              border-right: 0px;
                              border-bottom: 0px;
                              border-left: 0px;
                            "
                            width="100%"
                          >
                            <table
                              border="0"
                              cellpadding="10"
                              cellspacing="0"
                              class="heading_block block-1"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                              "
                              width="100%"
                            >
                              <tr>
                                <td class="pad">
                                  <h2
                                    style="
                                      margin: 0;
                                      color: #3a6a5f;
                                      direction: ltr;
                                      font-family: TimesNewRoman,
                                        'Times New Roman', Times, Baskerville,
                                        Georgia, serif;
                                      font-size: 30px;
                                      font-weight: 400;
                                      letter-spacing: normal;
                                      line-height: 120%;
                                      text-align: left;
                                      margin-top: 0;
                                      margin-bottom: 0;
                                      mso-line-height-alt: 36px;
                                    "
                                  >
                                    <span
                                      class="tinyMce-placeholder"
                                      style="word-break: break-word"
                                      >Thank you for your order
                                      ${first_name}.</span
                                    >
                                  </h2>
                                </td>
                              </tr>
                            </table>
                            <table
                              border="0"
                              cellpadding="10"
                              cellspacing="0"
                              class="paragraph_block block-2"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                word-break: break-word;
                              "
                              width="100%"
                            >
                              <tr>
                                <td class="pad">
                                  <div
                                    style="
                                      color: #101112;
                                      direction: ltr;
                                      font-family: Arial, Helvetica, sans-serif;
                                      font-size: 16px;
                                      font-weight: 400;
                                      letter-spacing: 0px;
                                      line-height: 120%;
                                      text-align: left;
                                      mso-line-height-alt: 19.2px;
                                    "
                                  >
                                    <p style="margin: 0; margin-bottom: 16px">
                                      You can use the below link to book your
                                      session(s).
                                    </p>
                                    <p style="margin: 0">
                                      If you're unable to find a slot that suits
                                      your needs then please get in touch and so
                                      that we can look for a mutually convenient
                                      time. Looking forward to seeing you soon
                                      at your coaching session!
                                    </p>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table
                              border="0"
                              cellpadding="10"
                              cellspacing="0"
                              class="button_block block-3"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                              "
                              width="100%"
                            >
                              <tr>
                                <td class="pad">
                                  <div align="center" class="alignment">
                                    <a
                                      href="${cal_link}"
                                      style="
                                        color: #ffffff;
                                        text-decoration: none;
                                        cursor: pointer;
                                      "
                                      target="_blank"
                                      >><!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word"  href="${cal_link}"  style="height:44px;width:546px;v-text-anchor:middle;" arcsize="10%" fillcolor="#3a6a5f">
<v:stroke dashstyle="Solid" weight="0px" color="#3a6a5f"/>
<w:anchorlock/>
<v:textbox inset="0px,0px,0px,0px">
<center dir="false" style="color:#ffffff;font-family:sans-serif;font-size:17px">
<!
                                      [endif]--><span
                                        class="button"
                                        style="
                                          background-color: #3a6a5f;
                                          border-bottom: 0px solid transparent;
                                          border-left: 0px solid transparent;
                                          border-radius: 4px;
                                          border-right: 0px solid transparent;
                                          border-top: 0px solid transparent;
                                          color: #ffffff;
                                          display: inline-block;
                                          font-family: Arial, Helvetica,
                                            sans-serif;
                                          font-size: 17px;
                                          font-weight: 400;
                                          mso-border-alt: none;
                                          padding-bottom: 5px;
                                          padding-top: 5px;
                                          padding-left: 20px;
                                          padding-right: 20px;
                                          text-align: center;
                                          width: 100%;
                                          word-break: keep-all;
                                          letter-spacing: normal;
                                        "
                                        ><span
                                          style="
                                            word-break: break-word;
                                            line-height: 34px;
                                          "
                                          >BOOK YOUR SESSION</span
                                        ></span
                                      >><!--[if mso]></center></v:textbox></v:roundrect><![endif]--></a</a
                                    >
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table
                              border="0"
                              cellpadding="10"
                              cellspacing="0"
                              class="paragraph_block block-4"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                word-break: break-word;
                              "
                              width="100%"
                            >
                              <tr>
                                <td class="pad">
                                  <div
                                    style="
                                      color: #101112;
                                      direction: ltr;
                                      font-family: Arial, Helvetica, sans-serif;
                                      font-size: 16px;
                                      font-weight: 400;
                                      letter-spacing: 0px;
                                      line-height: 120%;
                                      text-align: left;
                                      mso-line-height-alt: 19.2px;
                                    "
                                  >
                                    <p style="margin: 0; margin-bottom: 16px">
                                      Best wishes,
                                    </p>
                                    <p style="margin: 0">Molly</p>
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              class="row row-2"
              role="presentation"
              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
              width="100%"
            >
              <tbody>
                <tr>
                  <td>
                    <table
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      class="row-content stack"
                      role="presentation"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        color: #000000;
                        border-radius: 0;
                        background-color: #ffffff;
                        padding-left: 32px;
                        padding-right: 32px;
                        width: 640px;
                        margin: 0 auto;
                      "
                      width="640"
                    >
                      <tbody>
                        <tr>
                          <td
                            class="column column-1"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              font-weight: 400;
                              text-align: left;
                              padding-bottom: 5px;
                              padding-top: 5px;
                              vertical-align: top;
                              border-top: 0px;
                              border-right: 0px;
                              border-bottom: 0px;
                              border-left: 0px;
                            "
                            width="100%"
                          >
                            <table
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              class="html_block block-1"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                              "
                              width="100%"
                            >
                              <tr>
                                <td class="pad">
                                  <div
                                    align="center"
                                    style="
                                      font-family: Arial, Helvetica, sans-serif;
                                      text-align: center;
                                    "
                                  >
                                    <table
                                      border="0"
                                      cellpadding="0"
                                      cellspacing="0"
                                      style="background: white"
                                    >
                                      <tr>
                                        <td valign="middle" width="113">
                                          <img
                                            alt="Molly Marsh"
                                            height="113"
                                            src="cid:unique@signature.img"
                                            style="
                                              border-radius: 113px;
                                              display: block;
                                            "
                                            width="113"
                                          />
                                        </td>
                                        <td width="24"></td>
                                        <td
                                          style="padding-top: 8px"
                                          valign="middle"
                                        >
                                          <table
                                            border="0"
                                            cellpadding="0"
                                            cellspacing="0"
                                          >
                                            <tr>
                                              <td>
                                                <span
                                                  style="
                                                    font-family: Arial,
                                                      sans-serif;
                                                    font-size: 24px;
                                                    color: #000000;
                                                    font-weight: 700;
                                                    text-align: left;
                                                  "
                                                  >Molly Marsh</span
                                                >
                                                <span
                                                  style="
                                                    font-family: Arial,
                                                      sans-serif;
                                                    font-size: 12px;
                                                    color: #000000;
                                                    font-weight: 400;
                                                    text-align: left;
                                                  "
                                                >
                                                  (She/Her)</span
                                                >
                                              </td>
                                            </tr>
                                            <tr>
                                              <td height="4"></td>
                                            </tr>
                                            <tr>
                                              <td
                                                style="
                                                  font-family: Arial, sans-serif;
                                                  font-size: 16px;
                                                  color: #000000;
                                                  font-weight: 400;
                                                  text-align: left;
                                                "
                                              >
                                                Transformative Life Coach
                                              </td>
                                            </tr>
                                            <tr>
                                              <td height="8"></td>
                                            </tr>
                                            <tr>
                                              <td
                                                style="
                                                  border-top: 1px solid #ccd6cf;
                                                  font-size: 1px;
                                                  line-height: 1px;
                                                "
                                              >
                                                 
                                              </td>
                                            </tr>
                                            <tr>
                                              <td height="8"></td>
                                            </tr>
                                            <tr>
                                              <td>
                                                <a
                                                  href="https://www.mollymarshcoaching.com"
                                                  style="
                                                    font-family: Arial,
                                                      sans-serif;
                                                    color: #3a6a5f;
                                                    text-decoration: none;
                                                    font-size: 14px;
                                                    text-align: left;
                                                    cursor: pointer;
                                                  "
                                                  >www.mollymarshcoaching.com</a
                                                >
                                              </td>
                                            </tr>
                                          </table>
                                        </td>
                                      </tr>
                                    </table>
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              class="row row-3"
              role="presentation"
              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
              width="100%"
            >
              <tbody>
                <tr>
                  <td>
                    <table
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      class="row-content stack"
                      role="presentation"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        color: #000000;
                        border-radius: 0;
                        background-color: #ffffff;
                        width: 640px;
                        margin: 0 auto;
                      "
                      width="640"
                    >
                      <tbody>
                        <tr>
                          <td
                            class="column column-1"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              font-weight: 400;
                              text-align: left;
                              padding-bottom: 5px;
                              padding-top: 5px;
                              vertical-align: top;
                              border-top: 0px;
                              border-right: 0px;
                              border-bottom: 0px;
                              border-left: 0px;
                            "
                            width="100%"
                          >
                            <table
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              class="empty_block block-1"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                              "
                              width="100%"
                            >
                              <tr>
                                <td class="pad">
                                  <div></div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- End -->
  </body>
</html>
    `
	};

	try {
		let res = await transporter.sendMail(mailOptions);
		return res;
	} catch (error) {
		console.log('fucked up', error);
		throw error;
	}
};
