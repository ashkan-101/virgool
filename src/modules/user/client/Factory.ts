import IBaseUser from "../model/contracts/IBaseUser";
import DatabaseName from "../../contracts/DatabaseName";
import UserRepositoryFactory from "../repositories/UserRepositoryFactory";
import IUserPGRepository from "../repositories/contracts/IUserPGRepository";
import IUserMongoRepository from "../repositories/contracts/IUserMongoRepository";
import { config } from "dotenv";
config()

export default class UserFactory{
  private readonly userRepository: IUserMongoRepository | IUserPGRepository

  constructor(){
    this.userRepository = new UserRepositoryFactory().getRepository(process.env.APP_DATABSE as DatabaseName)
  }

  public async saveUpdates(userId: string, params: Partial<IBaseUser>){
    return await this.userRepository.updateOne(userId, params)
  }
  public async findByUserName(userName: string){
    return await this.userRepository.findByUserName(userName)
  }
  public async findByMobile(mobile: string){
    return await this.userRepository.findByMobile(mobile)
  }
}