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

async function getSafeNotes(req: Request, res: Response) {

    const token: string | any = req.headers.authorization?.replace(/Bearer |'/g, '')
    
    const email: string | any = await tokenServices.decodeToken(token)

    const userId: number | any = await tokenServices.findUserId(email)

    const safeNotes = await safeNoteServices.findAllSafeNotes(userId)

    return res.status(200).send(safeNotes);
    
}

async function getSafeNoteById(req: Request, res: Response) {

    const id: number = +req.params.id;
    
    const token: string | any = req.headers.authorization?.replace(/Bearer |'/g, '')
    
    const email: string | any = await tokenServices.decodeToken(token)

    const userId: number | any = await tokenServices.findUserId(email)

    const safeNotes = await safeNoteServices.findOneSafeNote(id, userId)

    return res.status(200).send(safeNotes);
}

async function deleteSafeNoteById(req: Request, res: Response) {
    const id: number = +req.params.id;

    const token: string | any = req.headers.authorization?.replace(/Bearer |'/g, '')
    
    const email: string | any = await tokenServices.decodeToken(token)

    const userId: number | any = await tokenServices.findUserId(email)

    await safeNoteServices.removeSafeNote(id, userId);
    
    return res.sendStatus(202);
}

export {
    postSafeNote,
    getSafeNotes,
    getSafeNoteById,
    deleteSafeNoteById
}