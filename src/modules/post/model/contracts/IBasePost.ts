import PostStatus from "../../contracts/PostStatus"

export default interface IBasePost{
  title: string
  body: string
  gallery: string[]
  tags: string[]
  status: PostStatus
  likes: string[]
  createdAt: Date
  updatedAt: Date
  slug: string
  views: number
}