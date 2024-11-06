import ICategoryPG from "../../model/PG/contracts/ICategoryPG";
import ICategoryPGRepository from "./contracts/ICategoryPGRepository";
import Category from "../../model/PG/Category.PG";
import StatusCategory from "../../model/contracts/StatusCategory";

export default class CategoryPGRepository implements ICategoryPGRepository {
  public async findOne(id: string, relations?: string[]): Promise<ICategoryPG | null> {
    return Category.findOne({where: {_id: id}, relations: ['subcategory']})
  }
  public async findByStatus(status: StatusCategory): Promise<ICategoryPG[]> {
    return await Category.find({where: {status: status}, relations: ['subcategory', 'subcategory.posts']})
  }
  public async findMany(params: Partial<ICategoryPG>, relations?: string[]): Promise<ICategoryPG[]> {
    return Category.find({relations: ['subcategory']})
  }
  public async create(params: Partial<ICategoryPG>): Promise<ICategoryPG> {
    const newCategory = Category.create({...params})
    await newCategory.save()
    return newCategory
  }
  public async updateOne(id: string, params: Partial<ICategoryPG>): Promise<boolean> {
    const result = await Category.update({_id: id}, params)
    if(result.affected && result.affected > 0){
      return true
    }else{
      return false
    }
  }
  public async deleteOne(id: string): Promise<boolean> {
    const result = await Category.delete({_id: id})
    if(result.affected && result.affected > 0){
      return true
    }else{
      return false
    }
  }


  deleteMany(params: Partial<ICategoryPG>): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  updateMany(where: Partial<ICategoryPG>, params: Partial<ICategoryPG>): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}