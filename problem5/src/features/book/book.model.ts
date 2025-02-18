import type { IBookDocument } from "@book/book.interface";
import { BookStatusConst } from "@global/definitions/constant.definition";
import { type Model, Schema, model } from "mongoose";

const bookSchema: Schema<IBookDocument> = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    publish_date: { type: Date, required: true },
    publisher: { type: String, required: true },
    price: { type: Number, required: true },
    status: { type: String, required: true, enum: Object.values(BookStatusConst) },
    deleted_at: { type: Date, default: null },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  },
);

bookSchema.index({ status: 1 });

bookSchema.index(
  { title: "text", description: "text" },
  {
    weights: { title: 1, description: 2 },
    default_language: "none",
    name: "BookTextIndex",
  },
);

const BookModel: Model<IBookDocument> = model<IBookDocument>("book", bookSchema, "books");

export { BookModel };
