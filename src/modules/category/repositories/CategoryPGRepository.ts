import ICategoryPG from "../model/PG/contracts/ICategoryPG";
import ICategoryPGRepository from "./contracts/ICategoryPGRepository";
import Category from "../model/PG/Category.PG";

export default class CategoryPGRepository implements ICategoryPGRepository {
  findOne(id: string, relations?: string[]): Promise<ICategoryPG | null> {
    throw new Error("Method not implemented.");
  }
  findMany(params: Partial<ICategoryPG>, relations?: string[]): Promise<ICategoryPG[]> {
    throw new Error("Method not implemented.");
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
  updateMany(where: Partial<ICategoryPG>, params: Partial<ICategoryPG>): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  deleteOne(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  deleteMany(params: Partial<ICategoryPG>): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  
}