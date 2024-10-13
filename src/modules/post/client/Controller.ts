import Service from "./Service";
import { Request, Response, NextFunction, Express } from "express";

export default class Controller {
  private readonly Service: Service

  constructor(){
    this.Service = new Service()
  }

  public newPost(req: Request, res: Response, next: NextFunction){
    const {title, body} = req.body
    const gallery = req.files as {[fieldname: string]: Express.Multer.File[]}
    
    let galleryPath;
    if(gallery.gallery && gallery.gallery.length > 0){
      galleryPath = gallery.gallery.map((file) => file.path)
    }
    
    console.log(galleryPath);
    console.log({title, body});
  }
}