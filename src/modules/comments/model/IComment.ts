import { Document } from "mongoose";


export default interface IComment extends Document {
  user: string
  post: string
  body: string
  likes: number
  replays: IComment[]
}