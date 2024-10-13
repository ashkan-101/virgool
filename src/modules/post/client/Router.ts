import { Router } from "express";
import Controller from "./Controller";

const postRouter: Router = Router()
const postController = new Controller()

postRouter.post('/create', postController.newPost.bind(postController))

export default postRouter