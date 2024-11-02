import IPost from "../model/contracts/IBasePost";
import PostStatus from "../contracts/PostStatus";
import DatabaseName from "../../contracts/DatabaseName";
import PostRepositoryFactory from "../repositories/PostRepositoryFactory";
import IPostPGRepository from "../repositories/contracts/IPostPGRepository";
import IPostMongoRepository from "../repositories/contracts/IPostMongoRepository";

import IPostMongo from "../model/contracts/IPostMongo";
import IPostPG from "../model/contracts/IPostPG";

export default class Factory {
  private readonly postRepository: IPostMongoRepository | IPostPGRepository


  constructor(){
    this.postRepository = new PostRepositoryFactory().getRepository(process.env.APP_DATABASE as DatabaseName)
  }

  public async saveNewDraft(postParams: Partial<IPost>){
    return await this.postRepository.create(postParams)
  }
  public async findPostWithId(id: string){
    const post = await this.postRepository.findOne(id)
    return post
  }
  public async findPostWithSlug(slug: string){
    return await this.postRepository.findBySlug(slug)
  }
  public async findPostsWithStatus(userId: string, status: PostStatus){
    // const queryParams = {author: userId, status: status}
    return await this.postRepository.findByStatus(userId, status)
  }
  public async updatePost(id: string ,params: Partial<IPost>){
    const update = await this.postRepository.updateOne(id, params)
    return update
  }
  public async deletePostWithID(id: string){
    return await this.postRepository.deleteOne(id)
  }
  public async publishedPost(postId: string, params: Partial<IPost>){
    return await this.postRepository.updateOne(postId, params)
  }
}