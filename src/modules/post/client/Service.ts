import IPost from "../model/IPost";
import Factory from "./Factory";

export default class Service {
  private readonly factory: Factory

  constructor(){
    this.factory = new Factory()
  }

  public async saveNewPost(userId: string,postParams: Partial<IPost>){
    
  }
}