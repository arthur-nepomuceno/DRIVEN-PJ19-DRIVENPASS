import { Router } from "express";
import { checkUserData } from "../middlewares/usersMiddleware";

const usersRouter = Router();

usersRouter.post('/signup', checkUserData)

export default usersRouter;