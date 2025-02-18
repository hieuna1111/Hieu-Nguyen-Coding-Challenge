import type { IPaginationOptions } from "@global/definitions/interface.definition";
import type { TBookStatus } from "@global/definitions/type.definition";
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
  deleted_at?: Date;
}

export interface ICreateBookRequest {
  title: string;
  author: string;
  description: string;
  publish_date: string;
  publisher: string;
  price: number;
  status: TBookStatus;
}

export interface IListBookRequest extends IPaginationOptions {
  status?: TBookStatus;
  search_keyword?: string;
}

export interface IUpdateBookRequest {
  title?: string;
  author?: string;
  description?: string;
  publish_date?: string;
  publisher?: string;
  price?: number;
  status?: TBookStatus;
}
