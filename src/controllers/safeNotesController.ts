import { Request, Response } from 'express';
import { ISafeNoteData, INewNoteData } from '../types/safeNotesTypes';
import * as tokenServices from '../services/tokenServices';
import * as safeNoteServices from '../services/safeNoteServices';

async function postSafeNote(req: Request, res: Response){

    const {title, text}: ISafeNoteData = req.body;

    const token: string | any = req.headers.authorization?.replace(/Bearer |'/g, '')
    
    const email: string | any = await tokenServices.decodeToken(token)

    const userId: number | any = await tokenServices.findUserId(email)

    await safeNoteServices.checkTitleAtDataBase(title, userId);

    const newNote: INewNoteData = {userId, title, text}
    
    await safeNoteServices.createSafeNote(newNote);

    return res.sendStatus(201);
}

export {
    postSafeNote,
}