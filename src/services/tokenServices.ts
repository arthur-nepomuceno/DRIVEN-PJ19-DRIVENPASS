import { prisma } from '../databases/postgres';
import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config()

async function createToken(email: string) {
    const SECRET_KEY: string | any = process.env.JWT_SECRET;
    return jsonwebtoken.sign(email, SECRET_KEY)
}

async function decodeToken(token: string){
    const SECRET_KEY: string | any = process.env.JWT_SECRET;
    const decode = jsonwebtoken.verify(token, SECRET_KEY);
    return decode; 
}

async function findUserId(email: string | any){
    const register = await prisma.users.findUnique({where: {email}})
    return register?.id;
}

export {
    createToken,
    decodeToken,
    findUserId
}