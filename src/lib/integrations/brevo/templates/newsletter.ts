import { renderRichText } from '@storyblok/svelte';
import mjml2html from 'mjml';

/**
 * Creates a MJML template for newsletter
 * @param title Newsletter title
 * @param content Newsletter content (Storyblok rich text)
 * @param summary Newsletter summary
 * @returns MJML template string
 */
export function createNewsletterMjml(title: string, content: any, summary: string): string {
  const renderedHtml = renderRichText(content);
  
  return `
    <mjml>
    <mj-head>
      <mj-font name="Playfair Display" href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap" />
      <mj-style>
      @media only screen and (max-width:480px) {
        .mobile-text td {
          padding: 0 !important;
        }
      }
      @media only screen and (min-width:481px) {
        .mobile-text td {
          padding: 0 32px !important;
        }	
      }
      h1 {
        font-family: 'Playfair Display', serif;
        font-size: 42px;
        line-height: 1;
        color: #1a1a1a;
        font-weight: 700;
        margin-bottom: 12px;
        text-align: left;
      }
      h2 {
        font-family: 'Playfair Display', serif;
        font-size: 32px;
        line-height: 1.3;
        color: #1a1a1a;
        font-weight: 700;
        margin-top: 40px;
        margin-bottom: 20px;
      }
      p {
        font-size: 16px;
        line-height: 1.8;
        color: #333333;
        margin-bottom: 20px;
      }
      p.summary {
        font-size: 18px;
        font-weight: 500;
        color: #1a1a1a;
        line-height: 1.6;
        font-style: italic;
      }
      a {
        color: #2F5851;
        text-decoration: underline;
      }
      ul, ol {
        margin-left: 0;
        padding-left: 12px;
        margin-bottom: 20px;
      }
      li {
        margin-bottom: 10px;
        line-height: 1.6;
        color: #333333;
        padding-left: 6px;
      }
      blockquote {
        border-left: 4px solid #2F5851;
        padding-left: 12px;
        margin-left: 0;
        margin-right: 0;
        font-style: italic;
      }
        </mj-style>
      <mj-attributes>
        <mj-text padding="0" font-family="Arial, sans-serif" />
        <mj-section padding="12px 24px" background-color="#ffffff" />
      </mj-attributes>
    </mj-head>
    <mj-body background-color="#EFF8F6">
      <mj-wrapper padding="0" background-color="#ffffff">
        <mj-section>
          <mj-column css-class="mobile-text">
            <mj-text><h1>${title}</h1></mj-text>
          </mj-column>
        </mj-section>

        <mj-section>
        <mj-column css-class="mobile-text">
          <mj-text><p style="font-size: 18px; font-weight: 500; color: #1a1a1a; line-height: 1.6; font-style: italic;">${summary}</p></mj-text>
        </mj-column>
        </mj-section>

        <mj-section>
        <mj-column css-class="mobile-text">
          <mj-divider border-width="1px" border-color="#DDDDDD" />
        </mj-column>
        </mj-section>
        
        <mj-section>
          <mj-column css-class="mobile-text">
            <mj-text>${renderedHtml}</mj-text>
          </mj-column>
        </mj-section>

        <mj-section>
        <mj-column css-class="mobile-text">
          <mj-raw>
          <table cellpadding="0" cellspacing="0" style="font-family: Arial, sans-serif; color: #333333; font-size: 14px; line-height: 1.4; border-collapse: collapse;">
            <tr>
            <td style="padding: 20px 0;">
              <img src="https://a.storyblok.com/f/320425/388x388/6d88b78ce7/molly-email-signature-img.png/m/" alt="Molly Marsh" style="width: 100px; height: 100px; border-radius: 50%; margin-bottom: 15px;">
              <div style="margin-bottom: 5px;">
              <span style="font-size: 16px; font-weight: bold; color: #18181b;">Molly Marsh</span>
              <span style="color: #46464d; font-size: 13px;"> (She/Her)</span>
              </div>
              <div style="color: #46464d; font-weight: medium; margin-bottom: 6px;">
              Transformative Life Coach
              </div>
              <div style="border-top: 1px solid #d4d4d8; margin: 8px 0;"></div>
              <div>
              <a href="http://www.mollymarshcoaching.com" style="color: #235247; text-decoration: none;">www.mollymarshcoaching.com</a>
              </div>
            </td>
            </tr>
          </table>
          </mj-raw>
        </mj-column>
      </mj-section>

      <mj-section>
        <mj-column css-class="mobile-text">
          <mj-divider border-width="1px" border-color="#DDDDDD" />
        </mj-column>
        </mj-section>
        
        <mj-section>
          <mj-column css-class="mobile-text">
            <mj-text align="left" color="#666666" font-size="14px">
              <p>
                © ${new Date().getFullYear()} Molly Marsh Coaching. All rights reserved.<br/>
              </p>
            </mj-text>
          </mj-column>
        </mj-section>
      </mj-wrapper>
    </mj-body>
  </mjml>
  `;
}

/**
 * Converts MJML template to HTML
 * @param mjmlTemplate MJML template string
 * @returns Object containing HTML and any errors
 */
export function convertMjmlToHtml(mjmlTemplate: string) {
  return mjml2html(mjmlTemplate);
}