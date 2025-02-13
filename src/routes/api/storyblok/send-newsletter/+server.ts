import { json, error } from '@sveltejs/kit';
import StoryblokClient from 'storyblok-js-client';
import { renderRichText } from '@storyblok/svelte';
import { PUBLIC_STORYBLOK_ACCESS_TOKEN } from '$env/static/public';
import { SECRET_BREVO_KEY } from '$env/static/private';
import mjml2html from 'mjml';
// import Brevo from '@getbrevo/brevo'; // Correct import
// Use require, as per the Brevo example
// const SibApiV3Sdk = require('sib-api-v3-sdk');
import SibApiV3Sdk from 'sib-api-v3-sdk';
// Debug what we get from Brevo
// console.log('Brevo object:', Brevo);
// console.log('Brevo keys:', Object.keys(Brevo));

const Storyblok = new StoryblokClient({
	accessToken: PUBLIC_STORYBLOK_ACCESS_TOKEN
});

// --- Brevo Client Initialization ---

const brevoListId = 3;

// --- Brevo Client Initialization (CORRECTED) ---
// let defaultClient = Brevo.ApiClient.instance;

// // Configure API key authorization: api-key
// let apiKey = defaultClient.authentications['api-key'];
// apiKey.apiKey = SECRET_BREVO_KEY;

// let apiInstance = new Brevo.EmailCampaignsApi();

// Storyblok AWS IPs - Updated list
const STORYBLOK_IPS = [
	'3.68.233.63', // EU (Frankfurt)
	'3.127.108.63', // EU (Frankfurt)
	'3.67.105.118', // EU (Frankfurt)
	'63.177.76.6', // Additional Storyblok IP
	'3.76.34.218'
];

// Set this to true during development/testing
const SKIP_IP_VALIDATION = true; // TODO: Set to false in production

function getOriginalIP(request) {
	const forwardedFor = request.headers.get('x-forwarded-for');
	if (forwardedFor) {
		const ips = forwardedFor.split(',').map((ip) => ip.trim());
		return ips[0];
	}

	return request.headers.get('cf-connecting-ip') || request.headers.get('x-real-ip') || getClientAddress();
}

function isValidStoryblokIP(ip) {
	if (SKIP_IP_VALIDATION) {
		return true;
	}
	return STORYBLOK_IPS.includes(ip);
}

export async function POST({ request, getClientAddress }) {
	try {
		const clientIP = getOriginalIP(request);

		console.log('Received webhook from IP:', clientIP);

		if (!isValidStoryblokIP(clientIP)) {
			console.warn(`Unauthorized webhook attempt from IP: ${clientIP}`, {
				headers: Object.fromEntries(request.headers),
				ip: clientIP
			});
			return json({ error: 'Unauthorized' }, { status: 401 });
		}

		const topic = request.headers.get('x-storyblok-topic');
		const body = await request.json();

		// console.log('Received webhook:', {
		//     topic,
		//     action: body.action,
		//     spaceId: body.space_id,
		//     storyId: body.story_id,
		//     fullSlug: body.full_slug,
		//     clientIP
		// });

		if (topic !== 'story.published') {
			return json({
				message: 'Webhook received but ignored - not a publication event'
			});
		}

		// Extract relevant data for newsletter
		let newsletterData = {
			body,
			storyId: body.story_id,
			fullSlug: body.full_slug,
			spaceId: body.space_id,
			action: body.action,
			text: body.text
		};

		const storyRes = await Storyblok.getStory(newsletterData.storyId, {
			version: 'published'
		});

		const storyData = storyRes.data.story;

		if (storyData?.content?.component !== 'article') {
			console.log("Ignoring, received data but not an article")
			return json({
				message: 'Webhook received but ignored - not an article'
			});
		}


		newsletterData = {
			...newsletterData,
			title: storyData.name,
			content: storyData.content
		};


		console.log('Newsletter data: ', { ...newsletterData });

		const renderedHtml = renderRichText(newsletterData.content.article_content);

		let mjmlTemplate = `
        <mjml>
          <mj-head>
            <mj-style>
              h1 {
                font-size: 28px;
                color: #003366;
                font-family: Arial, sans-serif;
                text-align: center; /* Center the title */
              }
              p {
                font-size: 16px;
                line-height: 1.6;
              }
              a {
                color: #ff6600;
                text-decoration: underline;
              }
            </mj-style>
             <mj-attributes>
                <mj-all font-family="Arial, sans-serif" />
                <mj-text font-size="16px" line-height="1.6" color="#555555" />
                <mj-section padding="20px 0" />
                <mj-column padding="0" />
            </mj-attributes>
          </mj-head>
          <mj-body background-color="#f4f4f4">
            <mj-section>
              <mj-column>
                <mj-text>
                  <h1>${newsletterData.title}</h1>
                </mj-text>
              </mj-column>
            </mj-section>
            <mj-section>
              <mj-column>
                <mj-text>
                  ${renderedHtml}
                </mj-text>
              </mj-column>
            </mj-section>
          </mj-body>
        </mjml>
        `;

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
		emailCampaigns.recipients = { listIds: [brevoListId] };

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
