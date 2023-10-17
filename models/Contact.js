import { Schema, model } from "mongoose";
import Joi from "joi";
import { handleSaveError, runValidatorsAtUpdate } from "./hooks.js";

const samplePhoneNumber = /^\(\d{3}\) \d{3}-\d{4}$/;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },

    phone: {
      type: String,
      match: samplePhoneNumber,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);
contactSchema.post("save", handleSaveError);

contactSchema.pre("findOneAndUpdate", runValidatorsAtUpdate);
contactSchema.post("findOneAndUpdate", handleSaveError);

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
  phone: Joi.string().pattern(samplePhoneNumber).messages({
    "string.pattern.base":
      'The "phone" field must match the format (123) 456-7890',
  }),
  favorite: Joi.boolean(),
});

export const contactUpdateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const Contact = model("contact", contactSchema);

export default Contact;
