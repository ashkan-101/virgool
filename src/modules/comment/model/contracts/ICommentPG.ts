import Post from "../../../post/model/Post.pg";
import User from "../../../user/model/User.pg";
import IBaseComment from "./IBaseComment";


export default interface ICommentPG extends IBaseComment{
  _id: string
  user: User
  post: Post
}