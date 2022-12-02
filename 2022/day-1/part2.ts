import readInput from "../functions/readInput";

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

elfCalories.sort((a, b) => b - a);

const topThreeCalories = elfCalories.slice(0,3);
const sumTopThree = topThreeCalories.reduce((a, b) => a + b);

console.log(sumTopThree);
