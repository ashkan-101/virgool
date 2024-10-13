import { Request, Response, NextFunction } from "express"
import Unathorized from "../exceptions/Unauthorized"
import {verify} from '../services/TokenService'
import UserMongoRepository from "../modules/user/repositories/UserMongoRepository"

const findUserById = new UserMongoRepository()

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