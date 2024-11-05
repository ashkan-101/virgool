import ServerException from "../../../exceptions/ServerException";
import ICategoryPG from "../model/PG/contracts/ICategoryPG";
import CategoryFactory from "./Factory";

export default class CategoryService {
  private readonly factory: CategoryFactory

  constructor(){
    this.factory = new CategoryFactory()
  }
  private async slugGenerator(title: string){
    let slug = title.replaceAll(' ', '-')+'_'+Math.random().toString(36).slice(3, 8)
    // const resultQuery = this.factory.findWithSlug(slug)
    // if(resultQuery){
    //   this.slugGenerator
    // }else {
    //   return slug
    // }
    return slug
  }

  public async createCategory(params: Partial<ICategoryPG>){
    let slug: string | undefined
    if(params.title){
      slug = await this.slugGenerator(params.title)
    }
    const newParams: Partial<ICategoryPG> = {...params, slug}
    const newCategory = await this.factory.saveNewCategory(newParams)
    if(!newCategory){
      throw new ServerException('failed to save category!')
    }
    return newCategory
  }
}