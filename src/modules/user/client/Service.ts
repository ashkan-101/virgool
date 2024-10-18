import IUser from "../model/IUser";
import UserFactory from "./Factory";

export default class UserService {
  private readonly factory: UserFactory

  constructor(){
    this.factory = new UserFactory()
  }

  public async updateUser(userId: string, params: Partial<IUser>){
    const result = await this.factory.saveUpdates(userId, params)

    if(!result){
      return false
    }
    return true
  }

  public async checkUserName(userName: string){
    const userNames = await this.factory.findByUserName(userName)
    if(userNames.length > 0){
      return false
    }
    return true
  }
}