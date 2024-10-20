import { join } from "path";
import Factory from "./Factory";
import IPost from "../model/IPost";
import PostStatus from "../contracts/PostStatus";
import { deleteFile } from "../../../services/DeleteFileService";
import ServerException from "../../../exceptions/ServerException";
import NotFoundException from "../../../exceptions/NotFoundException";
import ValidationException from "../../../exceptions/ValidationException";

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
  public async validateUser(userId: string, postId: string){
    const post = await this.factory.findPostWithId(postId)
    if(!post){
      throw new NotFoundException('not found any post with this information')
    }
    if(post.author.toString() !== userId.toString()){
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

    const updateGallery = await post.save()
    if(!updateGallery){
      throw new ServerException('There was a problem deleting the file')
    }
  }

  public async newDraft(params: Partial<IPost>){
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
    const post = await this.factory.findPostWithId(id)
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
  public async getAllPosts(userId: string, postStatus: string){
    const posts = await this.factory.findPostsWithStatus(userId, postStatus)
    return posts
  }
  public async getPostWithSlug(slug: string): Promise<IPost>{
    const resultQuery = await this.factory.findPostWithSlug(slug)
    if(!resultQuery){
      throw new NotFoundException('post not found!')
    }
    return resultQuery
  }
  public async getPostWithId(postId: string){
    const resultQuery = await this.factory.findPostWithId(postId)
    if(!resultQuery){
      throw new NotFoundException('post not found!')
    }
    return resultQuery
  }
  public async publishedPost(postId: string, tags: string[]){
    const params: Partial<IPost> = {tags: tags, status: PostStatus.PUBLISHED}
    const result = await this.factory.publishedPost(postId, params)
    if(!result){
      throw new ServerException('failed to published post!')
    }
  }
}