import { Request, Response } from "express";
import * as userServices from "../services/userServices";

export async function signUp(req: Request, res: Response){
    const {email, password} = req.body;

    await userServices.checkEmailAtSignUp(email);
    await userServices.createUser(email, password);

    return res.sendStatus(201);
}

export async function login(req: Request, res: Response){
    return;
}