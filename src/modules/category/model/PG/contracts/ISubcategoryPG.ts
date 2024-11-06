import Post from "../../../../post/model/Post.pg"
import IBaseSubcategory from "../../contracts/IBaseSubcategory"
import Category from "../Category.PG"

export default interface ISubcategoryPG extends IBaseSubcategory{
  _id: string
  category: Category
  posts: Post[]
}