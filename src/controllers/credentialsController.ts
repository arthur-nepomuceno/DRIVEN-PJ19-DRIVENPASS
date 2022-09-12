import { Request, Response } from 'express';
import { ICredentialData, INewCredentialData } from '../types/credentialTypes';
import * as credentialServices from '../services/credentialServices';
import * as tokenServices from '../services/tokenServices';

async function postCredential(req: Request, res: Response){

    const {title, url, urlUser, urlPassword}: ICredentialData = req.body;
    
    const token: string | any = req.headers.authorization?.replace(/Bearer |'/g, '')
    
    const email: string | any = await tokenServices.decodeToken(token)

    const userId: number | any = await tokenServices.findUserId(email)
    
    await credentialServices.checkTitleAtDataBase(title, userId)
    
    await credentialServices.checkUrlUserAtDataBase(url, urlUser, userId)
    
    const secret: string = credentialServices.hideCredentialPassword(urlPassword)
    const newCredential: INewCredentialData = {userId, title, url, urlUser, urlPassword: secret};
    
    await credentialServices.createCredential(newCredential)
 
    return res.sendStatus(201);
}

async function getCredentials(req: Request, res: Response) {

    const token: string | any = req.headers.authorization?.replace(/Bearer |'/g, '')
    
    const email: string | any = await tokenServices.decodeToken(token)

    const userId: number | any = await tokenServices.findUserId(email)

    const credentials = await credentialServices.findAllCredentials(userId)

    return res.status(200).send(credentials);
}

async function getCredentialById(req: Request, res: Response) {

    const id: number = +req.params.id;

    const token: string | any = req.headers.authorization?.replace(/Bearer |'/g, '')
    
    const email: string | any = await tokenServices.decodeToken(token)

    const userId: number | any = await tokenServices.findUserId(email)

    const credential = await credentialServices.findOneCredential(id, userId)
    
    return res.status(200).send(credential);
}

async function deleteCredentialById(req: Request, res: Response) {

    const id: number = +req.params.id;

    const token: string | any = req.headers.authorization?.replace(/Bearer |'/g, '')
    
    const email: string | any = await tokenServices.decodeToken(token)

    const userId: number | any = await tokenServices.findUserId(email)

    await credentialServices.removeCredential(id, userId);
    
    return res.sendStatus(202);
}

export {
    postCredential,
    getCredentials,
    getCredentialById,
    deleteCredentialById
}