import DatabaseName from "../../contracts/DatabaseName";
import RegisterCodePGRepository from "./RegisterCodePGRepository";
import RegisterCodeMongoRepository from "./RegisterCodeMongoRepository";
import IRegisterCodePGRepository from "./contracts/IRegisterCodePGRepository";
import IRegisterCodeMongoRepository from "./contracts/IRegisterCodeMongoRepository";


export default class RegisterCodeRepositoryFactory {
  private repository: Map<DatabaseName, IRegisterCodeMongoRepository | IRegisterCodePGRepository> = new Map<DatabaseName, IRegisterCodeMongoRepository | IRegisterCodePGRepository>()
  
  constructor(){
    this.repository.set(DatabaseName.MONGODB, new RegisterCodeMongoRepository())
    this.repository.set(DatabaseName.POSTGRES, new RegisterCodePGRepository())
  }

  public getRepository(DatabaseName: DatabaseName){
    return this.repository.get(DatabaseName)!
  }
}