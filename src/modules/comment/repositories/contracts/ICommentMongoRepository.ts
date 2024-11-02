import IRepository from "../../../contracts/IRepository";
import ICommentMongo from "../../model/contracts/ICommentMongo";

export default interface ICommentMongoRepository extends IRepository<ICommentMongo> {
  findByPostId(postId: string): Promise<ICommentMongo[]>
}