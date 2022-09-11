import {Request, Response, NextFunction} from 'express';

function errorHandler(error: Error | any, req: Request, res: Response, next: NextFunction){
    console.log(error);
    
    if(error.type === 'invalid_email') return res.status(409).send(error.message);
    if(error.type === 'invalid_password') return res.status(409).send(error.message);

    return res.status(500).send(`Unexpected server error: ${error}`)
}

export {
    errorHandler
}