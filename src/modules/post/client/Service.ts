import IPost from "../model/IPost";
import Factory from "./Factory";

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

    const newPost = await this.factory.savePostInRepository(postParams)
    return newPost
  }
}