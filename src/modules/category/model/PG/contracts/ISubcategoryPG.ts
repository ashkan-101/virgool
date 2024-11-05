import Post from "../../../../post/model/Post.pg"

export default interface ISubcategoryPG {
  title: string
  posts: Post[]
}