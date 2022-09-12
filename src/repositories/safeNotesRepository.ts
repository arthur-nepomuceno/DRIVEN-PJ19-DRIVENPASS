import { prisma } from "../databases/postgres";
import { INewNoteData } from '../types/safeNotesTypes';

async function getTitleByUserId(title: string, userId: number){
    return await prisma.safeNotes.findFirst({where: {title, userId}});
}

async function postSafeNote(newNote: INewNoteData) {   
    return await prisma.safeNotes.create({data: newNote})
}

export {
    getTitleByUserId,
    postSafeNote,
}