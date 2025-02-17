import { CatchAsync } from "@global/decorators/catchAsync.decorator";
import type { Request, Response } from "express";

import { JoiValidation } from "@global/decorators/validation.decorators";
import { creationValidator } from "@book/book.validator";
import { ApiResponse } from "@global/helpers/apiResponse.helper";

export class BookController {
  @CatchAsync()
  @JoiValidation({ body: creationValidator })
  public async create(req: Request, res: Response) {
    ApiResponse.success<any>("OK", {}).send(res);
  }

  @CatchAsync()
  @JoiValidation({})
  public async get() {}

  @CatchAsync()
  @JoiValidation({})
  public async list() {}

  @CatchAsync()
  @JoiValidation({})
  public async update() {}

  @CatchAsync()
  @JoiValidation({})
  public async delete() {}
}
