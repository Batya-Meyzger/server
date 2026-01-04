import app from './app.ts'; 
import http from 'http';


const port =  3000
const server = http.createServer(app);

server.listen(port, () => {
    console.log(`we up in port ${port}`);
});