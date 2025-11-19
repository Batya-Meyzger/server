export let  max=100;
export let min=1;
let number= Math.floor(Math.random() * (max - min + 1)) + min;
export const Meneger={
    password:1234,
    name:"admin",
}

export function updatemin(value:number){
min=value;
}
export function updatemax(value:number){
max=value;
}
export function updateguessnumber(value:number){
number=value;
}

export function newrandomnumber(){
  return  number= Math.floor(Math.random() * (max - min + 1)) + min;
}
export function checkthenumber(guessnumber:number){
    if(guessnumber>number){
        return 1;
    }
    else if(guessnumber<number){
        return -1;
    }
    else{
        return 0;
    }}

