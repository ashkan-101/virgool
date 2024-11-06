import { Document } from "mongoose"
import IBaseSubcategory from "../../contracts/IBaseSubcategory"

export default interface ISubcategoryMongo extends Document, IBaseSubcategory{
  category: string
  posts: string[]
}