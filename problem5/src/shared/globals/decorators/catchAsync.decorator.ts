import { BadRequestError, CustomError } from "@global/helpers/errorHandler.helper";

export function CatchAsync() {
  return (_target: any, _key: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      try {
        return await originalMethod.apply(this, args);
      } catch (error: any) {
        // catch errors from 3rd party services or libraries so you don't get a generic "Internal server error"
        /** example with firebase admin:
          if (error instanceof FirebaseAuthError) {
            switch (error.code) {
              case "auth/id-token-expired":
                throw new BadRequestError("ID token has expired");
              case "auth/user-not-found":
                throw new BadRequestError("Email has not been registered on cloud. Please sign in again.");
            }
          }
        */

        const customError =
          error instanceof CustomError ? error : new BadRequestError(error.message || "Internal server error");
        throw customError;
      }
    };
    return descriptor;
  };
}
