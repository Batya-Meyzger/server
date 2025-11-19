import express from "express";
import gameRouter from "./game/gameRouter";
import MenegerRouter from "./manager/ManagerRouter";
import { logRequestToFile } from "./middleware/loggerRequest";
import { errorHandler } from "./middleware/errorHandler";
import { updatemax,updatemin,newrandomnumber,checkthenumber ,Meneger} from './game/gameService';
import { AuthService } from "./utils/Authentication";

const authService = new AuthService();
const app = express();

app.use(express.json());
app.use(logRequestToFile);

app.get("/login", (req, res) => {
  const { username, password } = req.body;
  const token = authService.generateToken(username);
  if (username === "admin" && password === "password")
    res.json({ token });
  else
  res.status(401).json({ error: "Invalid credentials" });
});

app.use("/game", gameRouter);
app.use("/manager", MenegerRouter); 
app.use(errorHandler);

export default app;
