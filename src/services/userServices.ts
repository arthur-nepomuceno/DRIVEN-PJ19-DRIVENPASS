import * as usersRepository from '../repositories/usersRepository';
import { passwordEncrypter } from '../utils/passwordEncrypter';
import { passwordComparer } from '../utils/passwordComparer';
import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config()

//signup
async function checkEmailAtSignUp(email: string){
    
    const register = await usersRepository.getUserByEmail(email);
    
    if(register) throw {
        type: "invalid_email", 
        message: "email already registered."
    }

    return;

}

async function createUser(email: string, password: string) {
    const secretPassword = passwordEncrypter(password)
    await usersRepository.postUser(email, secretPassword)
}

//login
async function checkEmailAtLogin(email: string){
    
    const register = await usersRepository.getUserByEmail(email);
    
    if(!register) throw {
        type: "invalid_email", 
        message: "email not registered."
    }

    return;

}

async function checkPasswordAtLogin(email: string, password: string){
    
    const register = await usersRepository.getUserByEmail(email);
    
    const checkPassword = passwordComparer(password, register?.password);

    if(!checkPassword) throw {
        type: 'invalid_password',
        message: 'invalid password.'
    }

    return;
}

async function createToken(email: string) {
    const SECRET_KEY: string | any = process.env.JWT_SECRET;
    return jsonwebtoken.sign(email, SECRET_KEY)
}

export {
    checkEmailAtSignUp,
    checkEmailAtLogin,
    checkPasswordAtLogin,
    createUser,
    createToken
}