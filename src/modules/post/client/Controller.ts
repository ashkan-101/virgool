import Service from "./Service";
import IPost from "../model/IPost";
import { Request, Response, NextFunction, Express } from "express";
import ValidationException from "../../../exceptions/ValidationException";

export default class Controller {
  private readonly Service: Service;

  constructor() {
    this.Service = new Service();
  }

  public async newDraft(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, body } = req.body;
      let galleryNames: string[] | undefined;
      if (req.files) {
        const gallery = req.files as {[fieldname: string]: Express.Multer.File[];};
        if (gallery.gallery && gallery.gallery.length > 0) {
          galleryNames = gallery.gallery.map((file) => file.filename);
        }
      }
      const userId = req.user?._id as string;

      const postParams: Partial<IPost> = {
        author: userId,
        title,
        body,
        gallery: galleryNames,
      };

      const newPost = await this.Service.newDraft(postParams);

      res.status(201).send({
        success: true,
        newPost,
      });
    } catch (error) {
      next(error);
    }
  }
  public async editDraft(req: Request, res: Response, next: NextFunction) {
    try {
      const postId = req.params.id;
      const title: string | undefined = req.body.title;
      const body: string | undefined = req.body.body;

      //validate user
      await this.Service.validateUser(req.user?._id as string,postId);

      //new post images
      let galleryNames: string[] | undefined;
      if (req.files) {
        const gallery = req.files as {[fieldname: string]: Express.Multer.File[];};
        if (gallery.gallery && gallery.gallery.length > 0) {
          galleryNames = gallery.gallery.map((file) => file.filename);
        }
      }

      //image names for deleted
      const deletedImage: string[] | undefined = req.body.imageNames;
      //delete image
      if (deletedImage && deletedImage.length > 0) {
        await this.Service.deleteFile(postId, deletedImage);
      }

      const newParams: Partial<IPost> = {
        title,
        body,
        gallery: galleryNames,
      };

      await this.Service.editDraft(postId, newParams);

      res.status(200).send({
        success: true,
      });
    } catch (error) {
      next(error);
    }
  }
  public async deletePost(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;

      await this.Service.validateUser(req.user?._id as string, id);
      await this.Service.deletePost(id);

      res.status(200).send({
        success: true,
      });
    } catch (error) {
      next(error);
    }
  }
  public async posts(req: Request, res: Response, next: NextFunction) {
    try {
      const postStatus = req.query.poststatus as string;
      const userId = req.user?._id as string;
      const allPosts = await this.Service.getAllPosts(userId.toString(), postStatus);

      res.status(200).send({
        success: true,
        allPosts,
      });
    } catch (error) {
      next(error);
    }
  }
  public async getPostWithSlug(req: Request, res: Response, next: NextFunction) {
    try {
      const slug = req.params.slug;
      const post = await this.Service.getPostWithSlug(slug);
      res.status(200).send({
        success: true,
        post,
      });
    } catch (error) {
      next(error);
    }
  }
  public async getPostWithId(req: Request, res: Response, next: NextFunction){
    try {
      const postId = req.params.id
      const post = await this.Service.getPostWithId(postId)
      res.status(200).send({
        success: true,
        post
      })  
    } catch (error) {
      next(error)
    }
  }
  public async published(req: Request, res: Response, next: NextFunction) {
    try {
      const postId = req.params.id;
      const tags: string[] = req.body.tags as string[];

      await this.Service.validateUser(req.user?._id as string, postId);
      await this.Service.publishedPost(postId, tags);

      res.status(200).send({
        success: true
      });
    } catch (error) {
      next(error);
    }
  }
}
