import DatabaseName from "../../contracts/DatabaseName";
import IPostMongoRepository from "./contracts/IPostMongoRepository";
import IPostPGRepository from "./contracts/IPostPGRepository";
import PostMongoRepository from "./PostMongoRepository";
import PostPGRepository from "./PostPGRepository";


export default class PostRepositoryFactory {
  private postRepository: Map<string, IPostMongoRepository | IPostPGRepository> = new Map<string, IPostMongoRepository | IPostPGRepository>()

  constructor(){
    this.postRepository.set('postgres', new PostPGRepository())
    this.postRepository.set('mongodb', new PostMongoRepository())
  }

  public getRepository(databaseName: DatabaseName){
    return this.postRepository.get(databaseName)!
  }
}

