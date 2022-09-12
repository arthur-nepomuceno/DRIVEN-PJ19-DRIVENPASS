import { prisma } from "../databases/postgres";
import { INewCredentialData } from '../types/credentialTypes';

async function getTitleByUserId(title: string, userId: number){
    return await prisma.credentials.findFirst({where: {title, userId}});
}

async function getUrlUserByUserIdAndUrl(url: string, urlUser: string, userId: number | any) {
    return await prisma.credentials.findFirst({where: {url, urlUser, userId}});
}

async function postCredential(newCredential: INewCredentialData) {   
    return await prisma.credentials.create({data: newCredential})
}

async function getAllCredentialsByUserId(userId: number) {
    return await prisma.credentials.findMany({where: {userId}})
}

async function getCredentialById(id: number, userId: number) {
    return await prisma.credentials.findFirst({where: {id, userId}})
}

export {
    getTitleByUserId,
    getUrlUserByUserIdAndUrl,
    postCredential,
    getAllCredentialsByUserId,
    getCredentialById
}