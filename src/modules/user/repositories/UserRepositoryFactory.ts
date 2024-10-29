import IUserRepository from "./IUserRepository";
import UserMongoRepository from "./UserMongoRepository";
import UserPgRepository from "./UserPgRepository";
import DatabaseName from "../../contracts/DatabaseName";

export default class UserRepositoryFactory {
  private repositories: Map<DatabaseName, IUserRepository> = new Map<DatabaseName, IUserRepository>()

  constructor(){
    this.repositories.set(DatabaseName.MONGODB, new UserMongoRepository())
    this.repositories.set(DatabaseName.POSTGRES, new UserPgRepository())
  }

  public getRepository(DatabaseName: DatabaseName){
    const repository: IUserRepository = this.repositories.get(DatabaseName)!
    return repository
  }
}