import IBaseCategory from "../../contracts/IBaseCategory";
import ISubcategoryPG from "./ISubcategoryPG";


export default interface ICategoryPG extends IBaseCategory {
  _id: string
  subcategory: ISubcategoryPG[]
}