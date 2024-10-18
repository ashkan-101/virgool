import IUser from "./IUser";
import { Schema, model } from "mongoose";
import {randomBytes} from 'crypto'

const userSchema = new Schema({
  firstName: {type: String, default: null},
  lastName: {type: String, default: null},
  userName: {type: String, default: `user_${randomBytes(3).toString('hex')}`},
  bio: {type: String, default: null},
  avatar: {type: String, default: null},
  gender: {type: String, default: null},
  mobile: {type: String, required: true, unique: true},
  email: {type: String, default: null},
  password: {type: String, default: null},
  folowing: {type: [String], default: null},
  folowers: {type: [String], default: null},
  birthday: {type: Date, default: null},
  createdAt: {type: Date, default: Date.now()},
  updatedAt: {type: Date, default: Date.now()},
})

export default model<IUser>('User', userSchema)