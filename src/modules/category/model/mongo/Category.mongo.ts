import { Schema, model } from "mongoose";
import ICategoryMongo from "./contracts/ICategoryMongo";
import StatusCategory from "../contracts/StatusCategory";

const categorySchema: Schema = new Schema({
  title: {type: String, required: true},
  slug: {type: String, required: true},
  status: {type: String, enum: StatusCategory, default: StatusCategory.ACTIVE},
  createdAt: {type: Date, default: Date.now()},
  updatedAt: {type: Date, default: Date.now()},
  subcategory: {type: [{title: String, posts: [Schema.Types.ObjectId]}], ref: 'Post', default: null}
})

export default model<ICategoryMongo>('Category', categorySchema)