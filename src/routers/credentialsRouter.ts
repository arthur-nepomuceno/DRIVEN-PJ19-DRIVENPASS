import { Router } from "express";
import { dataValidator } from "../middlewares/validatorMiddleware";
import { credentialSchema } from "../schemas/credentialSchema";
import { postCredential } from "../controllers/credentialsController";

const credentialsRouter = Router();

credentialsRouter.post('/new-credential', dataValidator(credentialSchema), postCredential)

export default credentialsRouter;