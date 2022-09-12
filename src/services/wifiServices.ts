import { INewWifiData } from '../types/wifiTypes';
import * as wifiRepository from '../repositories/wifiRepository'
import Cryptr from 'cryptr';
import dotenv from 'dotenv';
dotenv.config()

function hideWifiPassword(password: string | any){
    const SECRET_KEY: string | any = process.env.CRYPTR_SECRET
    const cryptr = new Cryptr(SECRET_KEY);
    return cryptr.encrypt(password);
}

function showWifiPassword(password: string){
    const SECRET_KEY: string | any = process.env.CRYPTR_SECRET
    const cryptr = new Cryptr(SECRET_KEY);
    return cryptr.decrypt(password);
}

async function checkTitleAtDataBase(title: string, userId: number | any){

    const check = await wifiRepository.getTitleByUserId(title, userId)

    if(check) throw {
        type: 'invalid_title',
        message: 'this title is already in use for this user`s wifi.'
    }

    return check;
}

async function createWifi(newwifi: INewWifiData) {
    return await wifiRepository.postWifi(newwifi);
}

async function findAllWifies(userId: number) {
    const registers = await wifiRepository.getAllWifiesByUserId(userId);
    
    return registers.map(element => {
        const {id, userId, title, name, password} = element;

        const truePassword = showWifiPassword(password);
        
        return {id, userId, title, name, password: truePassword};
    })
}

async function findOneWifi(id: number, userId: number) {
    
    const register = await wifiRepository.getWifiById(id, userId);

    if(!register) throw {
        type: 'invalid_wifi_id',
        message: 'the wifi id you are looking for does not belong to you or does not exists.'
    }
    
    const {title, name, password} = register;

    const truePassword = showWifiPassword(password);
    
    return {id, userId, title, name, password: truePassword};

}

async function removeWifi(id: number, userId: number) {
    
    const register = await wifiRepository.getWifiById(id, userId);

    if(!register) throw {
        type: 'invalid_wifi_id',
        message: 'the wifi id you are looking for does not belong to you or does not exists.'
    }

    await wifiRepository.deleteWifiById(id);

    return;

}

export {
    hideWifiPassword,
    showWifiPassword,
    checkTitleAtDataBase,
    createWifi,
    findAllWifies,
    findOneWifi,
    removeWifi
}