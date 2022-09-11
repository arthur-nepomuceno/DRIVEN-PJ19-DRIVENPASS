import bcrypt from 'bcrypt';

export function passwordComparer(password: string, hash: string | any){
    return bcrypt.compareSync(password, hash);
}