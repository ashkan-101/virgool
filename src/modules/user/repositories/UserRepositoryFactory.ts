import UserPgRepository from "./UserPGRepository";
import UserMongoRepository from "./UserMongoRepository";
import DatabaseName from "../../contracts/DatabaseName";
import IUserPGRepository from "./contracts/IUserPGRepository";
import IUserMongoRepository from "./contracts/IUserMongoRepository";

export default class UserRepositoryFactory {
  private repositories: Map<DatabaseName, IUserMongoRepository | IUserPGRepository> = new Map<DatabaseName, IUserMongoRepository | IUserPGRepository>()

  constructor(){
    this.repositories.set(DatabaseName.MONGODB, new UserMongoRepository())
    this.repositories.set(DatabaseName.POSTGRES, new UserPgRepository())
  }

  public getRepository(DatabaseName: DatabaseName){
    return this.repositories.get(DatabaseName)!
  }
}