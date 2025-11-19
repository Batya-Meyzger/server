import winston from "winston";
import path from "path";
const now = new Date();
const year = now.getFullYear();            
const monthNum = String(now.getMonth() + 1).padStart(2, "0"); 
const month = `${year}-${monthNum}`;  
const logFileName = path.join("logs", `app-${month}.log`);



export const logger = winston.createLogger({
  level: 'debug',
  //error, worning, info, debug.
  format: winston.format.combine(
    winston.format.timestamp({ format: 'DD/MM/YYYY HH:mm:ss' }),
    winston.format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level.toUpperCase()}${level =='error'? '!': ':)'}: ${message}`;
    })
  ),

  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/errors.log', level: 'error' }),
    new winston.transports.File({ filename: logFileName }),//logs/app.log
  ],
});
