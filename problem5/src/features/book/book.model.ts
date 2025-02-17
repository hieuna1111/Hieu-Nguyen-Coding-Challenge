import { type Model, Schema, model } from "mongoose";
import { IBookDocument } from "@book/book.interface";
import { BookStatusConst } from "@global/definitions/constant.definition";

const bookSchema: Schema<IBookDocument> = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    publish_date: { type: Date, required: true },
    publisher: { type: String, required: true },
    price: { type: Number, required: true },
    status: { type: String, required: true, enum: Object.values(BookStatusConst) },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  },
);

bookSchema.index({ status: 1 });

const BookModel: Model<IBookDocument> = model<IBookDocument>("book", bookSchema, "books");

export { BookModel };
