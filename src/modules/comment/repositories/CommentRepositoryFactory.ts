import DatabaseName from "../../contracts/DatabaseName";
import CommentMongoRepository from "./CommentMongoRepository";
import CommentPGRepository from "./CommentPGRepository";
import ICommentMongoRepository from "./contracts/ICommentMongoRepository";
import ICommentPGRepository from "./contracts/ICommentPGRepository";


export default class CommentRepositoryFactory {
  private readonly repositories: Map<DatabaseName, ICommentMongoRepository | ICommentPGRepository> = new Map<DatabaseName, ICommentMongoRepository | ICommentPGRepository>()

  constructor(){
    this.repositories.set(DatabaseName.MONGODB, new CommentMongoRepository())
    this.repositories.set(DatabaseName.POSTGRES, new CommentPGRepository())
  }

  public getRepository(databaseName: DatabaseName){
    return this.repositories.get(databaseName)!
  }
}