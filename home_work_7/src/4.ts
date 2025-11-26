import { promises } from "fs";
async function readFileAsync(filePath: string): Promise<string> {
    const content = await promises.readFile(filePath, 'utf8');
        console.log("File content:", content);
    return content;
} 
async function readall(){
for (let i=1;i<=5;i++) {
   await readFileAsync(`files\\${i}.txt`).then(() => console.log("finish reading",i) );
   }
}
readall();
