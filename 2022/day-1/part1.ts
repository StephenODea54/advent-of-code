import { readFileSync } from "fs";

const readInput = (filename: string) => readFileSync(filename, 'utf-8').split('\n');

const calories = readInput('inputs.txt');

let sum = 0;
const elfCalories: number[] = [];

for (let calorie of calories) {
    if (calorie !== '') {
        sum += parseInt(calorie);
    } else {
        elfCalories.push(sum);
        sum = 0;
    }
}

console.log(Math.max(...elfCalories));
