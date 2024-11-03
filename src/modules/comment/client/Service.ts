import NotFoundException from "../../../exceptions/NotFoundException"
import ServerException from "../../../exceptions/ServerException"
import ValidationException from "../../../exceptions/ValidationException"
import DatabaseName from "../../contracts/DatabaseName"
import User from "../../user/model/User.pg"
import IBaseComment from "../model/contracts/IBaseComment"
import ICommentMongo from "../model/contracts/ICommentMongo"
import ICommentPG from "../model/contracts/ICommentPG"
import CommentFactory from "./Factory"


export default class CommentService {
  private readonly factory: CommentFactory

  constructor(){
    this.factory = new CommentFactory()
  }
  private async validateUser(userId: string, commentId: string){
    const comment = await this.factory.getComment(commentId)
    if(!comment){
      throw new NotFoundException('comment not found!')
    }
    if(process.env.APP_DATABASE === DatabaseName.MONGODB && comment.user.toString() !== userId.toString()){
      throw new ValidationException('the current user is not valid')
    }else if(process.env.APP_DATABASE === DatabaseName.POSTGRES && (comment.user as User)._id !== userId){
      throw new ValidationException('the current user is not valid')
    }
  }

  public async newComment(params: Partial<ICommentMongo | ICommentPG>){
    return await this.factory.saveNewComment(params)
  }
  public async getComments(postId: string){
    return await this.factory.getCommentsByPostId(postId)
  }
  public async edit(commentId: string, userId: string, params: Partial<IBaseComment>){
    await this.validateUser(userId, commentId)
    const resultUpdate = await this.factory.editComment(commentId, params)
    if(!resultUpdate){
      throw new ServerException('failed to edited comment')
    }
  }
  public async delete(commentId: string, userId: string){
    await this.validateUser(userId, commentId)
    const deleteResult = await this.factory.deleteComment(commentId)
    if(!deleteResult){
      throw new ServerException('failed to delete comment')
    }
  }
}