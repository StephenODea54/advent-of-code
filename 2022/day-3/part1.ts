import readInput from "../functions/readInput";

interface CharMapProps {
    [key: string]: number;
}

// Read input
const RSContents = readInput('inputs.txt');

// Function to Create Character Map
const createCharMap = (arr: string[]) => {
    const charMap: CharMapProps = {};

    arr.forEach((char, index) => {
        charMap[char] = index + 1;
        charMap[char.toUpperCase()] = index + 27;
    });

    return charMap;
}

// Function to keep strings only shared by two strings
const intersection = (str1: string, str2: string) => {
    const inBoth = str1.split('')
        .filter(char => str2.includes(char))
        .filter((e, i, c) => c.indexOf(e) === i);
    
    return inBoth.toString();
}

// Main Function
const calculatePriority = (data: string[]) => {
    const alphabetArr = 'abcdefghijklmnopqrstuvwxyz'.split('');
    const charMap = createCharMap(alphabetArr);

    let priority = 0;

    data.forEach(rucksack => {
        const midPoint = (rucksack.length / 2);
        const LHS = rucksack.slice(0, midPoint);
        const RHS = rucksack.slice(midPoint);

        const commonChar = intersection(LHS, RHS);

        priority += charMap[commonChar];
    });

    console.log(`The sum of the priorities is ${priority}!`);
}

calculatePriority(RSContents);
