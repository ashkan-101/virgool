import DatabaseName from "../../contracts/DatabaseName";
import IUser from "../model/contracts/IBaseUser";
import IUserRepository from "../repositories/IUserRepository";
import UserRepositoryFactory from "../repositories/UserRepositoryFactory";
import { config } from "dotenv";
config()

export default class UserFactory{
  private readonly userRepository: IUserRepository

  constructor(){
    this.userRepository = new UserRepositoryFactory().getRepository(process.env.APP_DATABSE as DatabaseName)
  }

  public async saveUpdates(userId: string, params: Partial<IUser>){
    return await this.userRepository.updateOne(userId, params)
  }
  
  public async findByUserName(userName: string){
    const paramsQuery: Partial<IUser> = {userName: userName}
    return await this.userRepository.findMany(paramsQuery)
  }

  public async findByMobile(mobile: string){
    return await this.userRepository.findByMobile(mobile)
  }
}