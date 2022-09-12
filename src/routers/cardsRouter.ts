import { Router } from "express";
import { dataValidator } from "../middlewares/validatorMiddleware";
import { cardSchema } from "../schemas/cardSchema";
import * as cardControllers from "../controllers/cardsController";

const cardsRouter = Router();

const { postCard, 
        getCards, 
        getCardById, 
        deleteCardById } = cardControllers;

cardsRouter.post('/new-card', dataValidator(cardSchema), postCard);
cardsRouter.get('/cards', getCards)
cardsRouter.get('/card/:id', getCardById)
cardsRouter.delete('/card/:id', deleteCardById)

export default cardsRouter;