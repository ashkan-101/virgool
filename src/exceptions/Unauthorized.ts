import Exception from "./Exception";

export default class Unathorized extends Exception {
  constructor(message: string){
    super(401, message)
  }
}