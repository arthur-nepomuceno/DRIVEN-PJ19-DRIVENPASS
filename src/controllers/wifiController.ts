import { Request, Response } from 'express';
import { IWifiData, INewWifiData } from '../types/wifiTypes';
import * as wifiServices from '../services/wifiServices';
import * as tokenServices from '../services/tokenServices';

async function postWifi(req: Request, res: Response){

    const {title, name, password}: IWifiData = req.body;
    
    const token: string | any = req.headers.authorization?.replace(/Bearer |'/g, '')
    
    const email: string | any = await tokenServices.decodeToken(token)

    const userId: number | any = await tokenServices.findUserId(email)
    
    await wifiServices.checkTitleAtDataBase(title, userId)
    
    const secretPassword: string = wifiServices.hideWifiPassword(password);
    const newWifi: INewWifiData = {
        userId, 
        title, 
        name, 
        password: secretPassword
    };
    
    await wifiServices.createWifi(newWifi);
 
    return res.sendStatus(201);
}

async function getWifies(req: Request, res: Response) {

    const token: string | any = req.headers.authorization?.replace(/Bearer |'/g, '')
    
    const email: string | any = await tokenServices.decodeToken(token)

    const userId: number | any = await tokenServices.findUserId(email)

    const wifies = await wifiServices.findAllWifies(userId)

    return res.status(200).send(wifies);
}

async function getWifiById(req: Request, res: Response) {

    const id: number = +req.params.id;

    const token: string | any = req.headers.authorization?.replace(/Bearer |'/g, '')
    
    const email: string | any = await tokenServices.decodeToken(token)

    const userId: number | any = await tokenServices.findUserId(email)

    const wifi = await wifiServices.findOneWifi(id, userId)
    
    return res.status(200).send(wifi);
}

async function deleteWifiById(req: Request, res: Response) {

    const id: number = +req.params.id;

    const token: string | any = req.headers.authorization?.replace(/Bearer |'/g, '')
    
    const email: string | any = await tokenServices.decodeToken(token)

    const userId: number | any = await tokenServices.findUserId(email)

    await wifiServices.removeWifi(id, userId);
    
    return res.sendStatus(202);
}

export {
    postWifi,
    getWifies,
    getWifiById,
    deleteWifiById
}