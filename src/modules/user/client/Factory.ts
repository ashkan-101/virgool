import IUser from "../model/IUser";
import IUserRepository from "../repositories/IUserRepository";
import UserMongoRepository from "../repositories/UserMongoRepository";

export default class UserFactory{
  private readonly userRepository: IUserRepository

  constructor(){
    this.userRepository = new UserMongoRepository()
  }

  public async saveUpdates(userId: string, params: Partial<IUser>){
    return await this.userRepository.updateOne(userId, params)
  }
  
  public async findByUserName(userName: string){
    const paramsQuery: Partial<IUser> = {userName: userName}
    return await this.userRepository.findMany(paramsQuery)
  }
}