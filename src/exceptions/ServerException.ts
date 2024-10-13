import Exception from "./Exception";

export default class ServerException extends Exception {
  constructor(message: string){
    super(500, message)
  }
}