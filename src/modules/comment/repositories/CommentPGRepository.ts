import ICommentPG from "../model/contracts/ICommentPG";
import ICommentPGRepository from "./contracts/ICommentPGRepository";
import Comment from "../model/Comment.pg";

export default class CommentPGRepository implements ICommentPGRepository {
  public async findOne(id: string, relations?: string[]): Promise<ICommentPG | null> {
    return await Comment.findOne({where: {_id: id}, relations: ['user']})
  }
  public async findByPostId(postId: string): Promise<ICommentPG[]> {
    return await Comment.find({where: {post: {_id: postId}}, relations: ['user', 'post']})
  }
  public async create(params: Partial<ICommentPG>): Promise<ICommentPG> {
    const result = Comment.create({...params})
    await result.save()
    return result
  }
  public async updateOne(id: string, params: Partial<ICommentPG>): Promise<boolean> {
    const result = await Comment.update({_id: id}, {...params})
    if(result.affected && result.affected > 0){
      return true
    }else{
      return false
    }
  }
  public async deleteOne(id: string): Promise<boolean> {
    const result = await Comment.delete({_id: id})
    if(result.affected && result.affected > 0){
      return true
    }else {
      return false
    }
  }


  findMany(params: Partial<ICommentPG>, relations?: string[]): Promise<ICommentPG[]> {
    throw new Error("Method not implemented.");
  }
  updateMany(where: Partial<ICommentPG>, params: Partial<ICommentPG>): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  deleteMany(params: Partial<ICommentPG>): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}