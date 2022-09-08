import {Request, Response, NextFunction} from 'express';

function errorHandler(error: any, req: Request, res: Response, next: NextFunction){

    if(error.type === 'invalid_email_or_password') return res.status(500).send(error.message)

    return res.status(500).send(`Unexpected server error: ${error}`)
}

export {
    errorHandler
}