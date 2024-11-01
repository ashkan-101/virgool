import { FindOptionsWhere } from 'typeorm';
import User from '../model/User.pg'
import IUserPG from '../model/contracts/IUserPG';
import IUserPGRepository from './contracts/IUserPGRepository';


export default class UserPgRepository implements IUserPGRepository {
  public async findByMobile(mobile: string): Promise<null | IUserPG> {
    const userQuery = await User.findOneBy({mobile: mobile})
    return userQuery
  }
  public async findOne(id: string, relations?: string[]): Promise<IUserPG | null> {
    const userQuery = await User.findOneBy({_id: id})
    return userQuery
  }
  public async findMany(params: FindOptionsWhere<User>, relations?: string[]): Promise<IUserPG[]> {
    const userQuery = await User.findBy({...params})
    return userQuery
  }
  public async create(params: Partial<IUserPG>): Promise<IUserPG> {
    const newUser = User.create({...params})
    await newUser.save()
    return newUser
  } 
  public async updateOne(id: string, params: Partial<IUserPG>): Promise<boolean> {
    const result = await User.update({_id: id}, params)
    if(result.affected === undefined || result.affected < 1){
      return false
    }
    return true
  }

  updateMany(where: Partial<IUserPG>, params: Partial<IUserPG>): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  deleteOne(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  deleteMany(params: Partial<IUserPG>): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}