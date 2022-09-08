import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const server = express();
server.use(cors(), json());

const PORT: number = Number(process.env.PORT) || 5000;

server.listen(PORT, () => {console.log(`Server running on port ${PORT}.`)})