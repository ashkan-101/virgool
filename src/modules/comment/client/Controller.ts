import { Request, Response, NextFunction } from "express";
import CommentService from "./Service";
import IBaseComment from "../model/contracts/IBaseComment";
import ICommentMongo from "../model/contracts/ICommentMongo";
import ICommentPG from "../model/contracts/ICommentPG";


export default class CommentController {
  private readonly service: CommentService

  constructor(){
    this.service = new CommentService()
  }

  public async newComment(req: Request, res: Response, next: NextFunction){
    try {
      const postId = req.params.id
      const {title, body} = req.body
      const userId = req.user?._id as string

      const params: Partial<ICommentMongo | ICommentPG> = {
        title,
        body,
        post: postId,
        user: userId,
      }
      const newComment = await this.service.newComment(params)

      res.status(201).send({
        success: true,
        newComment
      })
      
    } catch (error) {
      next(error)
    }
  }
  public async getComments(req: Request, res: Response, next: NextFunction){
    try {
      const postId = req.params.id
      const comments = await this.service.getComments(postId)
      
      res.status(200).send({
        success: true,
        comments,
        userId: req.user?._id 
      })
    } catch (error) {
      next(error)
    }
  }
  public async edit(req: Request, res: Response, next: NextFunction){
    try {
      const commentId = req.params.id
      const {title, body} = req.body
      const userId = req.user?._id as string

      await this.service.edit(commentId, userId, {title, body})

      res.status(200).send({
        success: true
      })

    } catch (error) {
      next(error)
    }
  }
  public async delete(req: Request, res: Response, next: NextFunction){
    try {
      const commentId = req.params.id
      const userId = req.user?._id as string
      
      await this.service.delete(commentId, userId)

      res.status(200).send({
        success: true
      })
    } catch (error) {
      next(error)
    }
  }
}