"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var readInput = function (filename) { return (0, fs_1.readFileSync)(filename, 'utf-8').split('\n'); };
var calories = readInput('inputs.txt');
var sum = 0;
var elfCalories = [];
for (var _i = 0, calories_1 = calories; _i < calories_1.length; _i++) {
    var calorie = calories_1[_i];
    if (calorie !== '') {
        sum += parseInt(calorie);
    }
    else {
        elfCalories.push(sum);
        sum = 0;
    }
}
elfCalories.sort(function (a, b) { return b - a; });
var topThreeCalories = elfCalories.slice(0, 3);
var sumTopThree = topThreeCalories.reduce(function (a, b) { return a + b; });
console.log(sumTopThree);
