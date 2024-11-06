import ISubcategoryPG from "../../model/PG/contracts/ISubcategoryPG";
import ISubcategoryPGRepository from "./contracts/ISubcategoryPGRepository";
import Subcategory from "../../model/PG/Subcategory.PG";

export default class SubcategoryPGRepository implements ISubcategoryPGRepository {
  public async findOne(id: string, relations?: string[]): Promise<ISubcategoryPG | null> {
    return await Subcategory.findOne({where: {_id: id}, relations: ['posts', 'category']})
  }
  public async create(params: Partial<ISubcategoryPG>): Promise<ISubcategoryPG> {
    const newSubcategory = Subcategory.create({...params})
    newSubcategory.save()
    return newSubcategory
  }
  public async updateOne(id: string, params: Partial<ISubcategoryPG>): Promise<boolean> {
    const result = await Subcategory.update({_id: id}, params)
    if(result.affected && result.affected > 0){
      return true
    }else {
      return false
    }
  }
  public async deleteOne(id: string): Promise<boolean> {
    const result = await Subcategory.delete({_id: id})
    if(result.affected && result.affected > 0){
      return true
    }else {
      return false
    }
  }
  
  findMany(params: Partial<ISubcategoryPG>, relations?: string[]): Promise<ISubcategoryPG[]> {
    throw new Error("Method not implemented.");
  }
  updateMany(where: Partial<ISubcategoryPG>, params: Partial<ISubcategoryPG>): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  deleteMany(params: Partial<ISubcategoryPG>): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}