import * as usersRepository from '../repositories/usersRepository';
import  { passwordEncrypter } from '../utils/passwordEncrypter'

async function checkEmailAtSignUp(email: string){
    
    const register = await usersRepository.getUserByEmail(email);
    
    if(register) throw {
        type: "invalid_email", 
        message: "email already registered."
    }

    return;

}

async function checkEmailAtLogin(email: string){
    
    const register = await usersRepository.getUserByEmail(email);
    
    if(!register) throw {
        type: "invalid_email", 
        message: "email not registered."
    }

    return;

}

async function createUser(email: string, password: string) {
    const secretPassword = passwordEncrypter(password)
    await usersRepository.postUser(email, secretPassword)
}

export {
    checkEmailAtSignUp,
    checkEmailAtLogin,
    createUser
}