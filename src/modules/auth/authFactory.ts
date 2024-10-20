import IUserRepository from "../user/repositories/IUserRepository";
import UserMongoRepository from "../user/repositories/UserMongoRepository";
import IRegisterCodeRepository from "../registerCode/repositories/IRegisterCodeRepository";
import RegisterCodeMongoRepository from '../registerCode/repositories/RegisterCodeMongoRepository'

export default class AuthFactory {
  private readonly userRepository: IUserRepository
  private readonly codeRepository: IRegisterCodeRepository

  constructor(){
    this.userRepository = new UserMongoRepository()
    this.codeRepository = new RegisterCodeMongoRepository()
  }

  public async createCode(code: string, mobile: string){
    return await this.codeRepository.create({
      code,
      mobile
    })
  }

  public async findCodeWithId(id: string){
    const result =  await this.codeRepository.findOne(id)
    return result
  }

  public async deleteCodeInRepository(id: string){
    return await this.codeRepository.deleteOne(id)
  }

  public async saveNewUser(mobile: string){
    return await this.userRepository.create({mobile})
  }

  public async findUserWithMobile(mobile: string){
  return await this.userRepository.findByMobile(mobile)
  }
}