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

  public async deleteFile(id: string, imageNames: string[]): Promise<boolean>{
    const post = await this.factory.getPost(id)

    if(!post){
      return false
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
      return false
    }

    return true
  }

  public async deletePost(id: string){
    const post = await this.factory.getPost(id)
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
    const post = await this.factory.getPost(id)

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
}