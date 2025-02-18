import { CatchAsync } from "@global/decorators/catchAsync.decorator";
import type { Request, Response } from "express";

import type { IBookDocument } from "@book/book.interface";
import { bookService } from "@book/book.service";
import { bookIdValidator, creationValidator, listingValidator, updatingValidator } from "@book/book.validator";
import { JoiValidation } from "@global/decorators/validation.decorators";
import { ApiResponse } from "@global/helpers/apiResponse.helper";
import { bookTransformer } from "@transformers/book.transformer";

export class BookController {
  @CatchAsync()
  @JoiValidation({ body: creationValidator })
  public async create(req: Request, res: Response) {
    const body = req.body;
    const newBook = await bookService.create(body);
    const result = bookTransformer.getOne(newBook);
    ApiResponse.success<Partial<IBookDocument>>("OK", result).send(res);
  }

  @CatchAsync()
  @JoiValidation({ query: listingValidator })
  public async list(req: Request, res: Response) {
    const query = req.query;
    const { books, pagination } = await bookService.list(query);
    const data = bookTransformer.getMany(books);
    ApiResponse.successWithPagination<Partial<IBookDocument>[]>("OK", data, pagination).send(res);
  }

  @CatchAsync()
  @JoiValidation({ params: bookIdValidator })
  public async get(req: Request, res: Response) {
    const { book_id } = req.params;
    const book = await bookService.get(book_id);
    const result = bookTransformer.getOne(book);
    ApiResponse.success<Partial<IBookDocument>>("OK", result).send(res);
  }

  @CatchAsync()
  @JoiValidation({ body: updatingValidator })
  public async update(req: Request, res: Response) {
    const { book_id } = req.params;
    const body = req.body;
    const updatedBook = await bookService.update(book_id, body);
    const result = bookTransformer.getOne(updatedBook);
    ApiResponse.success<Partial<IBookDocument>>("OK", result).send(res);
  }

  @CatchAsync()
  @JoiValidation({ params: bookIdValidator })
  public async delete(req: Request, res: Response) {
    const { book_id } = req.params;
    const isDeleted = await bookService.softDelete(book_id);
    const result = { book_id, is_deleted: isDeleted };
    ApiResponse.success<typeof result>("OK", result).send(res);
  }
}
