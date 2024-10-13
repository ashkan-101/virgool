import { Router } from "express";
import AuthController from "./authController";

const authRouter: Router = Router()
const controller: AuthController = new AuthController()

authRouter.post('/register', controller.register.bind(controller))
authRouter.post('/check/:id', controller.finalizeRegistration.bind(controller))

export default authRouter