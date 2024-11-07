import { join } from "path";
import Factory from "./Factory";
import IPost from "../model/contracts/IBasePost";
import PostStatus from "../contracts/PostStatus";
import { deleteFile } from "../../../services/DeleteFileService";
import ServerException from "../../../exceptions/ServerException";
import NotFoundException from "../../../exceptions/NotFoundException";
import ValidationException from "../../../exceptions/ValidationException";
import IPostMongo from "../model/contracts/IPostMongo";
import IPostPG from "../model/contracts/IPostPG";
import PostPG from "../model/Post.pg";
import DatabaseName from "../../contracts/DatabaseName";
import User from "../../user/model/User.pg";
import PostSort from "../contracts/PostSort";

export default class Service {
  private readonly factory: Factory

  constructor(){
    this.factory = new Factory()
  }

  private async slugGenerator(title: string){
    let slug = title.replaceAll(' ', '-')+'-'+Math.random().toString(16).slice(3,9)
    const resultQuery = await this.factory.findPostWithSlug(slug)
    if(resultQuery){
      this.slugGenerator(title)
    }
    return slug
  }
  private async savePost(post: IPostMongo | IPostPG){
    if('save' in post){
      const result = await post.save()
      return result
    }else {
      const result = await PostPG.save({...post})
      return result
    }
  }
  private async addView(postId: string, lastViews: number){
    return await this.factory.updatePost(postId, {views: lastViews + 1})
  }
  public async validateUser(userId: string, postId: string){
    const post = await this.factory.findPostWithId(postId)
    if(!post){
      throw new NotFoundException('not found any post with this information')
    }
    if(process.env.APP_DATABASE === DatabaseName.MONGODB && post.author.toString() !== userId.toString()){
      throw new ValidationException('The current user is not valid!')
    }else if(process.env.APP_DATABASE === DatabaseName.POSTGRES && (post.author as User)._id !== userId){
      throw new ValidationException('The current user is not valid!')
    }
  }
  public async deleteFile(id: string, imageNames: string[]){
    const post = await this.factory.findPostWithId(id)

    if(!post){
      throw new NotFoundException('post not found!')
    }

    imageNames.forEach((name) => {
      const index = post.gallery.indexOf(name)
      if(index > -1){
        post.gallery.splice(index, 1)
        deleteFile(join(process.cwd(), 'public', 'post-images', name))
      }
    })
    const updateGallery = await this.savePost(post)
    if(!updateGallery){
      throw new ServerException('There was a problem deleting the file')
    }
  }
  
  public async newDraft(params: Partial<IPostMongo | IPostPG>){
    let slug: string | undefined
    if(params.title){
      slug = await this.slugGenerator(params.title)
    }
    const postParams: Partial<IPost> = {
      ...params,
      slug
    }
    const newPost = await this.factory.saveNewDraft(postParams)
    if(!newPost){
      throw new ServerException('failed to save Post!')
    }
    return newPost
  }
  public async editDraft(id: string, params: Partial<IPost>){
    let slug: string | undefined
    if(params.title){
      slug = await this.slugGenerator(params.title)
    }
    const updateResult = await this.factory.updatePost(id , {...params, slug})
    if(!updateResult){
      throw new ServerException('there has a problem to updated post')
    }
  }
  public async deletePost(id: string){
    const post = await this.getPostWithId(id)
    if(post === null){
      throw new NotFoundException('post not found!')
    }
    if(post.gallery && post.gallery.length > 0){
      post.gallery.forEach((name) => {
        deleteFile(join(process.cwd(), 'public', 'post-images', name))
      })
    }
    const deletePostResult = await this.factory.deletePostWithID(id)
    if(!deletePostResult){
      throw new ServerException('There was a problem deleting the post')
    }
  }
  public async getMyPosts(userId: string, postStatus: PostStatus){
    const posts = await this.factory.findPostsWithStatus(userId, postStatus)
    return posts
  }
  public async getPostWithSlug(slug: string): Promise<IPost>{
    const resultQuery = await this.factory.findPostWithSlug(slug)
    if(!resultQuery){
      throw new NotFoundException('post not found!')
    }
    const result = await this.addView(resultQuery._id as string, resultQuery.views)
    return resultQuery
  }
  public async getPostWithId(postId: string){
    const resultQuery = await this.factory.findPostWithId(postId)
    if(!resultQuery){
      throw new NotFoundException('post not found!')
    }
    return resultQuery
  }
  public async publishedPost(postId: string, tags: string[], subId: string){
    const params = {tags: tags, status: PostStatus.PUBLISHED, subcategory: subId}
    const result = await this.factory.publishedPost(postId, params)
    if(!result){
      throw new ServerException('failed to published post!')
    }
  }
  public async likePost(userId: string, postId: string){
    const post = await this.getPostWithId(postId)
    const likes = post.likes
    const userIndex = likes.indexOf(userId)

    if(userIndex > -1){
      likes.splice(userIndex, 1)
      await this.factory.updatePost(postId, {likes: likes})
      return 'dislike'
    }else{
      likes.push(userId)
      await this.factory.updatePost(postId, {likes: likes})
      return 'like'
    }
  }
  public async getSortingPosts(sort?: PostSort){
    return await this.factory.findAndSort(sort)
  } 
}
