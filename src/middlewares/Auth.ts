import {verify} from '../services/TokenService'
import Unathorized from "../exceptions/Unauthorized"
import { Request, Response, NextFunction } from "express"
import DatabaseName from '../modules/contracts/DatabaseName'
import IUserMongoRepository from '../modules/user/repositories/contracts/IUserMongoRepository'
import IUserPGRepository from '../modules/user/repositories/contracts/IUserPGRepository'
import UserRepositoryFactory from '../modules/user/repositories/UserRepositoryFactory'
import { config } from 'dotenv'
config()

const findUserById: IUserMongoRepository |  IUserPGRepository = new UserRepositoryFactory().getRepository(process.env.APP_DATABASE as DatabaseName)

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization

    if(!token){
      throw new Unathorized('Unathorized!')
    }

    const tokenResult = verify(token)

    if(!tokenResult){
      throw new Unathorized('Unathorized!')
    }

    const checkUser = await findUserById.findOne(tokenResult.userId)

    if(!checkUser){
     throw new Unathorized('Unathorized!')
    }

    req.user = checkUser
    next()
  } catch (error) {
    next(error)
  }
}