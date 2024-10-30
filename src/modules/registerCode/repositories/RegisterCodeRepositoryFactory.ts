import DatabaseName from "../../contracts/DatabaseName";
import RegisterCodeMongoRepository from "./RegisterCodeMongoRepository";
import RegisterCodePGRepository from "./RegisterCodePGRepository";
import IRepository from "../../contracts/IRepository";
import IBaseRegisterCode from "../model/contracts/IBaseRegisterCode";


export default class RegisterCodeRepositoryFactory {
  private repository: Map<DatabaseName, IRepository<IBaseRegisterCode>> = new Map<DatabaseName, IRepository<IBaseRegisterCode>>()

  constructor(){
    this.repository.set(DatabaseName.MONGODB, new RegisterCodeMongoRepository())
    this.repository.set(DatabaseName.POSTGRES, new RegisterCodePGRepository())
  }

  public getRepository(DatabaseName: DatabaseName){
    return this.repository.get(DatabaseName)!
  }
}