import { Schema, model } from "mongoose";
import ISubcategoryMongo from "./contracts/ISubcategoryMongo";

const subcategorySchema: Schema = new Schema({
  title: {type: String, required: true},
  category: {type: Schema.Types.ObjectId, ref: 'Category', required: true},
  posts: {type: [Schema.Types.ObjectId], ref: 'Post', default: []},
  createdAt: {type: Date, default: Date.now()},
  updatedAt: {type: Date, default: Date.now()}
})

export default model<ISubcategoryMongo>('Subcategory', subcategorySchema)