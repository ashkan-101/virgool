import DatabaseName from "../../contracts/DatabaseName"
import CommentRepositoryFactory from "../repositories/CommentRepositoryFactory"
import { config } from "dotenv"
import ICommentMongoRepository from "../repositories/contracts/ICommentMongoRepository"
import ICommentPGRepository from "../repositories/contracts/ICommentPGRepository"
import IBaseComment from "../model/contracts/IBaseComment"
config()


export default class CommentFactory {
  private readonly commentRepository: ICommentMongoRepository | ICommentPGRepository

  constructor(){
    this.commentRepository = new CommentRepositoryFactory().getRepository(process.env.APP_DATABASE as DatabaseName)
  }

  public async getComment(commentId: string){
    return await this.commentRepository.findOne(commentId)
  }
  
  public async saveNewComment(params: Partial<IBaseComment>){
    return await this.commentRepository.create(params)
  }
  public async getCommentsByPostId(postId: string){
    return await this.commentRepository.findByPostId(postId)
  }
  public async editComment(commentId: string, params: Partial<IBaseComment>){
    return await this.commentRepository.updateOne(commentId, params)
  }
  public async deleteComment(commentId: string){
    return await this.commentRepository.deleteOne(commentId)
  }
}