import { Schema, model } from "mongoose";
import PostStatus from "../contracts/PostStatus";
import IPostMongo from "./contracts/IPostMongo";
import { config } from "dotenv";
config()

const postSchema: Schema = new Schema({
  author: {type: Schema.Types.ObjectId, required: true},
  title: {type: String, default: null},
  body: {type: String, default: null},
  gallery: {type: [String], default: null},
  tags: {type: [String], default: null},
  status: {type: String, enum: PostStatus, default: PostStatus.DRAFT},
  likes: {type: [String], default: null},
  createdAt: {type: Date, default: Date.now()},
  updatedAt: {type: Date, default: Date.now()},
  slug: {type: String, default: null},
  subcategory: {type: Schema.Types.ObjectId, ref: 'Subcategory', required: true}
})

postSchema.virtual('galleryUrl').get(function (this: IPostMongo){
  return this.gallery.map((item: string) => {
    return `${process.env.APP_URL}:${process.env.APP_POST}/public/post-images/${item}`
  })
})

export default model<IPostMongo>('Post', postSchema)