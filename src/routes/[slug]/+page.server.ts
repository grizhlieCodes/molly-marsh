import { redirect } from '@sveltejs/kit';

export const actions = {
	stripeCheckout: async ({ request, fetch }) => {
		const formData = await request.formData();
		const priceId = formData.get('priceId'); // value = price_...

		console.log('FORM DATA: =========== ', priceId); // WORKING TILL HERE

		// Make request to our webhook endpoint
		const response = await fetch('/api/stripe/checkout', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ priceId }),
			// Add this for development only
			// rejectUnauthorized: false
		}); // session

		if (!response.ok) {
			const errorData = await response.json();
			// Handle the error appropriately
			console.log(" ERROR RRRRR ================= AINT WORKING")
			throw new Error(errorData.error);
		}

		const { url } = await response.json();
		throw redirect(303, url);
	}
};
