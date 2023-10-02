import Joi from "joi";

export const contactAddSchema = Joi.object({
  name: Joi.string().min(2).max(20).required().messages({
    "string.base": 'The "name" field must be a string',
    "string.empty": 'The "name" field cannot be empty',
    "string.min": 'The "name" field must have at least {#limit} characters',
    "string.max": 'The "name" field cannot exceed {#limit} characters',
    "any.required": "missing required name field",
  }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .messages({
      "string.email": 'The "email" field must be a valid email address',
      "string.minDomainSegments":
        'The "email" field must have at least {#limit} domain segments',
      "string.tlds": 'The "email" field must have a valid top-level domain',
    }),
  phone: Joi.string()
    .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
    .messages({
      "string.pattern.base":
        'The "phone" field must match the format (123) 456-7890',
    }),
});
