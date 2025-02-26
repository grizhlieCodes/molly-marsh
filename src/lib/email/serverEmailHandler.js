import nodemailer from 'nodemailer';
import { insertEmailWithTemplate } from '$lib/email/email-template';
import { SECRET_TRANSPORTER_USER, SECRET_TRANSPORTER_PASS } from '$env/static/private';
import { signatureImage } from '$lib/email/molly-email-signature-for-nodemailer';

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: SECRET_TRANSPORTER_USER,
		pass: SECRET_TRANSPORTER_PASS
	}
});

export const sendContactFormInternalEmail = async (data) => {
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
export const sendContactFormContacteeEmail = async (data) => {
	const emailContent = `
        <h2
            class="mobile-text"
            style="
            color: #3a6a5f;
            font-family: TimesNewRoman, 'Times New Roman', Times,
                Baskerville, Georgia, serif;
            font-size: 30px;
            font-weight: 400;
            margin: 0 0 20px 0;
            line-height: 120%;
            "
        >
            Hello ${data.name},
        </h2>

        <p
            style="
            color: #101112;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 16px;
            line-height: 1.5;
            margin: 0 0 16px 0;
            "
        >
            Thank you for contacting me. I will try getting back to you
            within 48 hours. Please keep in mind that this only includes
            working days.
        </p>
    `;
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
		html: insertEmailWithTemplate(emailContent)
	};

	try {
		let res = await transporter.sendMail(mailOptions);
		return res;
	} catch (error) {
		// console.log('fucked up', error);
		throw error;
	}
};

export const sendSuccessfulCheckoutSessionConfirmationEmail = async (data) => {
	const { customer_name, customer_email } = data;
	// console.log('Customer details from within the function: ', { customer_name, customer_email });
	const cal_link = `https://cal.com/mollymarsh/coaching-session?email=${customer_email}&name=${customer_name}`;
	const first_name = customer_name && customer_name.length > 0 ? customer_name.split(' ')[0] : '';
	const emailContent = `
		<h2 class="mobile-text" style="color: #3a6a5f; font-family: TimesNewRoman, 'Times New Roman', Times, Baskerville, Georgia, serif; font-size: 30px; font-weight: 400; margin: 0 0 20px 0; line-height: 120%;">Thank you for your order ${first_name}.</h2>
                
		<p style="color: #101112; font-family: Arial, Helvetica, sans-serif; font-size: 16px; line-height: 1.5; margin: 0 0 16px 0;">You can use the link below to book your session(s).</p>
		
		<p style="color: #101112; font-family: Arial, Helvetica, sans-serif; font-size: 16px; line-height: 1.5; margin: 0 0 24px 0;">If you're unable to find a slot that suits your needs then please get in touch so that we can look for a mutually convenient time. Looking forward to seeing you soon at your coaching session!</p>

		<a href="${cal_link}" style="background-color: #3a6a5f; border: none; border-radius: 4px; color: #ffffff; display: inline-block; font-family: Arial, Helvetica, sans-serif; font-size: 17px; font-weight: 400; padding: 12px 24px; text-align: center; text-decoration: none; width: 100%; margin: 0 0 24px 0; box-sizing: border-box;">BOOK YOUR SESSION</a>
	`;

	const mailOptions = {
		from: `Molly Marsh <${SECRET_TRANSPORTER_USER}>`,
		to: customer_email,
		subject: `Book your coaching session`,
		replyTo: SECRET_TRANSPORTER_USER,
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
	} catch (err) {
		console.log('Error in sending successful checkout confirmation email: ', err);
		throw err;
	}
};

export const sendErrorReport = async (data) => {
	const browserInfo = data.browser || { name: 'Unknown', version: 'Unknown' };
	const browserString = `${browserInfo.name} ${browserInfo.version}`;
	const errorMessages = (data.errors || []).map(
		(err) => `${err.message || ''} at ${err.filename || ''}:${err.lineno || ''}:${err.colno || ''}`
	);
	console.log({ browserInfo, browserString, errorMessages });

	// Create attachments array and add screenshot if available
	const attachments = [];
	if (data.screenshot) {
		// Extract the base64 data by removing the data URI prefix
		const base64Data = data.screenshot.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
		attachments.push({
			filename: 'screenshot.png',
			content: base64Data,
			encoding: 'base64',
			cid: 'screenshot@report.com' // Content ID for referencing in the HTML
		});
	}

	const mailOptions = {
		from: SECRET_TRANSPORTER_USER,
		to: 'rafal.potasz@gmail.com',
		subject: `Error Report ~ Molly`,
		html: `
            <h2>Bug Report</h2>
            <p><strong>URL:</strong> ${data.url}</p>
            <p><strong>Timestamp:</strong> ${data.timestamp}</p>
            <p><strong>Browser:</strong> ${browserString}</p>
            <p><strong>IP Address:</strong> ${data.clientIp}</p>
            
            ${errorMessages.length ? `<h3>Console Errors:</h3><pre>${errorMessages.join('\n')}</pre>` : ''}
            
            ${data.screenshot ? '<h3>Screenshot:</h3><img src="cid:screenshot@report.com" alt="Screenshot" style="max-width: 100%;" />' : '<p>No screenshot available</p>'}
        `,
		attachments: attachments
	};

	try {
		let res = await transporter.sendMail(mailOptions);
		console.log('Email sent apparently: ', res);
		// console.log('Internal email res: ', res);
		return res;
	} catch (error) {
		// console.log('fucked up', error);
		throw error;
	}
};
