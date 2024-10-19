import { Schema, model } from "mongoose";
import IComment from "./IComment";

const commentSchema: Schema = new Schema({
  user: {type: Schema.Types.ObjectId, required: true},
  post: {type: Schema.Types.ObjectId, required: true},
  body: {type: String, required: true},
  likes: {type: Number, default: 0},
  replays: {type: [Object], default: null}
})

export default model<IComment>('Comment', commentSchema)