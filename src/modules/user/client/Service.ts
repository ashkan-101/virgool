import IUser from "../model/IUser";
import UserFactory from "./Factory";
import { deleteFile } from "../../../services/DeleteFileService";
import { join } from "path";

export default class UserService {
  private readonly factory: UserFactory

  constructor(){
    this.factory = new UserFactory()
  }

  public async updateUser(userId: string, params: Partial<IUser>, avatar?: string, lastAvatar?: string){
    const newParams: Partial<IUser> = {...params, avatar}
    if(lastAvatar){
      deleteFile(join(process.cwd(), 'public', 'avatars', lastAvatar))
    }
    const result = await this.factory.saveUpdates(userId, newParams)
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