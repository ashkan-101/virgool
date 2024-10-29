import IUser from "../model/contracts/IUserMongo";
import UserFactory from "./Factory";
import { deleteFile } from "../../../services/DeleteFileService";
import { join } from "path";
import ServerException from "../../../exceptions/ServerException";
import ValidationException from "../../../exceptions/ValidationException";

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
      throw new ServerException('failed to update settings')
    }
  }

  public async validateUserName(userName: string){
    const userNames = await this.factory.findByUserName(userName)
    if(userNames.length > 0){
      throw new ValidationException('this userName already used!')
    }
  }

  public async validateMobile(mobile: string){
    const result = await this.factory.findByMobile(mobile)
    if(result){
      throw new ValidationException('this phone number already used!')
    }
  }
}