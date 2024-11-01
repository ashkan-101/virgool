import { Request, Response, NextFunction } from "express";
import UserService from "./Service";
import Gender from "../contracts/Gender";
import IUser from "../model/contracts/IBaseUser";

export default class UserController {
  private readonly service: UserService

  constructor(){
    this.service = new UserService()
  }

  public async getSetting(req: Request, res: Response, next: NextFunction){
    try {
      const user = req.user
      const userSettings: Partial<IUser> = {
        firstName: user?.firstName,
        lastName: user?.lastName,
        bio: user?.bio,
        avatar: user?.avatar,
        gender: user?.gender,
        birthday: user?.birthday,
      }
      res.status(200).send(userSettings)
    } catch (error) {
      next(error)
    }
  }
  public async newSettings (req: Request, res: Response, next: NextFunction){
    try {
      const {firstName, lastName, bio, birthday} = req.body
      const avatar = req.files as {[fieldname: string]: Express.Multer.File[]}
      const gender: Gender = req.body.gender
      const userId = req.user?._id as string
  
      let avatarName: string | undefined
      if(req.files && avatar.avatar){
        avatar.avatar.forEach((file) => {
         avatarName = file.filename
       })
      }

      const newSettingsParams: Partial<IUser> = {
        firstName,
        lastName,
        bio,
        birthday,
        gender,
      }

      let lastAvatar: string | undefined
      if(avatarName){
        lastAvatar = req.user?.avatar
      }
      
      await this.service.updateUser(userId, newSettingsParams, avatarName, lastAvatar)
  
      res.status(200).send({
        success: true
      })
    } catch (error) {
      next(error)
    }
  }

  public async getAccount(req: Request, res: Response, next: NextFunction){
    try {
      const user = req.user
      const accountInformations: Partial<IUser> = {
        userName: user?.userName,
        email: user?.email,
        mobile: user?.mobile,
      }

      res.status(200).send(accountInformations)
    } catch (error) {
      next(error)
    }
  }
  public async editAccount(req: Request, res: Response, next: NextFunction) {
    try {
      const {email, mobile, userName} = req.body
      await this.service.validateUserName(userName)
      await this.service.validateMobile(mobile)
      const accountParams: Partial<IUser> = {
        userName,
        email,
        mobile
      }
      const userId = req.user?._id as string
      await this.service.updateUser(userId, accountParams)
      res.status(200).send({
        success: true
      })
    } catch (error) {
      next(error)
    }
  }
}