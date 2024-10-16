import { Router } from "express";
import Controller from "./Controller";
import { auth } from "../../../middlewares/Auth";

const postRouter: Router = Router()
const postController = new Controller()

postRouter.use(auth)
postRouter.post('/create', postController.newDraft.bind(postController))
postRouter.patch('/edit-draft/:id', postController.editDraft.bind(postController))
postRouter.delete('/delete/:id', postController.deletePost.bind(postController))

export default postRouter