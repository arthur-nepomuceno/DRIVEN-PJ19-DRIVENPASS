import { Router } from "express";
import { dataValidator } from "../middlewares/validatorMiddleware";
import { credentialSchema } from "../schemas/credentialSchema";
import { postCredential, getCredentials, getCredentialById } from "../controllers/credentialsController";

const credentialsRouter = Router();

credentialsRouter.post('/new-credential', dataValidator(credentialSchema), postCredential);
credentialsRouter.get('/credentials', getCredentials)
credentialsRouter.get('/credential/:id', getCredentialById)

export default credentialsRouter;