import IPost from "../model/IPost";
import IPostRepository from "../repositories/IPostRepository";
import PostMongoRepository from "../repositories/PostMongoRepository";


export default class Factory {
  private readonly postRepository: IPostRepository

  constructor(){
    this.postRepository = new PostMongoRepository()
  }

  public async saveDraftInRepository(postParams: Partial<IPost>){
    return await this.postRepository.create(postParams)
  }

  public async findPostWithId(id: string){
    return await this.postRepository.findOne(id)
  }

  public async updatePost(id: string ,params: Partial<IPost>){
    const update = await this.postRepository.updateOne(id, params)
    return update
  }

  public async deletePostWithID(id: string){
    return await this.postRepository.deleteOne(id)
  }

  public async findPostsWithStatus(userId: string, status: string){
    const queryParams = {author: userId, status: status}
   return await this.postRepository.findMany(queryParams)
  }
}