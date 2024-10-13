import { Document } from "mongoose";
import PostStatus from "../contracts/PostStatus";

export default interface IPost extends Document{
  author: string
  title: string
  body: string
  gallery: string[]
  tags: string[]
  status: PostStatus
  likes: number
  createdAt: Date
  updatedAt: Date
}