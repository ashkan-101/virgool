import { Request } from "express";
import IUser from "./modules/user/model/IUser";

declare global {
  namespace Express {
    interface Request {
      user?: IUser
    }
  }
}