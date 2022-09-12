import { Request, Response } from 'express';
import { ICardData, INewCardData } from '../types/cardTypes';
import * as cardServices from '../services/cardServices';
import * as tokenServices from '../services/tokenServices';

async function postCard(req: Request, res: Response){

    const {title, number, name, cvc, expireIn, password, isVirtual, type}: ICardData = req.body;
    
    const token: string | any = req.headers.authorization?.replace(/Bearer |'/g, '')
    
    const email: string | any = await tokenServices.decodeToken(token)

    const userId: number | any = await tokenServices.findUserId(email)
    
    await cardServices.checkTitleAtDataBase(title, userId)
    
    const secretPassword: string = cardServices.hideCardPassword(password);
    const secretCvc: string = cardServices.hideCardCvc(cvc);
    const newCard: INewCardData = {
        userId, 
        title, 
        number, 
        name, 
        cvc: secretCvc,
        expireIn, 
        password: secretPassword, 
        isVirtual, 
        type
    };
    
    await cardServices.createCard(newCard);
 
    return res.sendStatus(201);
}

async function getCards(req: Request, res: Response) {

    const token: string | any = req.headers.authorization?.replace(/Bearer |'/g, '')
    
    const email: string | any = await tokenServices.decodeToken(token)

    const userId: number | any = await tokenServices.findUserId(email)

    const cards = await cardServices.findAllCards(userId)

    return res.status(200).send(cards);
}

async function getCardById(req: Request, res: Response) {

    const id: number = +req.params.id;

    const token: string | any = req.headers.authorization?.replace(/Bearer |'/g, '')
    
    const email: string | any = await tokenServices.decodeToken(token)

    const userId: number | any = await tokenServices.findUserId(email)

    const card = await cardServices.findOneCard(id, userId)
    
    return res.status(200).send(card);
}

async function deleteCardById(req: Request, res: Response) {

    const id: number = +req.params.id;

    const token: string | any = req.headers.authorization?.replace(/Bearer |'/g, '')
    
    const email: string | any = await tokenServices.decodeToken(token)

    const userId: number | any = await tokenServices.findUserId(email)

    await cardServices.removeCard(id, userId);
    
    return res.sendStatus(202);
}

export {
    postCard,
    getCards,
    getCardById,
    deleteCardById
}