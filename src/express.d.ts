import { Request } from "express";
import IUserPG from "./modules/user/model/contracts/IUserPG";
import IUserMongo from "./modules/user/model/contracts/IUserMongo";

declare global {
  namespace Express {
    interface Request {
      user?: IUserMongo | IUserPG
    }
  }
}