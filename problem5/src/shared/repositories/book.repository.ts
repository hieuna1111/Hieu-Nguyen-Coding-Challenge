import type { IBookDocument } from "@book/book.interface";
import { BookModel } from "@book/book.model";
import { BaseRepository } from "@repositories/base.repository";

class BookRepository extends BaseRepository<IBookDocument> {
  constructor() {
    super(BookModel);
  }
}

export const bookRepository = new BookRepository();
