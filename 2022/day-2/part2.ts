import readInput from "../functions/readInput";

const moves = readInput('inputs.txt');

interface OutcomeScores {
    [key: string]: number;
}

interface OutcomeTypes {
    [key: string]: OutcomeScores;
}

const outcomes: OutcomeTypes = {
    'X': {
        'A': 3,
        'B': 1,
        'C': 2
    },
    'Y': {
        'A': 4,
        'B': 5,
        'C': 6
    },
    'Z': {
        'A': 8,
        'B': 9,
        'C': 7
    }
}

const calculateScore = (data: string[]) => {
    let score = 0;

    data.forEach(round => {

        const result = round[2];
        const elfChoice = round[0];

        score += outcomes[result][elfChoice];
    })

    console.log(`Your score is ${score}!`);
}

calculateScore(moves);
