import type { Request, Response }  from 'express';
import dotenv from 'dotenv';
dotenv.config();
import  express from 'express';
import { identificationRouter } from './Routers/Identification/identificationRouter.ts';
import { teacherRouter } from './Routers/Teacher/teacherRouter.ts'; 
import { studentRouter } from './Routers/Student/studentRouter.ts';
import { logRequestToFile } from './Middlewares/loggerMid.ts';  
import { errorHandler } from './Middlewares/errorHendling.ts';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = express();
app.use(cors());
app.use(express.json());


app.use('/identify', identificationRouter);
app.use('/teacher', teacherRouter);
app.use('/student', studentRouter);



app.use(express.static(path.join(__dirname, '..', 'public')));
app.get(/^(?!\/api).+/, (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});








import {myDB} from './Utils.ts/ConnectDB.ts';
myDB.getDB();

app.use(errorHandler);


export default app;