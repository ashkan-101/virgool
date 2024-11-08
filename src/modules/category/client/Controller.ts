import { Request, Response, NextFunction } from "express";
import CategoryService from './Service'

export default class CategoryController {
  private readonly service

  constructor(){
    this.service = new CategoryService()
  }

  public async categories (req: Request, res: Response, next: NextFunction){
    try {
      const categories = await this.service.categories()

      res.status(200).send(categories)
    } catch (error) {
      next(error)
    }
  }
  public async getCategory(req: Request, res: Response, next: NextFunction){
    try {
      const categoryId = req.params.id
      const category = await this.service.getCategory(categoryId)
      res.status(200).send(category)
    } catch (error) {
      next(error)
    }
  }
  public async getSubcategory(req: Request, res: Response, next: NextFunction){
    try {
      const subId = req.params.id
      const subcategory = await this.service.getSubcategory(subId)
      res.status(200).send(subcategory)
    } catch (error) {
      next(error)
    }
  }
}