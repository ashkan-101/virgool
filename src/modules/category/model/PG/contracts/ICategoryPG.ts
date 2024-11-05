import IBaseCategory from "../../contracts/IBaseCategory";
import Subcategory from "../Subcategory.pg";
import ISubcategoryPG from "./ISubcategoryPG";


export default interface ICategoryPG extends IBaseCategory {
  _id: string
  subcategory: ISubcategoryPG[]
}