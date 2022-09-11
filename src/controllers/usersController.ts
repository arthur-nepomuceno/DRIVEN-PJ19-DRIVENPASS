import { Request, Response } from "express";
import { IUserData } from '../types/userTypes';
import * as userServices from "../services/userServices";

export async function signUp(req: Request, res: Response){
    const {email, password}: IUserData = req.body;

    await userServices.checkEmailAtSignUp(email);
    await userServices.createUser(email, password);

    return res.sendStatus(201);
}

export async function login(req: Request, res: Response){
    const {email, password}: IUserData = req.body;

    await userServices.checkEmailAtLogin(email);
    await userServices.checkPasswordAtLogin(email, password);
    const token = await userServices.createToken(email);

    return res.status(200).send({token});
}