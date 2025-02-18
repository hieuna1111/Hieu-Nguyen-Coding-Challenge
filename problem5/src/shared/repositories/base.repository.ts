import type { Document, FilterQuery, Model, QueryOptions, UpdateQuery, Types } from "mongoose";
import mongoose from "mongoose";

export interface IBaseRepository<T extends Document> {
  create(item: Partial<T>): Promise<T>;
  update(id: string, item: UpdateQuery<T>, options?: QueryOptions): Promise<T | null>;
  softDelete(id: string): Promise<boolean>;
  find(filter: FilterQuery<T>, options?: QueryOptions): Promise<T[]>;
  findOne(filter: FilterQuery<T>): Promise<T | null>;
  findById(id: string): Promise<T | null>;
  countDocuments(filter: FilterQuery<T>): Promise<number>;
}

export class BaseRepository<T extends Document> implements IBaseRepository<T> {
  protected model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async create(item: Partial<T>): Promise<T> {
    return this.model.create(item);
  }

  async update(id: string, item: UpdateQuery<T>, options?: QueryOptions): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, { $set: item }, options);
  }

  async softDelete(id: string): Promise<boolean> {
    const result = await this.model.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(id), deleted_at: null },
      { deleted_at: new Date() },
    );
    return result !== null;
  }

  async find(filter: FilterQuery<T>, options?: QueryOptions): Promise<T[]> {
    return this.model.find(filter, null, options);
  }

  async findOne(filter: FilterQuery<T>): Promise<T | null> {
    return this.model.findOne(filter);
  }

  async findById(id: string): Promise<T | null> {
    return this.model.findById(id);
  }

  async countDocuments(filter: FilterQuery<T>): Promise<number> {
    return this.model.countDocuments(filter);
  }
}
