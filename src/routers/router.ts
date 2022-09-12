import { Router } from "express";
import usersRouter from "./usersRouter";
import credentialsRouter from "./credentialsRouter";
import safeNotesRouter from "./safeNotesRouter";

const router = Router();

router.use(usersRouter);
router.use(credentialsRouter);
router.use(safeNotesRouter);

export default router;