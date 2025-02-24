import { z } from 'zod';
import { deepFind, deepFindAll } from '$lib/scripts/search';
import { superValidate, message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

function buildFieldSchema(fieldData) {
	// Extract all the validation rules from the field data
	const { zod_base_type, required_error, invalid_type_error, validation_rules } = fieldData;

	let schema = z[zod_base_type]({
		...(required_error && { required_error }),
		...(invalid_type_error && { invalid_type_error })
	});

	validation_rules.forEach((rule) => {
		switch (rule.validation_rule_type) {
			case 'min':
				schema = schema.min(rule.validation_rule_value, { ...(rule.validation_rule_message && { message: rule.validation_rule_message }) });
				break;
			case 'max':
				schema = schema.max(rule.validation_rule_value, { ...(rule.validation_rule_message && { message: rule.validation_rule_message }) });
				break;
			case 'email':
				schema = schema.email({ ...(rule.validation_rule_message && { message: rule.validation_rule_message }) });
				break;
			case 'url':
				schema = schema.url({ ...(rule.validation_rule_message && { message: rule.validation_rule_message }) });
				break;
			case 'regex':
				schema = schema.regex(new RegExp(rule.validation_rule_value), {
					...(rule.validation_rule_message && { message: rule.validation_rule_message })
				});
				break;
			case 'optional':
				schema = schema.optional();
				break;
		}
	});

	return schema;
}

export const createFormSchema = (dataFromStoryblok) => {
	let schemaObject = {};

	// For each field in our form data, create its validation rules
	dataFromStoryblok.forEach((fieldData) => {
		// console.log(fieldData);
		schemaObject[fieldData.input_name] = buildFieldSchema(fieldData);
	});

	// Create a complete form validation schema
	return z.object(schemaObject);
};

function timedDeepFindAll(formData, predicate) {
	const now = typeof performance !== 'undefined' && performance.now ? performance.now.bind(performance) : Date.now;
	const startTime = now();
	const results = deepFindAll(formData, predicate);
	const endTime = now();
	return results;
}

const getForms = async (formObjects) => {
	const parsedForms = await Promise.all(
		formObjects.map(async (form, index) => {
			const tempFormInputs = form.form_inputs;
			const tempFormSchema = createFormSchema(tempFormInputs);
			await new Promise((resolve) => setTimeout(resolve, 100));
			// console.log({ index, form });
			const newForm = await superValidate(zod(tempFormSchema), { id: form.form_name });
			return newForm;
		})
	);
	return parsedForms;
};

export const getAllFormsDuringLoad = async (formData, predicate) => {
	const allForms = timedDeepFindAll(formData, predicate);
	let parsedForms = null;

	if (allForms && allForms.length > 0) {
		parsedForms = await getForms(allForms);
	}

	return parsedForms;
};
