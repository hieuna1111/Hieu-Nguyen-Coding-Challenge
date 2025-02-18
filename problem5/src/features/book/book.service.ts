import type { IPaginationResponse } from "@global/definitions/interface.definition";
import { BadRequestError } from "@global/helpers/errorHandler.helper";
import { bookRepository } from "@repositories/book.repository";
import type { FilterQuery } from "mongoose";
import type { IBookDocument, ICreateBookRequest, IListBookRequest, IUpdateBookRequest } from "@book/book.interface";
import _ from "lodash";

class BookService {
  public async create(dto: ICreateBookRequest): Promise<IBookDocument> {
    const publishDate = new Date(dto.publish_date);
    const newBook: Partial<IBookDocument> = { ...dto, publish_date: publishDate };
    return bookRepository.create(newBook);
  }

  public async get(bookId: string): Promise<IBookDocument> {
    const book = await bookRepository.findById(bookId);
    if (!book) {
      throw new BadRequestError(`"book_id" not found`);
    }
    return book;
  }

  public async list(dto: IListBookRequest): Promise<{ books: IBookDocument[]; pagination: IPaginationResponse }> {
    const { status, search_keyword } = dto;
    const page = dto?.page || 1;
    const limit = dto?.limit || 10;
    const skip = (page - 1) * limit;

    const filter: FilterQuery<IBookDocument> = { deleted_at: null };
    const sort: FilterQuery<IBookDocument> = {};

    if (status) {
      filter.status = status;
    }

    if (search_keyword) {
      filter.$text = {
        $search: search_keyword,
        $caseSensitive: false,
        $diacriticSensitive: false,
      };
      sort.score = { $meta: "textScore" };
    } else {
      sort.created_at = -1; // default
    }

    const [books, total] = await Promise.all([
      bookRepository.find(filter, {
        skip,
        limit,
        sort,
      }),
      bookRepository.countDocuments(filter),
    ]);

    const total_pages = Math.ceil(total / limit);
    return {
      books,
      pagination: {
        total,
        page,
        limit,
        total_pages,
      },
    };
  }

  public async update(bookId: string, dto: IUpdateBookRequest): Promise<IBookDocument> {
    const updatedBody = _.omitBy(dto, _.isNil);
    const updateBook = await bookRepository.update(bookId, updatedBody, { new: true });
    if (!updateBook) {
      throw new BadRequestError(`"book_id" not found`);
    }
    return updateBook;
  }

  public async softDelete(bookId: string): Promise<boolean> {
    console.log("1111");

    const isDeleted = await bookRepository.softDelete(bookId);
    if (!isDeleted) {
      throw new BadRequestError(`"book_id" not found`);
    }
    return isDeleted;
  }
}

export const bookService = new BookService();
