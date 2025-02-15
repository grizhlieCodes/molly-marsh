import { json, error } from '@sveltejs/kit';
import StoryblokClient from 'storyblok-js-client';
import { renderRichText } from '@storyblok/svelte';
import { PUBLIC_STORYBLOK_ACCESS_TOKEN } from '$env/static/public';
import mjml2html from 'mjml';

// Brevo
import { SECRET_BREVO_KEY } from '$env/static/private';
const BREVO_LIST_ID = 3;
import SibApiV3Sdk from 'sib-api-v3-sdk';

// Initialize Storyblok client
const Storyblok = new StoryblokClient({
	accessToken: PUBLIC_STORYBLOK_ACCESS_TOKEN
});

// Story processing functions
async function getStoryData(storyId) {
	const storyRes = await Storyblok.getStory(storyId, {
		version: 'published'
	});
	return storyRes.data.story;
}

function isValidArticle(storyData) {
	return storyData?.content?.component === 'article';
}

function createNewsletterData(webhook, storyData) {
	return {
		body: webhook,
		storyId: webhook.story_id,
		fullSlug: webhook.full_slug,
		spaceId: webhook.space_id,
		action: webhook.action,
		text: webhook.text,
		title: storyData.name,
		content: storyData.content
	};
}

// Email template functions
// function createMjmlTemplate(title, content) {
// 	const renderedHtml = renderRichText(content);
// 	return `
// 	  <mjml>
// 		<mj-head>
// 		  <mj-font name="Playfair Display" href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap" />
// 		  <mj-style>
// 			@media only screen and (max-width:480px) {
// 			  .mobile-padding div {
// 				padding-left: 12px !important;
// 				padding-right: 12px !important;
// 			  }
// 			}
// 			h1 {
// 			  font-family: 'Playfair Display', serif;
// 			  font-size: 42px;
// 			  line-height: 1.2;
// 			  color: #1a1a1a;
// 			  font-weight: 700;
// 			  margin-bottom: 20px;
// 			  text-align: left;
// 			}
// 			h2 {
// 			  font-family: 'Playfair Display', serif;
// 			  font-size: 32px;
// 			  line-height: 1.3;
// 			  color: #1a1a1a;
// 			  font-weight: 700;
// 			  margin-top: 40px;
// 			  margin-bottom: 20px;
// 			}
// 			p {
// 			  font-size: 16px;
// 			  line-height: 1.8;
// 			  color: #333333;
// 			  margin-bottom: 20px;
// 			}
// 			a {
// 			  color: #2F5851;
// 			  text-decoration: underline;
// 			}
// 			ul, ol {
// 			  margin-left: 0;
// 			  padding-left: 24px;
// 			  margin-bottom: 20px;
// 			}
// 			li {
// 			  margin-bottom: 10px;
// 			  line-height: 1.6;
// 			  color: #333333;
// 			  padding-left: 6px;
// 			}
// 			blockquote {
// 			  border-left: 4px solid #2F5851;
// 			  padding-left: 20px;
// 			  margin-left: 0;
// 			  margin-right: 0;
// 			  font-style: italic;
// 			}
// 		  </mj-style>
// 		  <mj-attributes>
// 			<mj-all font-family="Arial, sans-serif" />
// 			<mj-text font-size="16px" line-height="1.8" color="#333333" />
// 			<mj-section padding="40px 20px" />
// 			<mj-column padding="0 10px" />
// 		  </mj-attributes>
// 		</mj-head>
// 		<mj-body background-color="#EFF8F6" width="680px">
// 		  <mj-wrapper padding="0" background-color="#ffffff">
// 			<!-- Header Section -->
// 			<mj-section padding="40px 0 0 0" background-color="#ffffff">
// 			  <mj-column css-class="mobile-padding" padding="0 20px" width="100%">
// 				<mj-text>
// 				  <h1>${title}</h1>
// 				</mj-text>
// 			  </mj-column>
// 			</mj-section>

// 			<!-- Content Section -->
// 			<mj-section padding="0" background-color="#ffffff">
// 			  <mj-column padding="0 20px" width="100%">
// 				<mj-text>
// 				  ${renderedHtml}
// 				</mj-text>
// 			  </mj-column>
// 			</mj-section>

// 			<!-- Footer Section -->
// 			<mj-section padding="0 0 40px 0" background-color="#ffffff">
// 			  <mj-column padding="0 20px" width="100%">
// 				<mj-text align="center" color="#666666" font-size="14px">
// 				  <p style="margin-top: 30px; border-top: 1px solid #eeeeee; padding-top: 20px;">
// 					© ${new Date().getFullYear()} Molly Marsh Coaching. All rights reserved.
// 					<br/>
// 					<a href="https://mollymarshcoaching.com" style="color: #2F5851; text-decoration: none;">www.mollymarshcoaching.com</a>
// 				  </p>
// 				</mj-text>
// 			  </mj-column>
// 			</mj-section>
// 		  </mj-wrapper>
// 		</mj-body>
// 		  </mj-wrapper>
// 		</mj-body>
// 	  </mjml>
// 	`;
//   }

function createMjmlTemplate(title, content, summary) {
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

// Main POST handler
export async function POST({ request, getClientAddress }) {
	try {
		const topic = request.headers.get('x-storyblok-topic');
		const body = await request.json();

		if (topic !== 'story.published') {
			return json({
				message: 'Webhook received but ignored - not a publication event'
			});
		}

		// Get and validate story data
		const storyData = await getStoryData(body.story_id);
		if (!isValidArticle(storyData)) {
			console.log('Ignoring, received data but not an article');
			return json({
				message: 'Webhook received but ignored - not an article'
			});
		}

		// Create newsletter data
		const newsletterData = createNewsletterData(body, storyData);
		// console.log('Newsletter data: ', { ...newsletterData });

		// Create email template
		// console.log("Article summary: ", newsletterData.content.article_summary)
		const mjmlTemplate = createMjmlTemplate(newsletterData.title, newsletterData.content.article_content, newsletterData.content.article_summary);
		const { html, errors } = mjml2html(mjmlTemplate);

		if (errors.length > 0) {
			console.error('MJML Errors:', errors);
			throw error(500, `Error compiling MJML: ${errors.map((e) => e.formattedMessage).join('\n')}`);
		}

		// 8. Initialize Brevo API client
		const defaultClient = SibApiV3Sdk.ApiClient.instance;
		const apiKey = defaultClient.authentications['api-key'];
		apiKey.apiKey = SECRET_BREVO_KEY;

		const apiInstance = new SibApiV3Sdk.EmailCampaignsApi();
		const emailCampaigns = new SibApiV3Sdk.CreateEmailCampaign();

		// Set up email campaign
		emailCampaigns.name = `Newsletter - ${storyData.name}`;
		emailCampaigns.subject = storyData.name;
		emailCampaigns.sender = {
			name: 'Molly Marsh',
			email: 'molly@mollymarshcoaching.com'
		};
		emailCampaigns.type = 'classic';
		emailCampaigns.htmlContent = html;
		emailCampaigns.recipients = { listIds: [BREVO_LIST_ID] };

		try {
			const campaignData = await apiInstance.createEmailCampaign(emailCampaigns);
			console.log('Email campaign created successfully:', campaignData);
			return json({
				message: 'Webhook processed and email campaign created successfully!',
				campaignId: campaignData.id
			});
		} catch (campaignError) {
			console.error('Error creating email campaign:', campaignError);
			const errorMessage = campaignError.response?.body?.message || campaignError.message;
			throw error(500, `Brevo API error: ${errorMessage}`);
		}

		return json({
			message: 'Webhook processed successfully',
			data: newsletterData
		});
	} catch (error) {
		console.error('Error processing webhook:', error);
		return json(
			{
				error: 'Internal server error',
				details: error.message
			},
			{ status: 500 }
		);
	}
}
