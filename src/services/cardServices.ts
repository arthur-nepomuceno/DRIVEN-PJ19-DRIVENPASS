import { INewCardData } from '../types/cardTypes';
import * as cardsRepository from '../repositories/cardsRepository'
import Cryptr from 'cryptr';
import dotenv from 'dotenv';
dotenv.config()

function hideCardPassword(password: string | any){
    const SECRET_KEY: string | any = process.env.CRYPTR_SECRET
    const cryptr = new Cryptr(SECRET_KEY);
    return cryptr.encrypt(password);
}

function hideCardCvc(cvc: string){
    const SECRET_KEY: string | any = process.env.CRYPTR_SECRET
    const cryptr = new Cryptr(SECRET_KEY);
    return cryptr.encrypt(cvc);
}

function showCardPassword(password: string){
    const SECRET_KEY: string | any = process.env.CRYPTR_SECRET
    const cryptr = new Cryptr(SECRET_KEY);
    return cryptr.decrypt(password);
}

function showCardCvc(cvc: string){
    const SECRET_KEY: string | any = process.env.CRYPTR_SECRET
    const cryptr = new Cryptr(SECRET_KEY);
    return cryptr.decrypt(cvc);
}

async function checkTitleAtDataBase(title: string, userId: number | any){

    const check = await cardsRepository.getTitleByUserId(title, userId)

    if(check) throw {
        type: 'invalid_title',
        message: 'this title is already in use for this user`s card.'
    }

    return check;
}

async function createCard(newcard: INewCardData) {
    return await cardsRepository.postCard(newcard);
}

async function findAllCards(userId: number) {
    const registers = await cardsRepository.getAllCardsByUserId(userId);
    
    return registers.map(element => {
        const {id, userId, title, number, name, cvc, expireIn, password, isVirtual, type} = element;

        const truePassword = showCardPassword(password);
        const trueCvc = showCardCvc(cvc);
        
        return {id, userId, title, number, name, cvc: trueCvc, expireIn, password: truePassword, isVirtual, type};
    })
}

async function findOneCard(id: number, userId: number) {
    
    const register = await cardsRepository.getCardById(id, userId);

    if(!register) throw {
        type: 'invalid_card_id',
        message: 'the card id you are looking for does not belong to you or does not exists.'
    }
    
    const {title, number, name, cvc, expireIn, password, isVirtual, type} = register;

    const truePassword = showCardPassword(password);
    const trueCvc = showCardCvc(cvc);
    
    return {id, userId, title, number, name, cvc: trueCvc, expireIn, password: truePassword, isVirtual, type};

}

async function removeCard(id: number, userId: number) {
    
    const register = await cardsRepository.getCardById(id, userId);

    if(!register) throw {
        type: 'invalid_card_id',
        message: 'the card id you are looking for does not belong to you or does not exists.'
    }

    await cardsRepository.deleteCardById(id);

    return;

}

export {
    hideCardPassword,
    hideCardCvc,
    showCardPassword,
    showCardCvc,
    checkTitleAtDataBase,
    createCard,
    findAllCards,
    findOneCard,
    removeCard
}