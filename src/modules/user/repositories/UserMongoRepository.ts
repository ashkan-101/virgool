import IUserRepository from "./IUserRepository";
import userModel from '../model/User'
import IUser from "../model/IUser";

export default class UserMongoRepository implements IUserRepository{
  public async findOne(id: string, relations?: string[]): Promise<IUser | null> {
    try {
      const userQuery = await userModel.findById(id)
      if(!userQuery){return null}
      return userQuery
      
    } catch (error: any) {
      console.log(error.message);
      return null
    }
  }

  public async findMany(params: any, relations: string[]): Promise<IUser[]> {
    const userQuery = await userModel.find(params)
    return userQuery
  }

  public async findByMobile(mobile: string): Promise<boolean> {
    const userQuery = await userModel.findOne({mobile: mobile})
    if(!userQuery){
      return false
    }
    return true
  }

  public async create(params: Partial<IUser>): Promise<IUser> {
    const newUser = await userModel.create({...params})

    return newUser.save()
  }
  public async updateOne(id: string, params: Partial<IUser>): Promise<boolean> {
    const updateUser = await userModel.updateOne({_id: id}, params)
    return updateUser.modifiedCount > 0
  }
  updateMany(where: Partial<IUser>, params: Partial<IUser>): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  deleteOne(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  deleteMany(params: Partial<IUser>): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  
}