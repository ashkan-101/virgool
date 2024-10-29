import { FindOptionsWhere } from 'typeorm';
import User from '../model/User.pg'
import IBaseUser from '../model/contracts/IBaseUser';
import IUserRepository from "./IUserRepository";


export default class UserPgRepository implements IUserRepository {
  public async findByMobile(mobile: string): Promise<null | IBaseUser> {
    const userQuery = await User.findOneBy({mobile: mobile})
    return userQuery
  }
  public async findOne(id: string, relations?: string[]): Promise<IBaseUser | null> {
    const userQuery = await User.findOneBy({_id: id})
    return userQuery
  }
  public async findMany(params: Partial<Omit<IBaseUser, 'folowing' | 'folowers'>>, relations?: string[]): Promise<IBaseUser[]> {
    const userQuery = await User.findBy(params)
    return userQuery
  }
  public async create(params: Partial<IBaseUser>): Promise<IBaseUser> {
    const newUser = User.create({...params})
    return newUser
  } 
  public async updateOne(id: string, params: Partial<IBaseUser>): Promise<boolean> {
    const result = await User.update({_id: id}, params)
    if(result.affected === undefined || result.affected < 1){
      return false
    }
    return true
  }

  updateMany(where: Partial<IBaseUser>, params: Partial<IBaseUser>): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  deleteOne(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  deleteMany(params: Partial<IBaseUser>): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}