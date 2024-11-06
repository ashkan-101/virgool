import { Request, Response, NextFunction } from "express";
import CategoryService from "./Service";
import ISubcategoryPG from "../model/PG/contracts/ISubcategoryPG";
import StatusCategory from "../model/contracts/StatusCategory";

export default class CategoryController {
  private readonly service: CategoryService

  constructor(){
    this.service = new CategoryService()
  }

  public async createCategory(req: Request, res: Response, next: NextFunction){
    try {
      const {title} = req.body
      const category = await this.service.createCategory(title)

      res.status(201).send(category)
    } catch (error) {
      next(error)
    }
  }
  public async createSubcategory(req: Request, res: Response, next: NextFunction){
    try {
      const {categoryId, title} = req.body
      const subcategory = await this.service.createSubcategory(title, categoryId)
      res.status(201).send(subcategory)
    } catch (error) {
      next(error)
    }
  }
  public async categories(req: Request, res: Response, next: NextFunction){
    try {
      const statusCategory = req.query.status as StatusCategory
      const categories = await this.service.categories(statusCategory)
      res.status(200).send(categories)
    } catch (error) {
      next(error)
    }
  }
  public async getCategory(req: Request, res: Response, next: NextFunction){
    try {
      const categoryId = req.params.id
      const result = await this.service.getCategory(categoryId)
      res.status(200).send(result)
    } catch (error) {
      next(error)
    }
  }
  public async getSubcategory(req: Request, res: Response, next: NextFunction){
    try {
      const subId = req.params.id
      const result = await this.service.getSubcategory(subId)
      res.status(200).send(result)
    } catch (error) {
      next(error)
    }
  }
  public async editCategory(req: Request, res: Response, next: NextFunction){
    try {
      const categoryId = req.params.id
      const statusCategory: StatusCategory = req.body.statusCategory
      const title: string = req.body.title

      await this.service.editCategory({status: statusCategory, title}, categoryId)
      res.status(200).send({
        success: true
      })
    } catch (error) {
      next(error)
    }
  }
  public async deleteCategory(req: Request, res: Response, next: NextFunction){
    try {
      const categoryId = req.params.id
      await this.service.deleteCategory(categoryId)
      res.status(200).send({
        success: true
      })
    } catch (error) {
      next(error)
    }
  }
  public async editSubcategory(req: Request, res: Response, next: NextFunction){
    try {
      const subId = req.params.id
      const {title} = req.body
      await this.service.editSubcategory(subId, title)
      res.status(200).send({
        success: true
      })
    } catch (error) {
      next(error)
    }
  }
  public async deleteSubcategory(req: Request, res: Response, next: NextFunction){
    try {
      const subId = req.params.id
      await this.service.deleteSubcategory(subId)
      res.status(200).send({
        success: true
      })
    } catch (error) {
      next(error)
    }
  }
}