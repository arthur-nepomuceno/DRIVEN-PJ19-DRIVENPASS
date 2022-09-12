import { Router } from "express";
import { dataValidator } from "../middlewares/validatorMiddleware";
import { safeNoteSchema } from "../schemas/safeNoteSchema";
import * as safeNotesController from "../controllers/safeNotesController";

const safeNotesRouter = Router();

const {
    postSafeNote, 
    getSafeNotes, 
    getSafeNoteById, 
    deleteSafeNoteById } = safeNotesController

safeNotesRouter.post('/new-note', dataValidator(safeNoteSchema), postSafeNote)
safeNotesRouter.get('/notes', getSafeNotes)
safeNotesRouter.get('/note/:id', getSafeNoteById)
safeNotesRouter.delete('/note/:id', deleteSafeNoteById)

export default safeNotesRouter;