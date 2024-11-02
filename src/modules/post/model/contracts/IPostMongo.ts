import IBasePost from "./IBasePost";
import { Document } from "mongoose";

export default interface IPostMongo extends Document, IBasePost{
  author: string
}