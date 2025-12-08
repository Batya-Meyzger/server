import express, { Request, Response }  from 'express';
import { userrouter } from './users/userRouter';
import { bookrouter} from './book/bookRouter';
import { borrowrouter } from './borrow/borrowRouter';



import {myDB} from './myDB';
const app = express();

app.use(express.json());
myDB.getDB();

 app.use('/users', userrouter);
 app.use('/books', bookrouter);
 app.use('/borrow', borrowrouter);

app.use((err: Error, req: Request , res: Response, next: any) => {
    res.status(500).send(err);
});

export default app;