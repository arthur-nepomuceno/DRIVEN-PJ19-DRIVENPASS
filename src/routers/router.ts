import { Router } from "express";
import usersRouter from "./usersRouter";
import credentialsRouter from "./credentialsRouter";
import safeNotesRouter from "./safeNotesRouter";
import cardsRouter from "./cardsRouter";

const router = Router();

router.use(usersRouter);
router.use(credentialsRouter);
router.use(safeNotesRouter);
router.use(cardsRouter);

export default router;