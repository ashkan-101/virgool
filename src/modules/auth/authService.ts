import AuthFactory from "./authFactory";
import {hash, compare} from '../../services/HashService'

export default class Authservice {
  private readonly factory: AuthFactory

  constructor(){
    this.factory = new AuthFactory()
  }

  public async register(mobile: string){
    const checkPhoneNumber = await this.factory.checkPhoneNumber(mobile)
    if(checkPhoneNumber){
      return false
    }
    const createNewCode = Math.random().toString().slice(3,9)
    const newCode = await this.factory.createCode(hash(createNewCode), mobile)
    return {
      id: newCode._id,
      code: createNewCode
    }
  }

  public async checkCode(id: string, code: string){
    const getCode = await this.factory.getCode(id)
    
    if(!getCode){
      return false
    }

    if(getCode.expireCode < Date.now()){
      return false
    }

    const checkCode = compare(code, getCode.code)

    if(!checkCode){
      return false
    }
    return getCode
  }

  public async newUser(mobile: string){
    return await this.factory.saveNewUser(mobile)
  }

  public async loginUser(mobile: string){
    const checkPhoneNumber =  await this.factory.checkPhoneNumber(mobile)

    if(!checkPhoneNumber){
      return false
    }

    const createNewCode = Math.random().toString().slice(3,9)
    const newCode = await this.factory.createCode(hash(createNewCode), mobile)

    return {
      id: newCode._id,
      code: createNewCode
    }
  }

  public async getUser(mobile: string){
    const user = await this.factory.findUser(mobile)

    if(!user){
      return false
    }
    return user
  }
}