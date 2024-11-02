import IPostPG from "../model/contracts/IPostPG";
import IPostPGRepository from "./contracts/IPostPGRepository";
import Post from "../model/Post.pg";
import {FindOptionsWhere} from "typeorm";
import PostStatus from "../contracts/PostStatus";

export default class PostPGRepository implements IPostPGRepository {
  public async findBySlug(slug: string): Promise<IPostPG | null> {
    return await Post.findOneBy({slug: slug})
  }
  public async findOne(id: string, relations?: string[]): Promise<IPostPG | null> {
    const result = await Post.findOne({where: {_id: id}, relations: ['author']})
    return result
  }
  public async findMany(params: FindOptionsWhere<Post>, relations?: string[]): Promise<IPostPG[]> {
    const resultQuery = await Post.findBy({...params})
    return resultQuery
  }
  public async findByStatus(userId: string, status: PostStatus): Promise<IPostPG[]> {
    return await Post.find({where: {author: {_id: userId}, status: status}, relations: ['author']})
  }
  public async create(params: Partial<IPostPG>): Promise<IPostPG> {
    const newPost = Post.create({...params})
    await newPost.save()
    return newPost
  }
  public async updateOne(id: string, params: Partial<IPostPG>): Promise<boolean> {
    const result = await Post.update({_id: id}, params)
    if(result.affected === undefined || result.affected < 1){
      return false
    }
    return true
  }
  public async deleteOne(id: string): Promise<boolean> {
    const result = await Post.delete({_id: id})
    if(result.affected !== null && result.affected !== undefined && result.affected > 0){
      return true
    }else {
      return false
    }
  }

  updateMany(where: Partial<IPostPG>, params: Partial<IPostPG>): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  deleteMany(params: Partial<IPostPG>): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  
}