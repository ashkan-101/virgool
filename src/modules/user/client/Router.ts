import { Router } from "express";
import UserController from "./Controller";
import { auth } from "../../../middlewares/Auth";

const userRouter = Router()
const userController = new UserController()

userRouter.use(auth)
userRouter.get('/settings', userController.getSetting.bind(userController))
userRouter.patch('/settings', userController.newSettings.bind(userController))

userRouter.get('/settings/account', userController.getAccount.bind(userController))
userRouter.patch('/settings/account', userController.editAccount.bind(userController))

export default userRouter