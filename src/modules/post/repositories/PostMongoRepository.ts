import { FilterQuery } from "mongoose";
import postModel from '../model/Post.mongo'
import IPostMongo from '../model/contracts/IPostMongo';
import IPostMongoRepository from './contracts/IPostMongoRepository';

export default class PostMongoRepository implements IPostMongoRepository {
  public async findOne(id: string, relations?: string[]): Promise<IPostMongo | null> {
    return await postModel.findById(id).populate(['author', 'subcategory'])
  }
  public async findMany(params: FilterQuery<IPostMongo>, relations?: string[]): Promise<IPostMongo[]> {
    const post = await postModel.find(params)
    return post
  }
  public async findBySlug(slug: string): Promise<IPostMongo | null> {
    return await postModel.findOne({slug: slug})
  }
  public async findByStatus(userId: string, status: string): Promise<IPostMongo[]> {
    return await postModel.find({author: userId, status: status}).populate(['author', 'subcategory'])
  }
  public async create(params: Partial<IPostMongo>): Promise<IPostMongo>{
    return await postModel.create(params)
  }
  public async updateOne(id: string, params: Partial<IPostMongo>): Promise<boolean> {
    const update = await postModel.updateOne({_id: id}, params)
    return update.acknowledged && update.matchedCount > 0
  }
  public async deleteOne(id: string): Promise<boolean> {
    const deletePost = await postModel.deleteOne({_id: id})
    return deletePost.deletedCount > 0
  }

  updateMany(where: Partial<IPostMongo>, params: Partial<IPostMongo>): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  deleteMany(params: Partial<IPostMongo>): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}