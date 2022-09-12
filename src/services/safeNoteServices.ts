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

async function findAllSafeNotes(userId: number) {
    return await safeNotesRepository.getAllSafeNotesByUserId(userId);
}

async function findOneSafeNote(id: number, userId: number) {
    
    const register = await safeNotesRepository.getSafeNoteById(id, userId);

    if(!register) throw {
        type: 'invalid_safeNote_id',
        message: 'the safe note id you are looking for does not belong to you or does not exists.'
    }

    return register;

}

async function removeSafeNote(id: number, userId: number) {
    
    const register = await safeNotesRepository.getSafeNoteById(id, userId);

    if(!register) throw {
        type: 'invalid_safeNote_id',
        message: 'the safe note id you are looking for does not belong to you or does not exists.'
    }

    await safeNotesRepository.deleteSafeNoteById(id);

    return;

}

export {
    checkTitleAtDataBase,
    createSafeNote,
    findAllSafeNotes,
    findOneSafeNote,
    removeSafeNote
}