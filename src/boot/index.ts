import cors from 'cors'
import {uploadFile} from './multer'
import bodyParser from 'body-parser'
import { Application } from "express";

export default class Boot{
  private readonly app: Application

  constructor(app: Application){
    this.app = app
  }

  public init(){
    this.app.use(cors())
    uploadFile(this.app)
    this.app.use(bodyParser.json())
  }
}