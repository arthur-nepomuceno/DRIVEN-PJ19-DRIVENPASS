import { INewCredentialData } from '../types/credentialTypes';
import * as credentialsRepository from '../repositories/credentialsRepository'
import Cryptr from 'cryptr';
import dotenv from 'dotenv';
dotenv.config()

function hideCredentialPassword(password: string){
    const SECRET_KEY: string | any = process.env.CRYPTR_SECRET
    const cryptr = new Cryptr(SECRET_KEY);
    return cryptr.encrypt(password);
}

function showCredentialPassword(password: string){
    const SECRET_KEY: string | any = process.env.CRYPTR_SECRET
    const cryptr = new Cryptr(SECRET_KEY);
    return cryptr.decrypt(password);
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

async function createCredential(newCredential: INewCredentialData) {
    return await credentialsRepository.postCredential(newCredential);
}

async function findAllCredentials(userId: number) {
    const registers = await credentialsRepository.getAllCredentialsByUserId(userId);
    
    return registers.map(element => {
        const {id, userId, title, url, urlUser, urlPassword} = element;

        const truePassword = showCredentialPassword(urlPassword);
        
        return {id, userId, title, url, urlUser, urlPassword: truePassword};
    })
}

async function findOneCredential(id: number, userId: number) {
    
    const register = await credentialsRepository.getCredentialById(id, userId);

    if(!register) throw {
        type: 'invalid_credential_id',
        message: 'the credential id you are looking for does not belong to you or does not exists.'
    }

    const {title, url, urlUser, urlPassword} = register;
    
    const truePassword = showCredentialPassword(urlPassword);

    return {id, userId, title, url, urlUser, urlPassword: truePassword};

}

export {
    hideCredentialPassword,
    checkTitleAtDataBase,
    checkUrlUserAtDataBase,
    createCredential,
    findAllCredentials,
    findOneCredential,
}