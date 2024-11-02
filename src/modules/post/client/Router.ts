import { Router } from "express";
import Controller from "./Controller";
import { auth } from "../../../middlewares/Auth";

const postRouter: Router = Router()
const postController = new Controller()

postRouter.use(auth)
postRouter.post('/create', postController.newDraft.bind(postController))
postRouter.patch('/edit-draft/:id', postController.editDraft.bind(postController))
postRouter.delete('/delete/:id', postController.deletePost.bind(postController))
postRouter.get('/get-all', postController.posts.bind(postController))
postRouter.get('/get-post/:id', postController.getPostWithId.bind(postController))
postRouter.get('/get/:slug', postController.getPostWithSlug.bind(postController))
postRouter.patch('/published/:id', postController.published.bind(postController))

export default postRouter