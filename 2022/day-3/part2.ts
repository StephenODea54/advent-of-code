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

// Function to Calculate the Intersection of Three Strings
const intersection = (str1: string, str2: string, str3: string) => {
    const inAll = str1.split('')
        .filter(char => str2.includes(char))
        .filter(char => str3.includes(char))
        .filter((e, i, c) => c.indexOf(e) === i);
    
    return inAll.toString();
}

const calculatePriority = (data: string[]) => {
    let priority = 0;

    const alphabetArr = 'abcdefghijklmnopqrstuvwxyz'.split('');
    const charMap = createCharMap(alphabetArr);

    for (let i = 0; i < data.length; i += 3) {
        const badgeItemType = intersection(data[i], data[i+1], data[i+2]);
        priority += charMap[badgeItemType];
    }

    console.log(`The sum of the priorities is ${priority}!`);
}

calculatePriority(RSContents);
