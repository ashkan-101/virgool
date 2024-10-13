import IPostRepository from "../repositories/IPostRepository";
import PostMongoRepository from "../repositories/PostMongoRepository";


export default class Factory {
  private readonly postRepository: IPostRepository

  constructor(){
    this.postRepository = new PostMongoRepository()
  }

  public savePostInRepository(){
    this.postRepository.create({})
  }
}