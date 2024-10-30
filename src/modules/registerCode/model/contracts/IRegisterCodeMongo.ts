import { Document } from "mongoose";
import IBaseRegisterCode from "./IBaseRegisterCode";

export default interface IRegisterCodeMongo extends Document, IBaseRegisterCode{}