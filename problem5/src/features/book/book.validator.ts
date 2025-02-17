import { BookStatusConst } from "@global/definitions/constant.definition";
import { helpers } from "@global/helpers/helpers";
import Joi, { type ObjectSchema } from "joi";

const bookStatusValues = Object.values(BookStatusConst);

const bookIdValidator = Joi.object().keys({
  book_id: Joi.string().custom(helpers.objectIdValidator).required().messages({
    "string.base": `"book_id" must be of type string`,
    "string.empty": `"book_id" is required`,
    "any.required": `"book_id" is a required field`,
  }),
});

const creationValidator: ObjectSchema = Joi.object().keys({
  title: Joi.string().required().messages({
    "string.base": `"title" must be of type string`,
    "string.empty": `"title" cannot be empty`,
    "any.required": `"title" is a required field`,
  }),
  author: Joi.string().required().messages({
    "string.base": `"author" must be of type string`,
    "string.empty": `"author" cannot be empty`,
    "any.required": `"author" is a required field`,
  }),
  description: Joi.string().messages({
    "string.base": `"description" must be of type string`,
    "string.empty": `"description" cannot be empty`,
    "any.required": `"description" is a required field`,
  }),
  publish_date: Joi.string().isoDate().required().messages({
    "string.base": `"publish_date" must be a string`,
    "string.isoDate": `"publish_date" must be in ISO format (YYYY-MM-DDTHH:mm:ss.SSSZ)`,
    "any.required": `"publish_date" is a required field`,
  }),
  publisher: Joi.string().required().messages({
    "string.base": `"publisher" must be of type string`,
    "string.empty": `"publisher" cannot be empty`,
    "any.required": `"publisher" is a required field`,
  }),
  price: Joi.number().min(0).required().messages({
    "number.base": `"price" must be a number`,
    "number.min": `"price" cannot be negative`,
    "any.required": `"price" is a required field`,
  }),
  status: helpers.createValidValuesValidator("status", bookStatusValues).required(),
});

export { bookIdValidator, creationValidator };
