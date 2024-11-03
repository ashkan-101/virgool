import { Document } from "mongoose";
import IBaseComment from "./IBaseComment";


export default interface ICommentMongo extends Document, IBaseComment {
  user: string
  post: string
}