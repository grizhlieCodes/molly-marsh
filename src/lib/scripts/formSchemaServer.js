import { z } from 'zod';

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
