import ISubcategoryMongo from "../../model/mongo/contracts/ISubcategoryMongo";
import SubcategoryMongo from "../../model/mongo/Subcategory.mongo";
import ISubcategoryMongoRepository from "./contracts/ISubcategoryMongoRepository";

export default class SubcategoryMongoRepository implements ISubcategoryMongoRepository {
  public async findOne(id: string, relations?: string[]): Promise<ISubcategoryMongo | null> {
    return await SubcategoryMongo.findById(id)
  }
  public async create(params: Partial<ISubcategoryMongo>): Promise<ISubcategoryMongo> {
    return await SubcategoryMongo.create({...params})
  }
  public async updateOne(id: string, params: Partial<ISubcategoryMongo>): Promise<boolean> {
    const result = await SubcategoryMongo.updateOne({_id: id}, params)
    return result.matchedCount > 0 && result.acknowledged
   }
  public async deleteOne(id: string): Promise<boolean> {
    const result = await SubcategoryMongo.deleteOne({_id: id})
    return result.deletedCount > 0 && result.acknowledged
  }

  findMany(params: Partial<ISubcategoryMongo>, relations?: string[]): Promise<ISubcategoryMongo[]> {
    throw new Error("Method not implemented.");
  }
  updateMany(where: Partial<ISubcategoryMongo>, params: Partial<ISubcategoryMongo>): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  deleteMany(params: Partial<ISubcategoryMongo>): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}