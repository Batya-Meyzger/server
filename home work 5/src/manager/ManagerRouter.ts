import express, { Request, Response } from 'express';
import { updatemax, updatemin, newrandomnumber, checkthenumber, Meneger, updateguessnumber } from '../game/gameService';
import { checkIfNumber, validateId } from '../middleware/validateParams';
import { auth, authenticatAdmin, AuthorizatAdmin } from "../middleware/auth";
import { AuthService } from '../utils/Authentication';
const authService = new AuthService();
const router = express.Router();
router.use(authenticatAdmin);
router.use(AuthorizatAdmin);

// router.get('/', validateId, (req: Request, res: Response) => {
//     const password = Number(req.params.password);
//     const name = req.query.name as string;

//     if (password == Meneger.password && name == Meneger.name) {
//         const token = authService.generateToken(name);
//         const flag = authService.verifyToken(token);
//         if (flag) {
//             res.json({ message: 'Authentication successful', token: token });
//         }
//         else {
//             const token = authService.generateToken(name);
//             res.json({ message: 'Authentication successful', token: token });
//         }

//     }
// });

router.put('/min', checkIfNumber, (req: Request, res: Response) => {
    const minvalue = Number(req.params.min);
    updatemin(minvalue);
    res.json({ message: `Minimum value updated to ${minvalue}` });
});

router.put('/max', checkIfNumber, (req: Request, res: Response) => {
    const maxvalue = Number(req.params.max);
    updatemax(maxvalue);
    res.json({ message: `Maximum value updated to ${maxvalue}` });
});
router.put('/guessnumber', checkIfNumber, (req: Request, res: Response) => {
    const guessnumber = Number(req.params.guessnumber);
    updateguessnumber(guessnumber);
    res.json({ message: `the guess number updated to ${guessnumber}` });
});
 

export default router;

