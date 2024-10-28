import IBaseUser from "../../../user/model/contracts/IBaseUser"

export default interface IBasePost{
  author: string | IBaseUser
  title: string
  body: string
  gallery: string[]
  tags: string[]
  status: String
  likes: string[]
  createdAt: Date
  updatedAt: Date
  slug: string
}