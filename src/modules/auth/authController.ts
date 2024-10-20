import Authservice from "./authService";
import {sign} from '../../services/TokenService'
import { Request, Response, NextFunction } from "express";


export default class AuthController {
  private readonly service: Authservice

  constructor(){
    this.service = new Authservice()
  }

  public async register(req: Request, res: Response, next: NextFunction){
    try {
      const {mobile} = req.body
      const newCode = await this.service.register(mobile)
      
      res.status(201).send({
        newCode: newCode
      })
    } catch (error) {
      next(error)
    }
  }

  public async finalizeRegistration(req: Request, res: Response, next: NextFunction){
    try {
      const {code, mobile} = req.body
      const codeId = req.params.id
      await this.service.validateCode(codeId, code)
      const newUser = await this.service.newUser(mobile)
      res.status(200).send({
        success: true,
        newUser
      })

    } catch (error) {
      next(error)
    }
  }

  public async login(req: Request, res: Response, next: NextFunction){
    try {
      const {mobile} = req.body
      const newCode = await this.service.loginUser(mobile)
      res.status(200).send({
        newCode
      })
    } catch (error) {
      next(error)
    }
  }

  public async finalizeLogin(req: Request, res: Response, next: NextFunction){
    try {
      const {code, mobile} = req.body
      const codeId = req.params.id
  
      await this.service.validateCode(codeId, code)
      const user = await this.service.getUser(mobile)

      res.status(200).send({
        success: true,
        token: sign({userId: user._id})
      })
    } catch (error) {
      next(error)
    }
  }
}