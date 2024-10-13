import { Schema, model } from "mongoose";
import PostStatus from "../contracts/PostStatus";
import IPost from "./IPost";
import { config } from "dotenv";
config()

const postSchema: Schema = new Schema({
  author: {type: Schema.Types.ObjectId, required: true},
  title: {type: String, default: null},
  body: {type: String, default: null},
  gallery: {type: [String], default: null},
  tags: {type: [String], default: null},
  status: {type: String, enum: PostStatus, default: PostStatus.DRAFT},
  likes: {type: Number, default: 0},
  createdAt: {type: Date, default: Date.now()},
  updatedAt: {type: Date, default: Date.now()}
})

postSchema.virtual('galleryUrl').get(function (this: IPost){
  return this.gallery.map((item: string) => {
    return `${process.env.APP_URL}:${process.env.APP_POST}/public/post-images/${item}`
  })
})

export default model<IPost>('Post', postSchema)