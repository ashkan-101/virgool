import { FilterQuery } from "mongoose";
import StatusCategory from "../../model/contracts/StatusCategory";
import CategoryMongo from "../../model/mongo/Category.mongo";
import ICategoryMongo from "../../model/mongo/contracts/ICategoryMongo";
import ICategoryMongoRepository from "./contracts/ICategoryMongoRepository";

export default class CategoryMongoRepository implements ICategoryMongoRepository {
  public async findByStatus(status: StatusCategory): Promise<ICategoryMongo[]> {
    return await CategoryMongo.find({status: status}).populate('subcategory').populate('posts')
  }
  public async findOne(id: string, relations?: string[]): Promise<ICategoryMongo | null> {
    return await CategoryMongo.findById({_id: id}).populate('subcategory').populate('posts')
  }
  public async findMany(params: FilterQuery<ICategoryMongo>, relations?: string[]): Promise<ICategoryMongo[]> {
    return await CategoryMongo.find(params).populate('subcategory').populate('posts')
  }
  public async create(params: Partial<ICategoryMongo>): Promise<ICategoryMongo> {
    return await CategoryMongo.create({...params})  
  }
  public async updateOne(id: string, params: Partial<ICategoryMongo>): Promise<boolean> {
    const result = await CategoryMongo.updateOne({_id: id}, params)
    return result.matchedCount > 0 && result.acknowledged
  }
  public async deleteOne(id: string): Promise<boolean> {
    const result = await CategoryMongo.deleteOne({_id: id})
    return result.deletedCount > 0 && result.acknowledged 
  }


  updateMany(where: Partial<ICategoryMongo>, params: Partial<ICategoryMongo>): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  deleteMany(params: Partial<ICategoryMongo>): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}