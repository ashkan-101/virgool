import ServerException from "../../../exceptions/ServerException";
import Service from "./Service";
import { Request, Response, NextFunction, Express } from "express";

export default class Controller {
  private readonly Service: Service

  constructor(){
    this.Service = new Service()
  }

  public async newPost(req: Request, res: Response, next: NextFunction){
    try {
      const {title, body} = req.body

      let galleryNames;
      if(req.files){
        const gallery = req.files as {[fieldname: string]: Express.Multer.File[]}

        if(gallery.gallery && gallery.gallery.length > 0){
          galleryNames = gallery.gallery.map((file) => file.filename)
        }
      }
      
      const userId = req.user?._id

      const newPost = await this.Service.saveNewDraft(userId as string, title, body, galleryNames)
      if(!newPost){
        throw new ServerException('fail to save Post')
      }
  
      res.status(201).send({
        success: true,
        newPost
      })
    } catch (error) {
      next(error)
    }
  }
}