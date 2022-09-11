import { Router } from "express";
import usersRouter from "./usersRouter";
import credentialsRouter from "./credentialsRouter";

const router = Router();

router.use(usersRouter);
router.use(credentialsRouter);

export default router;