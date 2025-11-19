
import { updatemax,updatemin,newrandomnumber,checkthenumber } from '../game/gameService';
import express, { Request, Response } from 'express';
import { checkIfNumber } from '../middleware/validateParams';
import { logger } from '../utils/logger';
import {logRequestToFile,logRequest} from '../middleware/loggerRequest'
import { checkIfNumberInRange } from '../middleware/ifinrange';
const router = express.Router();





router.get('/geuss',checkIfNumber, checkIfNumberInRange,(req: Request, res: Response) => {
 const guessnum = Number(req.params.guessnum);
    let num= newrandomnumber();
    const ans =  checkthenumber(guessnum);
     if(ans==1){
      res.json({ message: 'Your guess is too high.' });
       logger.info(`{${req.method}} ${req.url} - Guess number: ${guessnum} is too high compared to ${num}`);
  }
    else if(ans==-1){   
        res.json({ message: 'Your guess is too low.' });
         logger.info(`{${req.method}} ${req.url}- Guess number: ${guessnum} is too low compared to ${num}`);
    }
    else{
        res.json({ message: 'Congratulations! You guessed the correct number.' });
        num= newrandomnumber();
        logger.info(`{${req.method}} ${req.url} - Guess number: ${guessnum} is correct! New number generated: ${num}`);
    }
});


router.get('/newgame',checkIfNumber, (req: Request, res: Response) => {
    let num= newrandomnumber();
    logger.info(`{${req.method}} ${req.url} - New random number generated: ${num}`);
    res.json({ message: 'New game started. Guess a number between 1 and 100.' });
});









export default router;
