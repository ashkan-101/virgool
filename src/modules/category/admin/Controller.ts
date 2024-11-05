import { Request, Response, NextFunction } from "express";
import CategoryService from "./Service";
import ISubcategoryPG from "../model/PG/contracts/ISubcategoryPG";

export default class CategoryController {
  private readonly service: CategoryService

  constructor(){
    this.service = new CategoryService()
  }

  public async createCategory(req: Request, res: Response, next: NextFunction){
    try {
      const {title} = req.body
      const subcategory: ISubcategoryPG[] = req.body
      const newCategory = await this.service.createCategory({title, subcategory})

      res.status(201).send(newCategory)
    } catch (error) {
      next(error)
    }
  }
}