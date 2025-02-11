import { redirect, error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { createFormSchema } from '$lib/scripts/formSchemaServer';
import { useStoryblokApi } from '@storyblok/svelte';
import { superValidate, message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';
import { SECRET_TRANSPORTER_USER, SECRET_TRANSPORTER_PASS, SECRET_MAILERLITE_KEY } from '$env/static/private';
import nodemailer from 'nodemailer';
import { useStoryblok } from '$lib/storyblok/useStoryblok';
import { signatureImage } from '$lib/data/molly-email-signature-for-nodemailer';

// Irrelevant for storyblok
function deepFind(data, predicate, visited = new Set()) {
	// Check for null or non-object values
	if (data === null || typeof data !== 'object') {
		return predicate(data) ? data : undefined;
	}

	// Avoid circular references
	if (visited.has(data)) return undefined;
	visited.add(data);

	// If data itself matches, return it.
	if (predicate(data)) return data;

	// If it's an array, iterate over the items.
	if (Array.isArray(data)) {
		for (const item of data) {
			const found = deepFind(item, predicate, visited);
			if (found !== undefined) return found;
		}
	} else {
		// It's an object: iterate over its values.
		for (const key in data) {
			if (Object.prototype.hasOwnProperty.call(data, key)) {
				const found = deepFind(data[key], predicate, visited);
				if (found !== undefined) return found;
			}
		}
	}

	// If nothing found, return undefined.
	return undefined;
}
// Irrelevant for storyblok
function isComponentForm(item) {
	return item && typeof item === 'object' && item.component === 'form';
}
// Irrelevant for storyblok
function timedDeepFind(data, predicate) {
	// Use performance.now() if available (e.g. in browsers) or fallback to Date.now()
	const now = typeof performance !== 'undefined' && performance.now ? performance.now.bind(performance) : Date.now;

	const startTime = now();
	const result = deepFind(data, predicate);
	const endTime = now();
	const elapsed = endTime - startTime;
	// console.log(`deepFind took ${elapsed.toFixed(2)} ms to run.`);
	return result;
}
// Irrelevant for storyblok
const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: SECRET_TRANSPORTER_USER,
		pass: SECRET_TRANSPORTER_PASS
	}
});
// Irrelevant for storyblok
const sendInternalEmail = async (data) => {
	// console.log({ SECRET_TRANSPORTER_USER, SECRET_TRANSPORTER_PASS });
	const mailOptions = {
		from: SECRET_TRANSPORTER_USER,
		to: SECRET_TRANSPORTER_USER,
		subject: `New Form Submission from: ${data.name}`,
		html: `<!doctype html>
        <html>
        <body>
            <div
            style='background-color:#ffffff;color:#242424;font-family:"Helvetica Neue", "Arial Nova", "Nimbus Sans", Arial, sans-serif;font-size:16px;font-weight:400;letter-spacing:0.15008px;line-height:1.5;margin:0;padding:32px 0;min-height:100%;width:100%'
            >
            <table
                align="center"
                width="100%"
                style="margin:0 auto;max-width:600px;background-color:#f2fbff"
                role="presentation"
                cellspacing="0"
                cellpadding="0"
                border="0"
            >
                <tbody>
                <tr style="width:100%">
                    <td>
                    <div style="border-radius:0;padding:16px 24px 16px 24px">
                        <h2
                        style="color:#191919;font-weight:bold;text-align:left;margin:0;font-size:24px;padding:16px 24px 28px 24px"
                        >
                        New Submission from: ${data.name}
                        </h2>
                    </div>
                    <div style="font-size:16px;padding:16px 24px 16px 24px">
                        <table
                        style="width: 100%; border-collapse: collapse; font-size: 16px; font-family: Arial, sans-serif; margin: 20px 0;"
                        >
                        <tbody>
                            <tr>
                            <th
                                style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2; text-align: left;"
                            >
                                Name
                            </th>
                            <td style="border: 1px solid #ddd; padding: 8px;">
                                ${data.name}
                            </td>
                            </tr>
                            <tr>
                            <th
                                style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2; text-align: left;"
                            >
                                Subject
                            </th>
                            <td style="border: 1px solid #ddd; padding: 8px;">
                                ${data.subject}
                            </td>
                            </tr>
                            <tr>
                            <th
                                style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2; text-align: left;"
                            >
                                Email
                            </th>
                            <td style="border: 1px solid #ddd; padding: 8px;">
                                ${data.email}
                            </td>
                            </tr>
                            <tr>
                            <th
                                style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2; text-align: left;"
                            >
                                Message
                            </th>
                            <td style="border: 1px solid #ddd; padding: 8px;">
                            ${data.message}
                            </td>
                            </tr>
                        </tbody>
                        </table>
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
		// console.log('Internal email res: ', res);
		return res;
	} catch (error) {
		// console.log('fucked up', error);
		throw error;
	}
};
// Irrelevant for storyblok
const sendConfirmationEmail = async (data) => {
	const mailOptions = {
		from: `Molly Marsh <${SECRET_TRANSPORTER_USER}>`,
		to: data.email,
		subject: `Thank you for contacting me!`,
		replyTo: SECRET_TRANSPORTER_USER,
		priority: 'high',
		attachments: [
			{
				filename: 'signature.jpg',
				path: signatureImage,
				cid: 'unique@signature.img'
			}
		],
		html: `<!DOCTYPE html>

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
                        background-color: #ffffff;
                        border-radius: 0;
                        color: #000000;
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
                              cellpadding="0"
                              cellspacing="0"
                              class="paragraph_block block-1"
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
                                      Hi ${data.name} 👋,
                                    </p>
                                    <p style="margin: 0; margin-bottom: 16px">
                                      Thank you for contacting me. I will try
                                      getting back to you within 48 hours.
                                      Please keep in mind that this only
                                      includes working days.
                                    </p>
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
                        background-color: #ffffff;
                        border-radius: 0;
                        color: #000000;
                        padding-bottom: 60px;
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
              style="
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                background-color: #ffffff;
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
                        background-color: #ffffff;
                        color: #000000;
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
                              class="icons_block block-1"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                text-align: center;
                                line-height: 0;
                              "
                              width="100%"
                            >
                              <tr>
                                <td
                                  class="pad"
                                  style="
                                    vertical-align: middle;
                                    color: #1e0e4b;
                                    font-family: 'Inter', sans-serif;
                                    font-size: 15px;
                                    padding-bottom: 5px;
                                    padding-top: 5px;
                                    text-align: center;
                                  "
                                >
                                  <!--[if vml]><table align="center" cellpadding="0" cellspacing="0" role="presentation" style="display:inline-block;padding-left:0px;padding-right:0px;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"><![endif]-->
                                  <!--[if !vml]><!-->
                                  <table
                                    cellpadding="0"
                                    cellspacing="0"
                                    class="icons-inner"
                                    role="presentation"
                                    style="
                                      mso-table-lspace: 0pt;
                                      mso-table-rspace: 0pt;
                                      display: inline-block;
                                      padding-left: 0px;
                                      padding-right: 0px;
                                    "
                                  >
                                    <!--<![endif]-->
                                    <tr>
                                      <td
                                        style="
                                          vertical-align: middle;
                                          text-align: center;
                                          padding-top: 5px;
                                          padding-bottom: 5px;
                                          padding-left: 5px;
                                          padding-right: 6px;
                                        "
                                      >
                                        <a
                                          href="http://designedwithbeefree.com/"
                                          style="text-decoration: none"
                                          target="_blank"
                                          ><img
                                            align="center"
                                            alt="Beefree Logo"
                                            class="icon"
                                            height="auto"
                                            src="images/Beefree-logo.png"
                                            style="
                                              display: block;
                                              height: auto;
                                              margin: 0 auto;
                                              border: 0;
                                            "
                                            width="34"
                                        /></a>
                                      </td>
                                      <td
                                        style="
                                          font-family: 'Inter', sans-serif;
                                          font-size: 15px;
                                          font-weight: undefined;
                                          color: #1e0e4b;
                                          vertical-align: middle;
                                          letter-spacing: undefined;
                                          text-align: center;
                                          line-height: normal;
                                        "
                                      >
                                        <a
                                          href="http://designedwithbeefree.com/"
                                          style="
                                            color: #1e0e4b;
                                            text-decoration: none;
                                          "
                                          target="_blank"
                                          >Designed with Beefree</a
                                        >
                                      </td>
                                    </tr>
                                  </table>
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
` // I need to create this template
	};

	try {
		let res = await transporter.sendMail(mailOptions);
		return res;
	} catch (error) {
		// console.log('fucked up', error);
		throw error;
	}
};

// Claude solution
export const load: PageServerLoad = async ({ parent, params, url }) => {
	const { storyblokApi: layoutApi } = await parent();
	const slug = params.slug;

	let storyblokApi = layoutApi;

	if (!storyblokApi) {
		const maxRetries = 3;
		for (let i = 0; i < maxRetries; i++) {
			try {
				storyblokApi = await useStoryblokApi();
				if (storyblokApi) {
					// console.log(`Storyblok API initialized successfully on attempt ${i + 1} in [slug]/+page.server.ts`);
					break;
				}
			} catch (error) {
				console.error(`Attempt ${i + 1} to get API instance failed in [slug]/+page.server.ts:`, error);
				if (i < maxRetries - 1) {
					await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1)));
				}
			}
		}

		if (!storyblokApi) {
			await useStoryblok();
			storyblokApi = await useStoryblokApi();
		}

		if (!storyblokApi) {
			// console.log('Triggering reload to:', url.pathname);
			throw redirect(307, url.pathname);
		}
	}

	let dataStory;

	try {
		dataStory = await storyblokApi.get(`cdn/stories/${slug}`, {
			version: 'draft',
			cv: Date.now()
		});
	} catch (err) {
		console.error('Error fetching story from Storyblok in [slug]/+page.server.ts:', err);
		throw error(500, {
			message: 'Failed to load page content in [slug]/+page.server.ts',
			slug
		});
	}

	if (dataStory && dataStory.data && dataStory.data.story) {
		const formDataObject = timedDeepFind(dataStory.data.story.content, isComponentForm);

		if (formDataObject) {
			const formInputs = formDataObject.form_inputs;
			const formSchema = createFormSchema(formInputs);
			await new Promise((resolve) => setTimeout(resolve, 100));
			const form = await superValidate(zod(formSchema));

			return {
				form,
				story: dataStory.data.story
			};
		}

		return {
			story: dataStory.data.story
		};
	} else {
		console.error('DataStory structure is invalid or missing after API call, even after API initialization was successful (which is unexpected if the API init was truly successful) in [slug]/+page.server.ts. Slug:', slug);
		throw error(500, {
			message: 'Failed to load page content - invalid data structure from API in [slug]/+page.server.ts',
			slug: slug
		});
	}
};

export const actions = {
	// stripeCheckout: async ({ request, fetch }) => {
	// 	const formData = await request.formData();
	// 	const priceId = formData.get('priceId');
	// 	const email = formData.get('email');

	// 	// value = price_...

	// 	// console.log('FORM DATA: =========== ', priceId); // WORKING TILL HERE

	// 	// Make request to our webhook endpoint
	// 	const response = await fetch('/api/stripe/checkout', {
	// 		method: 'POST',
	// 		headers: { 'Content-Type': 'application/json' },
	// 		body: JSON.stringify({ priceId, email })
	// 		// Add this for development only
	// 		// rejectUnauthorized: false
	// 	}); // session

	// 	if (!response.ok) {
	// 		const errorData = await response.json();
	// 		// Handle the error appropriately
	// 		// console.log(' ERROR RRRRR ================= AINT WORKING');
	// 		throw new Error(errorData.error);
	// 	}

	// 	const { url } = await response.json();
	// 	throw redirect(303, url);
	// },
	stripeCheckout: async ({ request, fetch }) => {
		try {
			const formData = await request.formData();
			const priceId = formData.get('priceId');
			const email = formData.get('email');

			if (!priceId || !email) {
				console.error('Missing required fields:', { priceId, email });
				return fail(400, {
					success: false,
					message: 'Missing required fields'
				});
			}

			const response = await fetch('/api/stripe/checkout', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ priceId, email })
			});

			if (!response.ok) {
				let errorMessage = 'Failed to create checkout session';
				try {
					const errorData = await response.json();
					errorMessage = errorData.error || errorMessage;
				} catch (parseError) {
					console.error('Failed to parse error response:', parseError);
				}

				return fail(response.status, {
					success: false,
					message: errorMessage
				});
			}

			const data = await response.json();
			if (!data.url) {
				return fail(500, {
					success: false,
					message: 'Invalid checkout response: missing URL'
				});
			}

			throw redirect(303, data.url);
		} catch (error) {
			if (error instanceof Response || error.status === 303) {
				throw error; // Rethrow redirects
			}

			console.error('Stripe checkout error:', error);
			return fail(500, {
				success: false,
				message: 'Internal server error during checkout'
			});
		}
	},
	sendQuery: async ({ request }) => {
		try {
			const reqClone = request.clone();
			const data = await request.formData();
			const schemaDataString = JSON.parse(data.get('schemaData'));
			const formSchema = createFormSchema(schemaDataString);
			const form = await superValidate(reqClone, zod(formSchema));
			// console.log('FORM DATA: ', form);

			if (!form.valid) {
				return fail(400, {
					form,
					type: 'failure',
					message: 'Validation failed'
				});
			}

			console.log('Form data: ', form.data);

			const selfEmail = await sendInternalEmail(form.data);
			const isInternalEmailSuccessful = selfEmail.rejected.length === 0 && selfEmail.accepted.includes(SECRET_TRANSPORTER_USER) && selfEmail.response.startsWith('250');
			console.log({ isInternalEmailSuccessful });

			if (!isInternalEmailSuccessful) {
				throw new Error('Internal email failed to send');
			}

			// Only send confirmation email if internal email was successful
			const confirmationEmail = await sendConfirmationEmail(form.data);
			const isConfirmationEmailSuccessful = confirmationEmail?.rejected.length === 0 && confirmationEmail?.accepted.includes(form.data.email) && confirmationEmail?.response.startsWith('250');
			console.log({ isConfirmationEmailSuccessful });

			if (!isConfirmationEmailSuccessful) {
				throw new Error('Confirmation email failed to send');
			}

			return message(form, 'Form successfully submitted!');
		} catch (error) {
			console.error('Form processing error:', error);
			return fail(500, {
				type: 'failure',
				message: 'An error occurred processing your submission'
			});
		}
	}
};
