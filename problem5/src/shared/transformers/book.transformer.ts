import type { IBookDocument } from "@book/book.interface";
import _ from "lodash";

class BookTransformer {
  public getOne(book: IBookDocument): Partial<IBookDocument> {
    return {
      id: book.id,
      title: book.title,
      author: book.author,
      description: book.description,
      publish_date: book.publish_date,
      publisher: book.publisher,
      price: book.price,
      status: book.status,
    };
  }

  public getMany(books: IBookDocument[]): Partial<IBookDocument>[] {
    return books.map((book) => this.getOne(book));
  }
}

export const bookTransformer = new BookTransformer();
