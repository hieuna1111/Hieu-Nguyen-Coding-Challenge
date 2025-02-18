import Joi, { type CustomHelpers } from "joi";
import mongoose from "mongoose";

class Helpers {
  public parseJson(prop: string): any {
    try {
      return JSON.parse(prop);
    } catch (err) {
      return prop;
    }
  }

  public objectIdValidator(value: string, helper: CustomHelpers) {
    const keys = helper.state.path || [];
    if (!mongoose.Types.ObjectId.isValid(value)) {
      return helper.message(`${keys[0]} ObjectId invalid` as any);
    }
    return value;
  }

  private validValuesValidator(validValues: string[]) {
    return (value: string, helper: CustomHelpers) => {
      const keys = helper.state.path || [];
      if (!validValues.includes(value)) {
        return helper.message(`"${keys[0]}" must be one of the following: ${validValues.join(", ")}` as any);
      }
      return value;
    };
  }

  public createValidValuesValidator(fieldName: string, enumValues: string[]) {
    return Joi.string()
      .custom(this.validValuesValidator(enumValues))
      .messages({
        "string.base": `"${fieldName}" must be of type string`,
        "string.empty": `"${fieldName}" cannot be empty`,
        "any.required": `"${fieldName}" is a required field`,
      });
  }
}

export const helpers: Helpers = new Helpers();
