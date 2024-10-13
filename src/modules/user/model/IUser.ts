import { Document } from "mongoose";
import { Gender } from "../contracts/UserTypes";

export default interface IUser extends Document{
  firstName: string
  lastName: string
  userName: string
  bio: string
  picture: string
  gender: Gender
  mobile: string
  email: string
  password: string
  folowing: string[]
  folowers: string[]
  birthday: Date
  createdAt: Date
  updatedAt: Date
}