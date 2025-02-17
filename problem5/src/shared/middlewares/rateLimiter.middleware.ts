import { TooManyRequestsError } from "@global/helpers/errorHandler.helper";
import { config } from "@root/config";
import type { Request } from "express";
import { rateLimit } from "express-rate-limit";

export const rateLimiter = (limit?: number, windowMs?: number) => {
  return rateLimit({
    legacyHeaders: true,
    limit: limit || config.env.RATE_LIMIT_MAX_REQUESTS,
    message: "Too many requests, please try again later.",
    standardHeaders: true,
    windowMs: windowMs || config.env.RATE_LIMIT_WINDOW_MS,
    keyGenerator: (req: Request) => req.ip as string,
    handler: (req, res, next) => {
      const error = new TooManyRequestsError();
      error.message = "Too many requests, please try again later.";
      next(error);
    },
  });
};
