import { JoiRequestValidationError } from "@global/helpers/errorHandler.helper";
import type { Request } from "express";
import type { ObjectSchema } from "joi";

interface ValidationSchemas {
  body?: ObjectSchema;
  params?: ObjectSchema;
  query?: ObjectSchema;
  headers?: ObjectSchema;
}

type IJoiDecorator = (target: any, key: string, descriptor: PropertyDescriptor) => void;

export function JoiValidation(schemas: ValidationSchemas): IJoiDecorator {
  return (_target: any, _key: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const req: Request = args[0];

      if (schemas.params) {
        const { error } = await Promise.resolve(schemas.params.validate(req.params));
        if (error?.details) {
          throw new JoiRequestValidationError(error.details[0].message);
        }
      }

      if (schemas.body) {
        const { error } = await Promise.resolve(schemas.body.validate(req.body));
        if (error?.details) {
          throw new JoiRequestValidationError(error.details[0].message);
        }
      }

      if (schemas.query) {
        const { error } = await Promise.resolve(schemas.query.validate(req.query));
        if (error?.details) {
          throw new JoiRequestValidationError(error.details[0].message);
        }
      }

      if (schemas.headers) {
        const { error } = await Promise.resolve(schemas.headers.validate(req.headers));
        if (error?.details) {
          throw new JoiRequestValidationError(error.details[0].message);
        }
      }

      return originalMethod.apply(this, args);
    };
    return descriptor;
  };
}
