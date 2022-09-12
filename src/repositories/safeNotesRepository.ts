import { prisma } from "../databases/postgres";
import { INewNoteData } from '../types/safeNotesTypes';

async function getTitleByUserId(title: string, userId: number){
    return await prisma.safeNotes.findFirst({where: {title, userId}});
}

async function postSafeNote(newNote: INewNoteData) {   
    return await prisma.safeNotes.create({data: newNote})
}

async function getAllSafeNotesByUserId(userId: number) {
    return await prisma.safeNotes.findMany({where: {userId}})
}

async function getSafeNoteById(id: number, userId: number) {
    return await prisma.safeNotes.findFirst({where: {id, userId}})
}

async function deleteSafeNoteById(id: number) {
    return await prisma.safeNotes.delete({where: {id}})
}

export {
    getTitleByUserId,
    postSafeNote,
    getAllSafeNotesByUserId,
    getSafeNoteById,
    deleteSafeNoteById
}