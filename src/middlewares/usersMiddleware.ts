import {Request, Response, NextFunction} from 'express';
import * as userServices from '../services/userServices';

function checkUserData(req: Request, res: Response, next: NextFunction){
    const {email, password} = req.body;

    userServices.checkUserDataFormat(email, password);
    userServices.checkEmailAtDataBase(email);
    
    return res.sendStatus(200)

}

export {
    checkUserData
}