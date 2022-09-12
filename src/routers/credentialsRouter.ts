import { Router } from "express";
import { dataValidator } from "../middlewares/validatorMiddleware";
import { credentialSchema } from "../schemas/credentialSchema";
import * as credentialControllers from "../controllers/credentialsController";

const credentialsRouter = Router();

const { postCredential, 
        getCredentials, 
        getCredentialById, 
        deleteCredentialById } = credentialControllers;

credentialsRouter.post('/new-credential', dataValidator(credentialSchema), postCredential);
credentialsRouter.get('/credentials', getCredentials)
credentialsRouter.get('/credential/:id', getCredentialById)
credentialsRouter.delete('/delete/:id', deleteCredentialById)

export default credentialsRouter;