/**
 * Generates HTML for checkout confirmation email
 * @param data Customer data
 * @returns HTML content for checkout confirmation email
 */
export function checkoutConfirmationTemplate(data: {
  customer_name: string;
  customer_email: string;
}): string {
  const cal_link = `https://cal.com/mollymarsh/coaching-session?email=${data.customer_email}`;
  // const first_name = data.customer_name && data.customer_name.length > 0 
  //   ? data.customer_name.split(' ')[0] 
  //   : '';
    
  return `
    <h2 class="mobile-text" style="color: #3a6a5f; font-family: TimesNewRoman, 'Times New Roman', Times, Baskerville, Georgia, serif; font-size: 30px; font-weight: 400; margin: 0 0 20px 0; line-height: 120%;">Thank you for your purchase.</h2>
            
    <p style="color: #101112; font-family: Arial, Helvetica, sans-serif; font-size: 16px; line-height: 1.5; margin: 0 0 16px 0;">You can use the link below to book your session(s).</p>
    
    <p style="color: #101112; font-family: Arial, Helvetica, sans-serif; font-size: 16px; line-height: 1.5; margin: 0 0 24px 0;">If you're unable to find a slot that suits your needs then please get in touch so that we can look for a mutually convenient time. Looking forward to seeing you soon at your coaching session!</p>

    <a href="${cal_link}" style="background-color: #3a6a5f; border: none; border-radius: 4px; color: #ffffff; display: inline-block; font-family: Arial, Helvetica, sans-serif; font-size: 17px; font-weight: 400; padding: 12px 24px; text-align: center; text-decoration: none; width: 100%; margin: 0 0 24px 0; box-sizing: border-box;">BOOK YOUR SESSION</a>
  `;
}