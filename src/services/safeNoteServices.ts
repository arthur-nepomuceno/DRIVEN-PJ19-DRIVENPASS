import { INewNoteData } from '../types/safeNotesTypes';
import * as safeNotesRepository from '../repositories/safeNotesRepository'

async function checkTitleAtDataBase(title: string, userId: number | any){

    const check = await safeNotesRepository.getTitleByUserId(title, userId)

    if(check) throw {
        type: 'invalid_title',
        message: 'this title is already in use for this user`s credential.'
    }

    return check;
}

async function createSafeNote(newNote: INewNoteData) {
    return await safeNotesRepository.postSafeNote(newNote);
}

export {
    checkTitleAtDataBase,
    createSafeNote,
}