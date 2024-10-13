import IRegisterCode from './IRegisterCode'
import { Schema, model } from 'mongoose'

const registerCodeSchema = new Schema({
  code: {type: String, required: true},
  expireCode: {type: Number, default: Date.now() + 120000},
  mobile: {type: String, required: true}
})

export default model<IRegisterCode>('RegisterCode', registerCodeSchema)