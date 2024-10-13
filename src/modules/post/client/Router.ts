import { Router } from "express";
import Controller from "./Controller";
import { auth } from "../../../middlewares/Auth";

const postRouter: Router = Router()
const postController = new Controller()

postRouter.use(auth)
postRouter.post('/create', postController.newPost.bind(postController))

export default postRouter