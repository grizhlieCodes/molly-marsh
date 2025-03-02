/**
 * Generates HTML for a contact form response email
 * @param name Recipient's name
 * @returns HTML content for contact form response email
 */
export function contactResponseTemplate(name: string): string {
  return `
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
        Hello ${name},
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
        Thank you for contacting me. I will do my best to reply to your message within 2 working days.
    </p>
  `;
}

/**
 * Generates HTML for internal notification email about a new contact form submission
 * @param data Contact form data
 * @returns HTML content for internal notification email
 */
export function contactNotificationTemplate(data: {
  name: string;
  subject: string;
  email: string;
  message: string;
}): string {
  return `<!doctype html>
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
    </html>`;
}