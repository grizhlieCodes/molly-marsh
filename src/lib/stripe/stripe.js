/**
 * @deprecated This module is deprecated. Use the new Stripe integration in $lib/integrations/stripe instead.
 */

export const updateCustomerNameIfMissing = async (stripe, customer_id, session_customer_name) => {
	console.warn('DEPRECATED: Using legacy stripe.js. Please migrate to $lib/integrations/stripe');
	
	const customer = await stripe.customers.retrieve(customer_id);

	if (customer && (!customer.name || customer.name === null)) {
		const updatedCustomer = await stripe.customers.update(customer_id, {
			name: session_customer_name
		});
		return { customer: updatedCustomer, status: 'Updated customer name.' };
	}

	return { customer, status: 'Customer already had a name.' };
};