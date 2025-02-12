import { json } from '@sveltejs/kit';
import StoryblokClient from 'storyblok-js-client';
import { PUBLIC_STORYBLOK_ACCESS_TOKEN } from '$env/static/public';

const Storyblok = new StoryblokClient({
	accessToken: PUBLIC_STORYBLOK_ACCESS_TOKEN
});

// Storyblok AWS IPs - Updated list
const STORYBLOK_IPS = [
	'3.68.233.63', // EU (Frankfurt)
	'3.127.108.63', // EU (Frankfurt)
	'3.67.105.118', // EU (Frankfurt)
	'63.177.76.6' // Additional Storyblok IP
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

		newsletterData = {
			...newsletterData,
			title: storyData.name,
			content: storyData.content
		};

		console.log(newsletterData);

        const renderedHtml = Storyblok.richTextResolver.render(newsletterData.content.article_content);

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
              .article-image {
                width: 600px; /* Control image width */
                max-width: 100%; /* Ensure responsiveness */
                border: none;
                display: block; /* Important for some email clients */
                margin-left: auto; /* Center the image */
                margin-right: auto;
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
        `;

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
