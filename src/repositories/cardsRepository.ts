import { prisma } from "../databases/postgres";
import { INewCardData } from '../types/cardTypes';

async function getTitleByUserId(title: string, userId: number){
    return await prisma.cards.findFirst({where: {title, userId}});
}

async function postCard(newCard: INewCardData) {   
    return await prisma.cards.create({data: newCard})
}

async function getAllCardsByUserId(userId: number) {
    return await prisma.cards.findMany({where: {userId}})
}

async function getCardById(id: number, userId: number) {
    return await prisma.cards.findFirst({where: {id, userId}})
}

async function deleteCardById(id: number) {
    return await prisma.cards.delete({where: {id}})
}

export {
    getTitleByUserId,
    postCard,
    getAllCardsByUserId,
    getCardById,
    deleteCardById
}