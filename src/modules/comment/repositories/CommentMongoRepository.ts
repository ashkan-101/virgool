import ICommentMongoRepository from "./contracts/ICommentMongoRepository";
import ICommentMongo from "../model/contracts/ICommentMongo";
import CommentModel from "../model/Comment.mongo";

export default class CommentMongoRepository implements ICommentMongoRepository{
  public async findOne(id: string, relations?: string[]): Promise<ICommentMongo | null> {
    return await CommentModel.findOne({_id: id}).populate('user')
  }
  public async findByPostId(postId: string): Promise<ICommentMongo[]> {
    return await CommentModel.find({post: postId}).populate('user')
  }
  public async create(params: Partial<ICommentMongo>): Promise<ICommentMongo> {
    return await CommentModel.create({...params})
  }
  public async updateOne(id: string, params: Partial<ICommentMongo>): Promise<boolean> {
    const result = await CommentModel.updateOne({_id: id}, {...params})
    return result.acknowledged && result.modifiedCount > 0
  }
  public async deleteOne(id: string): Promise<boolean> {
    const result = await CommentModel.deleteOne({_id: id})
    return result.acknowledged && result.deletedCount > 0
  }

  public async findMany(params: Partial<ICommentMongo>, relations?: string[]): Promise<ICommentMongo[]> {
    throw new Error("Method not implemented.");
  }
  updateMany(where: Partial<ICommentMongo>, params: Partial<ICommentMongo>): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  deleteMany(params: Partial<ICommentMongo>): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}