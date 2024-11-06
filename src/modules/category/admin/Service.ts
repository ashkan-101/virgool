import NotFoundException from "../../../exceptions/NotFoundException";
import ServerException from "../../../exceptions/ServerException";
import IBaseCategory from "../model/contracts/IBaseCategory";
import StatusCategory from "../model/contracts/StatusCategory";
import ICategoryPG from "../model/PG/contracts/ICategoryPG";
import CategoryFactory from "./Factory";

export default class CategoryService {
  private readonly factory: CategoryFactory

  constructor(){
    this.factory = new CategoryFactory()
  }

  public async createCategory(title: string){
    const newCategory = await this.factory.saveNewCategory({title})
    if(!newCategory){
      throw new ServerException('failed to save category!')
    }
    return newCategory
  }
  public async createSubcategory(title: string, categoryId: string){
    const params = {title, category: categoryId}
    const newSubcategory = await this.factory.saveNewSubcategory(params)
    if(!newSubcategory){
      throw new ServerException('failed to save subcategory!')
    }
    return newSubcategory
  }
  public async categories(statusCategory: StatusCategory){
    const queryResult = await this.factory.getCategoriesByStatus(statusCategory)
    if(!queryResult){
      throw new ServerException('failed to get categories in database!')
    }
    return queryResult
  }
  public async getCategory(categoryId: string){
    const resultQuery = await this.factory.getCategoryById(categoryId)
    if(!resultQuery){
      throw new NotFoundException('category Not Found!')
    }
    return resultQuery
  }
  public async getSubcategory(subId: string){
    const resultQuery = await this.factory.getSubcategoryById(subId)
    if(!resultQuery){
      throw new NotFoundException('not found any Subcategory')
    }
    return resultQuery
  }
  public async editCategory(params: Partial<IBaseCategory>, categoryId: string){
    const result = await this.factory.saveEditCategory(params, categoryId)
    if(!result){
      throw new ServerException('failed to edit category informations!')
    }
  }
  public async deleteCategory(categoryId: string){
    const result = await this.factory.deleteCategory(categoryId)
    if(!result){
      throw new ServerException('failed to delete category')
    }
  }
  public async editSubcategory(subId: string, title: string){
    const result = await this.factory.saveEditSubcategory(subId, {title})
    if(!result){
      throw new ServerException('failed to edited subcategory!')
    }
  }
  public async deleteSubcategory(subId: string){
    const result = await this.factory.deleteSubcategory(subId)
    if(!result){
      throw new ServerException('failed to delete subcategory!')
    }
  }
}