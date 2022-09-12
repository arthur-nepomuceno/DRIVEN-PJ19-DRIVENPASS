import { Router } from "express";
import { dataValidator } from "../middlewares/validatorMiddleware";
import { wifiSchema } from "../schemas/wifiSchema";
import * as wifiControllers from "../controllers/wifiController";

const wifiRouter = Router();

const { postWifi, 
        getWifies, 
        getWifiById, 
        deleteWifiById } = wifiControllers;

wifiRouter.post('/new-wifi', dataValidator(wifiSchema), postWifi);
wifiRouter.get('/wifies', getWifies)
wifiRouter.get('/wifi/:id', getWifiById)
wifiRouter.delete('/wifi/:id', deleteWifiById)

export default wifiRouter;