import IRepository from "../../../contracts/IRepository";
import ICommentPG from "../../model/contracts/ICommentPG";

export default interface ICommentPGRepository extends IRepository<ICommentPG>{
  findByPostId(postId: string): Promise<ICommentPG[]>
}