import type { Stripe } from 'stripe';
import { getStripeClient } from './client';
import type { CustomerResponse } from './types';

/**
 * Find a Stripe customer by email
 * @param email The customer's email address
 * @returns The customer object if found, otherwise null
 */
export async function findCustomerByEmail(email: string): Promise<Stripe.Customer | null> {
	const stripe = getStripeClient();

	try {
		const customers = await stripe.customers.list({ email });
		return customers.data.length > 0 ? customers.data[0] : null;
	} catch (err) {
		throw new Error(`Failed to find customer: ${err.message}`);
	}
}

/**
 * Create a new Stripe customer
 * @param email The customer's email address
 * @returns The newly created customer object
 */
export async function createCustomer(email: string): Promise<Stripe.Customer> {
	const stripe = getStripeClient();

	try {
		return await stripe.customers.create({ email });
	} catch (err) {
		throw new Error(`Failed to create customer: ${err.message}`);
	}
}

/**
 * Find an existing customer by email or create a new one
 * @param email The customer's email address
 * @returns The customer object
 */
export async function findOrCreateCustomer(email: string): Promise<Stripe.Customer> {
	let customer = await findCustomerByEmail(email);
	if (!customer) {
		customer = await createCustomer(email);
	}
	return customer;
}

/**
 * Update a customer's name if it's missing
 * @param customerId The Stripe customer ID
 * @param name The name to set if missing
 * @returns Object with customer data and status message
 */
export async function updateCustomerNameIfMissing(customerId: string, name: string): Promise<CustomerResponse> {
	const stripe = getStripeClient();

	const customer = await stripe.customers.retrieve(customerId);

	if (customer && (!customer.name || customer.name === null)) {
		const updatedCustomer = await stripe.customers.update(customerId, {
			name: name
		});
		return { customer: updatedCustomer, status: 'Updated customer name.' };
	}

	return { customer, status: 'Customer already had a name.' };
}
