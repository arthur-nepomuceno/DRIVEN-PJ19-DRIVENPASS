import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config()

async function createToken(email: string) {
    const SECRET_KEY: string | any = process.env.JWT_SECRET;
    return jsonwebtoken.sign(email, SECRET_KEY)
}

async function decodeToken(token: string){
    const SECRET_KEY: string | any = process.env.JWT_SECRET;
    return jsonwebtoken.verify(token, SECRET_KEY);
}

export {
    createToken,
    decodeToken
}