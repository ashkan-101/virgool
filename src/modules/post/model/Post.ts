import { Schema, model } from "mongoose";
import PostStatus from "../contracts/PostStatus";
import IPost from "./IPost";

const postSchema: Schema = new Schema({
  author: {type: Schema.Types.ObjectId, required: true},
  title: {type: String},
  body: {type: String},
  pictures: {type: [String]},
  tags: {type: [String], required: true},
  status: {type: String, enum: PostStatus, default: PostStatus.DRAFT},
  likes: {type: Number, default: 0},
  createdAt: {type: Date, default: Date.now()},
  updatedAt: {type: Date, default: Date.now()}
})

export default model<IPost>('Post', postSchema)