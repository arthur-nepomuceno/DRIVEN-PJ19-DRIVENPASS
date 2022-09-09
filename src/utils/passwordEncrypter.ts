import bcrypt from 'bcrypt';

export function passwordEncrypter(password: string){
    return bcrypt.hashSync(password, 11);
}