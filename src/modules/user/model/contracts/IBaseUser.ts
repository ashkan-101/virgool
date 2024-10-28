import Gender from "../../contracts/Gender";

export default interface IBaseUser{
  firstName: string
  lastName: string
  userName: string
  bio: string
  avatar: string
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