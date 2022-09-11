import { Request, Response } from 'express';
import { ICredentialData, INewCredentialData } from '../types/credentialTypes';
import * as credentialServices from '../services/credentialServices';
import * as tokenServices from '../services/tokenServices'

async function postCredential(req: Request, res: Response){
    //get cretendials info from body
    //get token from headers
    //a service to decode token
    //a service to get user's id by it's email
    //a service to check if title is unique for this user
    //a service to check if urlUser is unique for this url and this user
    //a service to encrypt the password
    //a service to register the credential at data base


    const {title, url, urlUser, urlPassword}: ICredentialData = req.body;
    
    const token: string | any = req.headers.authorization?.replace(/Bearer |'/g, '')
    
    const email: string | any = await tokenServices.decodeToken(token)

    const userId: number | any = await credentialServices.findUserId(email)
    
    await credentialServices.checkTitleAtDataBase(title, userId)
    
    await credentialServices.checkUrlUserAtDataBase(url, urlUser, userId)
    
    const secret: string = credentialServices.hideCredentialPassword(urlPassword)
    const newCredential: INewCredentialData = {userId, title, url, urlUser, urlPassword: secret};
    
    await credentialServices.createCredential(newCredential)
 
    return res.sendStatus(201);
}

async function getCredentials(req: Request, res: Response) {
    return;
}

export {
    postCredential,
    getCredentials
}