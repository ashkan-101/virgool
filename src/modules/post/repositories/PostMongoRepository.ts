import IPost from "../model/IPost";
import IPostRepository from "./IPostRepository";
import postModel from '../model/Post'
import { FilterQuery } from "mongoose";

export default class PostMongoRepository implements IPostRepository {
  public async findOne(id: string, relations?: string[]): Promise<IPost | null> {
    return await postModel.findById(id)
  }

  public async findMany(params: FilterQuery<IPost>, relations?: string[]): Promise<IPost[]> {
    const post = await postModel.find(params)
    return post
  }

  public async findBySlug(slug: string): Promise<IPost | null> {
    return await postModel.findOne({slug: slug})
  }

  public async create(params: Partial<IPost>): Promise<IPost>{
    return await postModel.create(params)
  }

  public async updateOne(id: string, params: Partial<IPost>): Promise<boolean> {
    const update = await postModel.updateOne({_id: id}, params)
    return update.acknowledged && update.matchedCount > 0
  }
  updateMany(where: Partial<IPost>, params: Partial<IPost>): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  public async deleteOne(id: string): Promise<boolean> {
    const deletePost = await postModel.deleteOne({_id: id})
    return deletePost.deletedCount > 0
  }

  deleteMany(params: Partial<IPost>): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}