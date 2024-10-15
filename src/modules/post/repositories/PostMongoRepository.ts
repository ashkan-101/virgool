import IPost from "../model/IPost";
import IPostRepository from "./IPostRepository";
import postModel from '../model/Post'

export default class PostMongoRepository implements IPostRepository {
  public async findOne(id: string, relations?: string[]): Promise<IPost | null> {
    return await postModel.findById(id)
  }
  findMany(params: any, relations?: string[]): Promise<IPost[]> {
    throw new Error("Method not implemented.");
  }


  public async create(params: Partial<IPost>): Promise<IPost>{
    return await postModel.create(params)
  }


  public async updateOne(id: string, params: Partial<IPost>): Promise<boolean> {
    const update = await postModel.updateOne({_id: id}, params)
    console.log(update);
    return update.acknowledged
  }
  updateMany(where: Partial<IPost>, params: Partial<IPost>): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  deleteOne(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  deleteMany(params: Partial<IPost>): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}