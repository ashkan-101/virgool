import IRegisterCodeMongo from './contracts/IRegisterCodeMongo'
import { Schema, model } from 'mongoose'

const expireDate = Date.now() + 120000
const registerCodeSchema = new Schema({
  code: {type: String, required: true},
  expireAt: {type: Number, default: expireDate},
  mobile: {type: String, required: true}
})

export default model<IRegisterCodeMongo>('RegisterCode', registerCodeSchema)