import { Request, Response, NextFunction } from "express";
import UserService from "./Service";
import { Gender } from "../contracts/UserTypes";
import IUser from "../model/IUser";
import ServerException from "../../../exceptions/ServerException";
import ValidationException from "../../../exceptions/ValidationException";

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
        avatar: avatarName
      }
  
      const resultUpdate = await this.service.updateUser(userId, newSettingsParams)
  
      if(!resultUpdate){
        throw new ServerException('failed to updated settings!')
      }
  
      res.status(200).send({
        success: resultUpdate
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
      const {email, mobile} = req.body
      const userName = req.body.userName
      const checkUserName = await this.service.checkUserName(userName)
      console.log({checkUserName});
      
      let userNameChecked: string | undefined
      if(!checkUserName){
        throw new ValidationException('this userName already exist!')
      }
      userNameChecked = userName
      const accountParams: Partial<IUser> = {
        userName: userNameChecked,
        email,
        mobile
      }
      const userId = req.user?._id as string

      const result = await this.service.updateUser(userId, accountParams)

      if(!result){
        throw new ServerException('failed to updated account')
      }

      res.status(200).send({
        success: result
      })
    } catch (error) {
      next(error)
    }
  }
}