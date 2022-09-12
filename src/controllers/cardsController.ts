import { Request, Response } from 'express';
import { ICardData, INewCardData } from '../types/cardTypes';
import * as cardServices from '../services/cardServices';
import * as tokenServices from '../services/tokenServices';

async function postCard(req: Request, res: Response){
    //get cretendials info from body
    //get token from headers
    //a service to decode token
    //a service to get user's id by it's email
    //a service to check if title is unique for this user
    //a service to check if urlUser is unique for this url and this user
    //a service to encrypt the password
    //a service to register the credential at data base


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

    const credentials = await cardServices.findAllCards(userId)

    return res.status(200).send(credentials);
}

async function getCardById(req: Request, res: Response) {

    const id: number = +req.params.id;

    const token: string | any = req.headers.authorization?.replace(/Bearer |'/g, '')
    
    const email: string | any = await tokenServices.decodeToken(token)

    const userId: number | any = await tokenServices.findUserId(email)

    const credential = await cardServices.findOneCard(id, userId)
    
    return res.status(200).send(credential);
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