

export default class Exception extends Error{
  readonly status: number
  readonly message: string
  readonly name: string

  constructor(status: number, message: string){
    super(message)
    this.status = status
    this.message = message
    this.name = this.constructor.name
  }
}