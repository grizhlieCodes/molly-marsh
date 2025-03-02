import { getStripeClient } from './client';
import type Stripe from 'stripe';

/**
 * Find an existing Stripe customer by email
 * @param email Customer email address
 * @returns Existing customer or null if not found
 */

export async function findCustomerByEmail(email: string): Promise<Stripe.Customer | null> {
	const stripe = getStripeClient();

	try {
		const customers = await stripe.customers.list({ email });
		return customers.data.length > 0 ? customers.data[0] : null;
	} catch (err) {
		console.error('Failed to find customer:', err);
		throw new Error(`Failed to find customer: ${err.message}`);
	}
}

/**
 * Create a new Stripe customer
 * @param email Customer email address
 * @param name Optional customer name
 * @returns Newly created customer
 */
export async function createCustomer(email: string, name?: string): Promise<Stripe.Customer> {
	const stripe = getStripeClient();

	try {
		let customerData = { email };
		if (name) {
			customerData.name = name;
		}
		const newCustomer = await stripe.customers.create(customerData);
		return newCustomer;
	} catch (err) {
		console.error('Failed to create customer:', err);
		throw new Error(`Failed to create customer: ${err.message}`);
	}
}

export const updateCustomerNameIfMissing = async (customer_id: string, session_customer_name: string) => {
	const stripe = getStripeClient();

	try {
		const customer = await stripe.customers.retrieve(customer_id);

		// wtf is 'in'?
		if (!('deleted' in customer) && (!customer.name || customer.name === null)) {
			const updatedCustomer = await stripe.customers.update(customerId, {
				name: session_customer_name
			});
			return { customer: updatedCustomer, status: 'Updated customer name.' };
		}

		if ('deleted' in customer) {
			throw new Error('Customer has been deleted');
		}

		return { customer, status: 'Customer already had a name.' };
	} catch (err) {
		console.error('Failed to update customer name:', err);
		throw new Error(`Failed to update customer name: ${err.message}`);
	}
};
