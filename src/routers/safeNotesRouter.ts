import { Router } from "express";
import { dataValidator } from "../middlewares/validatorMiddleware";
import { safeNoteSchema } from "../schemas/safeNoteSchema";
import { postSafeNote } from "../controllers/safeNotesController";

const safeNotesRouter = Router();

safeNotesRouter.post('/new-note', dataValidator(safeNoteSchema), postSafeNote)

export default safeNotesRouter;