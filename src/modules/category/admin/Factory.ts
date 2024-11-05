import ICategoryPG from "../model/PG/contracts/ICategoryPG";
import CategoryPGRepository from "../repositories/CategoryPGRepository";
import ICategoryPGRepository from "../repositories/contracts/ICategoryPGRepository";

export default class CategoryFactory {
  private readonly repository: ICategoryPGRepository

  constructor(){
    this.repository = new CategoryPGRepository()
  }

  public async saveNewCategory(params: Partial<ICategoryPG>){
    return await this.repository.create(params)
  }

  public async findWithSlug(slug: string){

  }
}