import { Schema, model } from "mongoose";
import ICommentMongo from "./contracts/ICommentMongo";
import CommentStatus from "./contracts/CommentStatus";

const commentSchema: Schema = new Schema({
  user: {type: Schema.Types.ObjectId, required: true},
  post: {type: Schema.Types.ObjectId, required: true},
  title: {type: String, required: true},
  body: {type: String, required: true},
  createdAt: {type: Date, default: Date.now()},
  updatedAt: {type: Date, default: Date.now()},
  status: {type: String, enum: CommentStatus, default: CommentStatus.PENDING}
})

export default model<ICommentMongo>('Comment', commentSchema)