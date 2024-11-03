import AuthFactory from "./authFactory";
import {hash, compare} from '../../services/HashService'
import NotFoundException from "../../exceptions/NotFoundException";
import ValidationException from "../../exceptions/ValidationException";

export default class Authservice {
  private readonly factory: AuthFactory

  constructor(){
    this.factory = new AuthFactory()
  }

  private async checkPhoneNumber(mobile: string){
    const resultQuery = await this.factory.findUserWithMobile(mobile)
    if(!resultQuery){
     return false
    }
    return true
  }
  public async getUser(mobile: string){
    const user = await this.factory.findUserWithMobile(mobile)
    if(!user){
      throw new NotFoundException('not found user with this mobile number')
    }
    return user
  }

  public async register(mobile: string){
    const checkPhoneNumber = await this.checkPhoneNumber(mobile)
    if(checkPhoneNumber){
      throw new ValidationException('this phone number already used!')
    }
    const createNewCode = Math.random().toString().slice(3,9)
    const newCode = await this.factory.createCode(hash(createNewCode), mobile)
    return {
      id: newCode._id,
      code: createNewCode
    }
  }
  public async validateCode(id: string, code: string){
    const getCode = await this.factory.findCodeWithId(id)

    if(!getCode){
      throw new ValidationException('The entered code is incorrect')
    }

    if(getCode.expireAt < Date.now()){
      throw new ValidationException('The entered code has expired')
    }
    
    const checkCode = compare(code, getCode.code)

    if(!checkCode){
      throw new ValidationException('The entered code is incorrect')
    }

   await this.factory.deleteCodeInRepository(id)
    return getCode
  }
  public async newUser(mobile: string){
    return await this.factory.saveNewUser(mobile)
  }
  public async loginUser(mobile: string){
    const checkPhoneNumber = await this.checkPhoneNumber(mobile)

    if(!checkPhoneNumber){
      throw new NotFoundException('not found any user with this mobile number')
    }

    const createNewCode = Math.random().toString().slice(3,9)
    const newCode = await this.factory.createCode(hash(createNewCode), mobile)

    return {
      id: newCode._id,
      code: createNewCode
    }
  }
}