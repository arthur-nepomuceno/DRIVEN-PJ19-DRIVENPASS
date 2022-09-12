import * as usersRepository from '../repositories/usersRepository';
import { passwordEncrypter } from '../utils/passwordEncrypter';
import { passwordComparer } from '../utils/passwordComparer';


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

export {
    checkEmailAtSignUp,
    checkEmailAtLogin,
    checkPasswordAtLogin,
    createUser
}