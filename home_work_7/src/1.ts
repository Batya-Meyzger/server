import {readFile} from 'node:fs';
console.log("1");
setTimeout(() => { 
    console.log("8"); 
}, 5000); 
console.log("2");
const interval = setInterval(() => { 
    console.log("5");
    console.log("6");
    console.log("7");
    clearInterval(interval);
}, 1000); 
readFile("file.txt","utf8", (txt) => { 
    console.log("4");
});
  console.log("3");
  