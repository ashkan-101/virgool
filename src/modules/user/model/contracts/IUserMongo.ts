import IBaseUser from "./IBaseUser";
import { Document } from "mongoose";

export default interface IUserMongo extends Document, IBaseUser{}