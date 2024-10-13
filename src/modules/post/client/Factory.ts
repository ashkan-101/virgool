import IPost from "../model/IPost";
import IPostRepository from "../repositories/IPostRepository";
import PostMongoRepository from "../repositories/PostMongoRepository";


export default class Factory {
  private readonly postRepository: IPostRepository

  constructor(){
    this.postRepository = new PostMongoRepository()
  }

  public async savePostInRepository(postParams: Partial<IPost>){
    return await this.postRepository.create(postParams)
  }
}