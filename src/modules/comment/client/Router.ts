import { Router } from "express";
import CommentController from "./Controller";
import { auth } from "../../../middlewares/Auth";

const commentRourter = Router()
const controller = new CommentController()

commentRourter.use(auth)
commentRourter.post('/create/:id', controller.newComment.bind(controller))
commentRourter.get('/get-all/:id', controller.getComments.bind(controller))
commentRourter.patch('/edit/:id', controller.edit.bind(controller))
commentRourter.delete('/delete/:id', controller.delete.bind(controller))
export default commentRourter