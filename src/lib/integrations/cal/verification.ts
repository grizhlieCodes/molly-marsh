import { createHmac, timingSafeEqual } from 'crypto';
import { CAL_WEBHOOK_SECRET } from '$env/static/private';

export function verifyCalWebhook(payload: string, signature: string): boolean {
	const hmac = createHmac('sha256', CAL_WEBHOOK_SECRET);
	const minifiedPayload = JSON.stringify(JSON.parse(payload));
	hmac.update(minifiedPayload);
	const calculatedSignature = hmac.digest('hex');
	try {
		return timingSafeEqual(Buffer.from(calculatedSignature, 'hex'), Buffer.from(signature, 'hex'));
	} catch (err) {
		console.error('Signature comparison error:', err);
		return false;
	}
}
