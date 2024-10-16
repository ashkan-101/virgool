import IPost from "../model/IPost";
import Factory from "./Factory";
import { deleteFile } from "../../../services/DeleteFileService";
import { join } from "path";
import NotFoundException from "../../../exceptions/NotFoundException";

export default class Service {
  private readonly factory: Factory

  constructor(){
    this.factory = new Factory()
  }

  public async saveNewDraft(userId: string, title: string, body: string, gallery?: string[]){
    const postParams: Partial<IPost> = {
      author: userId,
      title,
      body,
      gallery
    }

    const newPost = await this.factory.saveDraftInRepository(postParams)
    return newPost
  }

  public async checkUser(userId: string, postId: string): Promise<boolean>{
    const post = await this.factory.findPostWithId(postId)
    if(!post){
      return false
    }

    if(userId !== post.author){
      return false
    }
    
    return true
  }

  public async getAllPosts(userId: string, postStatus: string){
    const posts = await this.factory.findPostsWithStatus(userId, postStatus)
    return posts
  }

  public async getOnePost(id: string){
    const post =  await this.factory.findPostWithId(id)
    if(!post){
      return false
    }
    return post
  }

  public async deleteFile(id: string, imageNames: string[]): Promise<boolean>{
    const post = await this.factory.findPostWithId(id)

    if(!post){
      return false
    }

    if(imageNames && imageNames.length > 0)

    imageNames.forEach((name) => {
      const index = post.gallery.indexOf(name)
      if(index > -1){
        post.gallery.splice(index, 1)
        deleteFile(join(process.cwd(), 'public', 'post-images', name))
      }
    })

    const updateGallery = await post.save()
    if(!updateGallery){
      return false
    }

    return true
  }

  public async deletePost(id: string){
    const post = await this.factory.findPostWithId(id)
    if(!post){
      throw new NotFoundException('post not found!')
    }
    const deleteFileResult = await this.deleteFile(id, post.gallery)
    if(!deleteFileResult){
      return false
    }
    const deletePostResult = await this.factory.deletePostWithID(id)
    if(!deletePostResult){
      return false
    }
    return deletePostResult
  }

  public async updateDraft(id: string, title?: string, body?: string){
    const updateParams = await this.factory.updatePost(id ,{
      title,
      body,
    })
    return updateParams
  }

  public async updateGallery(id: string, gallery: string[]){
    const post = await this.factory.findPostWithId(id)

    if(!post){
      return false
    }

    gallery.forEach((image) => {
      post.gallery.push(image)
    })
    const saveResult = await post.save()
    if(!saveResult){
      return false
    }

    return true
  }

  public async publishedPost(postId: string, tags: string[]){
    const params: Partial<IPost> = {tags: tags, status: 'published'}
    const result = await this.factory.publishedPost(postId, params)
    
    if(!result){
      return false
    }
    return result
  }
}