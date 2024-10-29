import IUserRepository from "./IUserRepository";
import userModel from '../model/User.mongo'
import IUserMongo from "../model/contracts/IUserMongo";
import { FilterQuery } from "mongoose";

export default class UserMongoRepository implements IUserRepository{
  public async findOne(id: string, relations?: string[]): Promise<IUserMongo | null> {
      const userQuery = await userModel.findById(id)
      return userQuery
  }
  public async findMany(params: FilterQuery<IUserMongo>, relations: string[]): Promise<IUserMongo[]> {
    const userQuery = await userModel.find(params)
    return userQuery
  }
  public async findByMobile(mobile: string): Promise<null | IUserMongo>{
    const userQuery = await userModel.findOne({mobile: mobile})
    return userQuery
  }
  public async create(params: Partial<IUserMongo>): Promise<IUserMongo> {
    const newUser = await userModel.create({...params})
    return newUser.save()
  }
  public async updateOne(id: string, params: Partial<IUserMongo>): Promise<boolean> {
    const updateUser = await userModel.updateOne({_id: id}, params)
    return updateUser.matchedCount > 0 && updateUser.acknowledged
  }

  updateMany(where: Partial<IUserMongo>, params: Partial<IUserMongo>): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  deleteOne(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  deleteMany(params: Partial<IUserMongo>): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

}