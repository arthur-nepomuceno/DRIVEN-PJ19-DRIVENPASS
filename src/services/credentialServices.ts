import { INewCredentialData } from '../types/credentialTypes';
import * as credentialsRepository from '../repositories/credentialsRepository'
import Cryptr from 'cryptr';
import dotenv from 'dotenv';
dotenv.config()

async function findUserId(email: string | any){
    const register = await credentialsRepository.getUserByEmail(email);
    return register?.id;
}

async function checkTitleAtDataBase(title: string, userId: number | any){

    const check = await credentialsRepository.getTitleByUserId(title, userId)

    if(check) throw {
        type: 'invalid_title',
        message: 'this title is already in use for this user`s credential.'
    }

    return check;
}

async function checkUrlUserAtDataBase(url: string, urlUser: string, userId: number | any) {
    
    const check = await credentialsRepository.getUrlUserByUserIdAndUrl(url, urlUser, userId);
    
    if(check) throw {
        type: 'invalid_urlUser',
        message: 'the user name you are trying to register already exists at this url for this user.'
    }
    
    return;
}

function hideCredentialPassword(password: string){
    const SECRET_KEY: string | any = process.env.CRYPTR_SECRET
    const cryptr = new Cryptr(SECRET_KEY);
    return cryptr.encrypt(password);
}

async function createCredential(newCredential: INewCredentialData) {
    return await credentialsRepository.postCredential(newCredential);
}

async function findAllCredentials(userId: number) {
    return;
}

export {
    findUserId,
    checkTitleAtDataBase,
    checkUrlUserAtDataBase,
    hideCredentialPassword,
    createCredential,
    findAllCredentials
}