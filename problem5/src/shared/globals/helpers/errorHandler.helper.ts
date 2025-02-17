import HTTP_STATUS from "http-status-codes";

export interface IErrorResponse {
  success: boolean;
  message: string;
  status_code: number;
  serializeErrors(): IError;
}

export interface IError {
  message: string;
  status_code: number;
  success: boolean;
}

export abstract class CustomError extends Error {
  success = false;
  abstract status_code: number;

  serializeErrors(): IError {
    return {
      success: this.success,
      status_code: this.status_code,
      message: this.message,
    };
  }
}

export class JoiRequestValidationError extends CustomError {
  status_code = HTTP_STATUS.BAD_REQUEST;
}

export class BadRequestError extends CustomError {
  status_code = HTTP_STATUS.BAD_REQUEST;
}

export class NotFoundError extends CustomError {
  status_code = HTTP_STATUS.NOT_FOUND;
}

export class NotAuthorizedError extends CustomError {
  status_code = HTTP_STATUS.UNAUTHORIZED;
}

export class FileTooLargeError extends CustomError {
  status_code = HTTP_STATUS.REQUEST_TOO_LONG;
}

export class ServerError extends CustomError {
  status_code = HTTP_STATUS.SERVICE_UNAVAILABLE;
}

export class BadGatewayError extends CustomError {
  status_code = HTTP_STATUS.BAD_GATEWAY;
}

export class ConflictError extends CustomError {
  status_code = HTTP_STATUS.CONFLICT;
}

export class ForbiddenError extends CustomError {
  status_code = HTTP_STATUS.FORBIDDEN;
}

export class MethodNotAllowedError extends CustomError {
  status_code = HTTP_STATUS.METHOD_NOT_ALLOWED;
}

export class TooManyRequestsError extends CustomError {
  status_code = HTTP_STATUS.TOO_MANY_REQUESTS;
}

export class TranscriptsDisabled extends CustomError {
  constructor(videoId: string) {
    super();
    this.message = `Subtitles are disabled for video ID: ${videoId}`;
  }
  status_code = HTTP_STATUS.BAD_REQUEST;
}

export class DBRecordNotFoundError extends CustomError {
  constructor(collectionName: string, identifier?: string) {
    super();
    this.message = identifier
      ? `No ${collectionName} record found with identifier '${identifier}'`
      : `No ${collectionName} record found in database`;
  }
  status_code = HTTP_STATUS.NOT_FOUND;
}

export class PromptValidatorError extends CustomError {
  constructor(identifier: string, message: string) {
    super();
    this.message = `${identifier} ${message} for the prompt`;
  }
  status_code = HTTP_STATUS.UNPROCESSABLE_ENTITY;
}

export class FactoryBuilderError extends CustomError {
  constructor(identifier: string, value: string) {
    super();
    this.message = `"${identifier}": ${value} is not supported`;
  }
  status_code = HTTP_STATUS.UNPROCESSABLE_ENTITY;
}
