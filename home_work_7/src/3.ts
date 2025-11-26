
import {promises} from 'fs';
function sleep(M:number) {
    return new Promise((resolve) => {
        setTimeout(resolve, M);
    });
}
console.log("Before sleep:", new Date().toLocaleTimeString());

sleep(3000).then(() => {
    console.log("After sleep:", new Date().toLocaleTimeString());
});

