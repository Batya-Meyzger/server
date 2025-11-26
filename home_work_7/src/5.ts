import { EventEmitter } from "events";
///A
export class Time extends EventEmitter {
public Num: number=0;
private Max_Number: number;
constructor(max_number: number, startValue: number = 0) { 
    super();
    this.Max_Number = max_number;
    this.Num = startValue;  
}
Tic(): void {
  this.Num++;  
  if (this.Num >= this.Max_Number) {
    this.Num = 0;
    this.emit("reset", this.Num); 
  }
}}

//B
const now = new Date();
const currentHours = now.getHours();
const currentMinutes = now.getMinutes();
const currentSeconds = now.getSeconds();

const Hours = new Time(24, currentHours);
const Minutes = new Time(60, currentMinutes);
const Seconds = new Time(60, currentSeconds);

//c+D

setInterval(() => {
  Seconds.Tic();
  console.log(`${Hours.Num}:${Minutes.Num}:${Seconds.Num}`);

}, 1000);
Seconds.on("reset", () => {
  Minutes.Tic();
});
Minutes.on("reset", () => {
  Hours.Tic();
});


