import Exception from "./Exception";

export default class NotFoundException extends Exception {
  constructor(message: string){
    super(404, message)
  }
}
