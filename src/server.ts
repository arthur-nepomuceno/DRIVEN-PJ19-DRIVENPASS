import express, { json } from 'express';
import 'express-async-errors';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routers/router';
import { errorHandler } from './middlewares/errorMiddleware';

dotenv.config();

const server = express();
server.use(cors(), json());
server.use(router);
server.use(errorHandler)

const PORT: number = Number(process.env.PORT) || 5000;

server.listen(PORT, () => {console.log(`Server running on port ${PORT}.`)})