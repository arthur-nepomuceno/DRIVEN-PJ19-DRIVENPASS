import { userSchema } from "../schemas/userSchema"

function checkUserDataFormat(email: string, password: string){
    const check = userSchema.validate({email, password})
    
    if(check.error) throw {
        type: "invalid_email_or_password", 
        message: "Email must be valid. Password must have at least 10(ten) digits."
    }

    return;
}

function checkEmailAtDataBase(email: string){
    //use a repository to check if email is already in use
}


export {
    checkUserDataFormat,
    checkEmailAtDataBase
}