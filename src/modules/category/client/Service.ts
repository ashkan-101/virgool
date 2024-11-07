import NotFoundException from "../../../exceptions/NotFoundException"
import CategoryFactory from "./Factory"

export default class CategoryServcie {
  private readonly factory

  constructor(){
    this.factory = new CategoryFactory()
  }

  public async categories(){
    return await this.factory.getAllCategories()
  }
  public async getCategory(categoryId: string){
    const result = await this.factory.getCategoryById(categoryId)
    if(!result){
      throw new NotFoundException('category Not Found')
    }
    return result
  }
  public async getSubcategory(subId: string){
    const result = await this.factory.getSubcategoryById(subId)
    if(!result){
      throw new NotFoundException('subcategory not Found!')
    }
    return result
  }
}