import { Request, Response } from 'express';
import { ICredentialData } from '../types/credentialTypes';
import * as credentialServices from '../services/credentialServices'

async function postCredential(req: Request, res: Response){
    const {title, url, urlUser, urlPassword}: ICredentialData = req.body;
    return res.sendStatus(201);
}

export {
    postCredential
}