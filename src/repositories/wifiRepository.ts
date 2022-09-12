import { prisma } from "../databases/postgres";
import { INewWifiData } from '../types/wifiTypes';

async function getTitleByUserId(title: string, userId: number){
    return await prisma.wifies.findFirst({where: {title, userId}});
}

async function postWifi(newWifi: INewWifiData) {   
    return await prisma.wifies.create({data: newWifi})
}

async function getAllWifiesByUserId(userId: number) {
    return await prisma.wifies.findMany({where: {userId}})
}

async function getWifiById(id: number, userId: number) {
    return await prisma.wifies.findFirst({where: {id, userId}})
}

async function deleteWifiById(id: number) {
    return await prisma.wifies.delete({where: {id}})
}

export {
    getTitleByUserId,
    postWifi,
    getAllWifiesByUserId,
    getWifiById,
    deleteWifiById
}