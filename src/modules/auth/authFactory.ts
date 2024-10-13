import IRepository from "../contracts/IRepository";
import IRegisterCode from "../registerCode/model/IRegisterCode";
import IUserRepository from "../user/repositories/IUserRepository";
import UserMongoRepository from "../user/repositories/UserMongoRepository";
import RegisterCodeMongoRepository from '../registerCode/repositories/RegisterCodeMongoRepository'

export default class AuthFactory {
  private readonly userRepository: IUserRepository
  private readonly codeRepository: IRepository<IRegisterCode>

  constructor(){
    this.userRepository = new UserMongoRepository()
    this.codeRepository = new RegisterCodeMongoRepository()
  }

  public async checkPhoneNumber(mobile: string){
    return await this.userRepository.findByMobile(mobile)
  }

  public async createCode(code: string, mobile: string){
    return await this.codeRepository.create({
      code,
      mobile
    })
  }

  public async getCode(id: string){
    const code = await this.codeRepository.findOne(id)
    return code
  }

  public async saveNewUser(mobile: string){
    return await this.userRepository.create({mobile})
  }

  public async findUser(mobile: string){
    const user = await this.userRepository.findByMobile(mobile)
    return user
  }
}