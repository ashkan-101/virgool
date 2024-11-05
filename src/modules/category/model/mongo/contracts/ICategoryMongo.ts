import { Document } from "mongoose";
import IBaseCategory from "../../contracts/IBaseCategory";
import ISubcategoryMongo from "./ISubcategoryMongo";


export default interface ICategoryMongo extends IBaseCategory, Document {
  subcategory: ISubcategoryMongo[]
} 