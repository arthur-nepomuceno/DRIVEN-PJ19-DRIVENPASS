import { Router } from "express";
import { dataValidator } from "../middlewares/validatorMiddleware";
import { userSchema } from "../schemas/userSchema";
import { signUp, login } from "../controllers/usersController";

const usersRouter = Router();

usersRouter.post('/signup', dataValidator(userSchema), signUp)
usersRouter.post('/login', dataValidator(userSchema), login)

export default usersRouter;