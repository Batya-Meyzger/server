
import fs from 'fs';
import superagent, { Response } from 'superagent';

const write = function (err: any)
{
    if (err) {
        console.log("Failed writing result to file:", err)
    }
    else console.log("Finish to write")
}
const get = function (err: any, res: Response) {
    let answer: string = ""; 
    if (err) {
        console.log(`API request to the url has failed: ${err}`);
    } else {
      
        answer = res.text; 
    }

    fs.writeFile('output.txt', answer.toString(), write);
};

const read = function (err: any, data: Buffer) 
{
    if (err) {
        console.log("Failed reading input data:", err);
        return;
    }
    console.log(data.toString());
    const input = data.toString().split(" ");
    const number = input[0];
  const url = `http://numbersapi.com/${number}`;

   superagent.get(url).end(get);
}
fs.readFile('src/input.txt', read);

