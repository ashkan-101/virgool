import { Document } from "mongoose";

export default interface ITopic extends Document {
  title: string
  attributes: string[]
}