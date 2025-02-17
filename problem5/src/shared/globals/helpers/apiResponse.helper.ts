import type { IPaginationResponse } from "@global/definitions/interface.definition";
import type { Response } from "express";
import { StatusCodes } from "http-status-codes";

type IApiResponse<T> = Response<{
  success: boolean;
  message: string;
  data: T;
  pagination?: IPaginationResponse;
}>;

interface IResponseWithPagination<T> {
  data: T;
  pagination: IPaginationResponse;
}

export class ApiResponse<T> {
  readonly success: boolean;
  readonly message: string;
  readonly responseObject: T | IResponseWithPagination<T>;
  readonly status_code: number;

  private constructor(
    success: boolean,
    message: string,
    responseObject: T | IResponseWithPagination<T>,
    status_code: number,
  ) {
    this.success = success;
    this.message = message;
    this.responseObject = responseObject;
    this.status_code = status_code;
  }

  static success<T>(message: string, responseObject: T): ApiResponse<T> {
    return new ApiResponse(true, message, responseObject, StatusCodes.OK);
  }

  static successWithPagination<T>(message: string, data: T, pagination: IPaginationResponse): ApiResponse<T> {
    return new ApiResponse(true, message, { data, pagination }, StatusCodes.OK);
  }

  static failure<T>(message: string, data: T, status_code: number = StatusCodes.BAD_REQUEST): ApiResponse<T> {
    return new ApiResponse(false, message, data, status_code);
  }

  send(response: Response): IApiResponse<T> {
    const responseData = {
      success: this.success,
      status_code: this.status_code,
      message: this.message,
    };

    if (this.isPaginatedResponse(this.responseObject)) {
      return response.status(this.status_code).json({
        ...responseData,
        data: this.responseObject.data,
        pagination: this.responseObject.pagination,
      });
    }

    return response.status(this.status_code).json({
      ...responseData,
      data: this.responseObject,
    });
  }

  private isPaginatedResponse(response: T | IResponseWithPagination<T>): response is IResponseWithPagination<T> {
    return typeof response === "object" && response !== null && "data" in response && "pagination" in response;
  }
}
