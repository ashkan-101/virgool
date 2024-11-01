import DatabaseName from "../contracts/DatabaseName";
import UserRepositoryFactory from "../user/repositories/UserRepositoryFactory";
import IUserPGRepository from "../user/repositories/contracts/IUserPGRepository";
import IUserMongoRepository from "../user/repositories/contracts/IUserMongoRepository";
import RegisterCodeRepositoryFactory from "../registerCode/repositories/RegisterCodeRepositoryFactory";
import IRegisterCodePGRepository from "../registerCode/repositories/contracts/IRegisterCodePGRepository";
import IRegisterCodeMongoRepository from "../registerCode/repositories/contracts/IRegisterCodeMongoRepository";

export default class AuthFactory {
  private readonly userRepository: IUserMongoRepository | IUserPGRepository
  private readonly codeRepository: IRegisterCodeMongoRepository | IRegisterCodePGRepository

  constructor(){
    this.userRepository = new UserRepositoryFactory().getRepository(process.env.APP_DATABASE as DatabaseName)
    this.codeRepository = new RegisterCodeRepositoryFactory().getRepository(process.env.APP_DATABASE as DatabaseName)
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