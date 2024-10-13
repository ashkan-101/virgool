import { Request, Response, NextFunction } from "express";
import Authservice from "./authService";
import ValidationException from "../../exceptions/ValidationException";


export default class AuthController {
  private readonly service: Authservice

  constructor(){
    this.service = new Authservice()
  }

  public async register(req: Request, res: Response, next: NextFunction){
    try {
      const {mobile} = req.body
      const newCode = await this.service.register(mobile)
  
      if(!newCode){
        throw new ValidationException('this phone number is already used')
      }
      
      res.status(200).send({
        newCode: newCode
      })
    } catch (error) {
      next(error)
    }
  }

  public async finalizeRegistration(req: Request, res: Response, next: NextFunction){
    try {
      const {registerCode} = req.body
      const codeId = req.params.id
  
      const checkCode = await this.service.checkCode(codeId, registerCode)
      
      if(!checkCode){
        throw new ValidationException('this code is not valid')
      }
      
      const newUser = await this.service.newUser(checkCode.mobile)
      res.status(200).send({
        success: true,
        newUser
      })

    } catch (error) {
      next(error)
    }
  }
}