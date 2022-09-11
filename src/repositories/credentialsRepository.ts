import { prisma } from "../databases/postgres";
import { INewCredentialData } from '../types/credentialTypes';

async function getUserByEmail(email:string) {
    return await prisma.users.findUnique({where: {email}});
}

async function getTitleByUserId(title: string, userId: number){
    return await prisma.credentials.findFirst({where: {title, userId}});
}

async function getUrlUserByUserIdAndUrl(url: string, urlUser: string, userId: number | any) {
    return await prisma.credentials.findFirst({where: {url, urlUser, userId}});
}

async function postCredential(newCredential: INewCredentialData) {   
    return await prisma.credentials.create({data: newCredential})
}

export {
    getUserByEmail,
    getTitleByUserId,
    getUrlUserByUserIdAndUrl,
    postCredential,
}