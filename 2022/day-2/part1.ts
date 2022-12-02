import readInput from "../functions/readInput";

/* 😡😡😡😡😡😡😡😡😡😡😡😡😡😡😡😡😡😡
   
   Apparently JS handles negative modulos incorrectly..
   https://jsperf.app/negative-modulo/2

   Below is a function that fixes this
*/

const moves = readInput('inputs.txt');

const mod = (n: number, m: number) => {
    return ((n % m) + m) % m;
}

interface RPSValueProps {
    [key: string]: number;
}

const RPSValues: RPSValueProps = {
    'A': 0,
    'X': 0,
    'B': 1,
    'Y': 1,
    'C': 2,
    'Z': 2
}

interface scoreOutcomeProps {
    [key: number]: number;
}

const scoreOutcomes = {
    0: 3,
    1: 0,
    2: 6
}

type scoreKey = keyof typeof scoreOutcomes;

const calculateScore = (data: string[]) => {

    let score = 0;

    data.forEach(round => {
        const elfChoice = round[0];
        const userChoice = round[2];

        const elfChoiceNum = RPSValues[elfChoice];
        const userChoiceNum = RPSValues[userChoice];

        const result = mod(elfChoiceNum - userChoiceNum, 3) as scoreKey;

        //const result = (elfChoiceNum - userChoiceNum) % 3 as scoreKey;

        score += (userChoiceNum + 1) + scoreOutcomes[result];
    });

    console.log(`Your score is ${score}!`);
}

calculateScore(moves);
