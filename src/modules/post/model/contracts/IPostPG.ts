import User from "../../../user/model/User.pg";
import IBasePost from "./IBasePost";

export default interface IPostPG extends IBasePost{
  _id: string
  author: User
}