import CommentStatus from "./CommentStatus"


export default interface IBaseComment {
  title: string
  body: string
  createdAt: Date
  updatedAt: Date
  status: CommentStatus
}