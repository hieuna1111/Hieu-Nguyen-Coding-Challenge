import { TBookStatus } from "@global/definitions/type.definition";
import type mongoose from "mongoose";
import type { Document } from "mongoose";

export interface IBookDocument extends Document {
  _id: mongoose.Types.ObjectId;
  title: string;
  author: string;
  description: string;
  publish_date: Date;
  publisher: string;
  price: number;
  status: TBookStatus;
}
