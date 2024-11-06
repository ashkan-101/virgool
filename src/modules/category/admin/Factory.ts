import DatabaseName from "../../contracts/DatabaseName";
import IBaseCategory from "../model/contracts/IBaseCategory";
import IBaseSubcategory from "../model/contracts/IBaseSubcategory";
import StatusCategory from "../model/contracts/StatusCategory";
import CategoryRepositoryFactory from "../repositories/CategoryRepositoryFactory";
import SubcategoryRepositoryFactory from "../repositories/SubcategoryRepositoryFactory";
import ICategoryMongoRepository from "../repositories/category/contracts/ICategoryMongoRepository";
import ICategoryPGRepository from "../repositories/category/contracts/ICategoryPGRepository";
import ISubcategoryMongoRepository from "../repositories/subcategory/contracts/ISubcategoryMongoRepository";
import ISubcategoryPGRepository from "../repositories/subcategory/contracts/ISubcategoryPGRepository";

export default class CategoryFactory {
  private readonly categoryrepository: ICategoryPGRepository | ICategoryMongoRepository
  private readonly subcategoryRepository: ISubcategoryMongoRepository | ISubcategoryPGRepository
  constructor(){
    this.categoryrepository = new CategoryRepositoryFactory().getRepository(process.env.APP_DATABASE as DatabaseName)
    this.subcategoryRepository = new SubcategoryRepositoryFactory().getRepository(process.env.APP_DATABASE as DatabaseName)
  }

  public async saveNewCategory(params: Partial<IBaseCategory>){
    return await this.categoryrepository.create(params)
  }
  public async saveNewSubcategory(params: any){
    return await this.subcategoryRepository.create(params)
  }
  public async getCategoriesByStatus(status: StatusCategory){
    return await this.categoryrepository.findByStatus(status)
  }
  public async getCategoryById(categoryId: string){
    return await this.categoryrepository.findOne(categoryId)
  }
  public async getSubcategoryById(subId: string){
    return await this.subcategoryRepository.findOne(subId)
  }
  public async saveEditCategory(params: Partial<IBaseCategory>, categoryId: string){
    return await this.categoryrepository.updateOne(categoryId, params)
  }
  public async deleteCategory(categoryId: string){
    return await this.categoryrepository.deleteOne(categoryId)
  }
  public async saveEditSubcategory(subId: string, params: Partial<IBaseSubcategory>){
    return await this.subcategoryRepository.updateOne(subId, params)
  }
  public async deleteSubcategory(subId: string){
    return await this.subcategoryRepository.deleteOne(subId)
  }
}