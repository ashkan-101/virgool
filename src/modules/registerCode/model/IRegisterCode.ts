import { Document } from "mongoose"

export default interface IRegisterCode extends Document {
  code: string
  expireCode: number
  mobile: string
}