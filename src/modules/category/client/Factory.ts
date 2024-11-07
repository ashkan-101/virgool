import DatabaseName from "../../contracts/DatabaseName";
import CategoryRepositoryFactory from "../repositories/CategoryRepositoryFactory";
import SubcategoryRepositoryFactory from "../repositories/SubcategoryRepositoryFactory";
import ISubcategoryPGRepository from "../repositories/subcategory/contracts/ISubcategoryPGRepository";
import ISubcategoryMongoRepository from "../repositories/subcategory/contracts/ISubcategoryMongoRepository";
import ICategoryPGRepository from "../repositories/category/contracts/ICategoryPGRepository";
import ICategoryMongoRepository from "../repositories/category/contracts/ICategoryMongoRepository";
import StatusCategory from "../model/contracts/StatusCategory";

export default class CategoryFactory {
  private readonly categoryRepository: ICategoryMongoRepository | ICategoryPGRepository
  private readonly subcategoryRepository: ISubcategoryMongoRepository | ISubcategoryPGRepository

  constructor(){
    this.categoryRepository = new CategoryRepositoryFactory().getRepository(process.env.APP_DATABASE as DatabaseName)
    this.subcategoryRepository = new SubcategoryRepositoryFactory().getRepository(process.env.APP_DATABASE as DatabaseName)
  }

  public async getAllCategories(){
    return await this.categoryRepository.findByStatus(StatusCategory.ACTIVE)
  }
  public async getCategoryById(categoryId: string){
    return await this.categoryRepository.findOne(categoryId)
  }
  public async getSubcategoryById(subId: string){
    return await this.subcategoryRepository.findOne(subId)
  }
}