import Service from "./Service";
import ServerException from "../../../exceptions/ServerException";
import { Request, Response, NextFunction, Express } from "express";

export default class Controller {
  private readonly Service: Service

  constructor(){
    this.Service = new Service()
  }

  public async newDraft(req: Request, res: Response, next: NextFunction){
    try {
      const {title, body} = req.body

      let galleryNames: string[] | undefined;
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

  public async editDraft(req: Request, res: Response, next: NextFunction){
    try {
      const id = req.params.id
      const title: string | undefined = req.body.title
      const body: string | undefined = req.body.body
      
      //image names for deleted
      const imageNames: string[] | undefined = req.body.imageNames
      
      //new post images
      let galleryNames: string[] | undefined;
      if(req.files){
        const gallery = req.files as {[fieldname: string]: Express.Multer.File[]}
  
        if(gallery.gallery && gallery.gallery.length > 0){
          galleryNames = gallery.gallery.map((file) => file.filename)
        }
      }

      //delete image
      let resultDelete: boolean | undefined
      if(imageNames){
        resultDelete = await this.Service.deleteFile(id, imageNames)
      }
      if(resultDelete === false){
        throw new ServerException('fali to delete file!')
      }

      //update post gallery
      let newGalleryNames: boolean | undefined
      if(galleryNames && galleryNames.length > 0){
        newGalleryNames = await this.Service.updateGallery(id, galleryNames)
      }
      if(newGalleryNames === false){
        throw new ServerException('update gallery fali!')
      }
      
      //update draft
      if(title || body){
        const resultUpdate = await this.Service.updateDraft(id, title, body)
        if(!resultUpdate){
          throw new ServerException('fail to updated Post!')
        }
      }
  
      res.status(200).send({
        success: true
      })
    } catch (error) {
      next(error)
    }
  }
}