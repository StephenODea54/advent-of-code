import { Console } from "console";
import readInput from "../functions/readInput";

const crates = readInput('inputs.txt');

/*
Split input into an array that contains the original arrangements and
one that contains the rearrangement procedures
*/
const splitArr = (data: string[]) => {
    // The original arrangements and the rearrangement procedures are separated by a blank
    const blankLineIndex = data.indexOf('');

    const startingStack = data.slice(0, blankLineIndex - 1);
    const instructions = data.slice(blankLineIndex + 1);

    return { startingStack, instructions };
}

/*/
Next, we need a function that will decompose the array such that there are
no nested arrays inside of it
*/
const decompose = (arr: string[]) => {
    const indvArr: string[] = [];

    arr.forEach(row => {
        for (let i = 1; i < row.length; i += 4) {
            indvArr.push(row[i]);
        }
    });

    return indvArr;
}

// Create an array where each row (current height of each stack) is in it's own array
const groupElements = (arr: string[]) => {
    const groupedArr: string[][] = [];

    for (let i = 0; i < arr.length; i += 9) {
        groupedArr.push(arr.slice(i, i + 9));
    }

    return groupedArr;
}

/*
Now we are able to transpose the array.....
I miss NumPy
*/
const transpose = (arr: string[][]) => {
    const arrTransposed = arr[arr.length - 1]
        .map((_, colIndex) => arr
        .map(row => row[colIndex])
        .reverse()); // Element will be backwards from what is desired
    
    // Remove Blank Spaces
    const arrCleaned: string[][] = [];

    arrTransposed.forEach(row => {
        const rowCleaned = row.filter(crate => crate !== ' ');
        arrCleaned.push(rowCleaned);
    });

    return arrCleaned;
};

// Function to rearrange the crate using the CrateMover 9000
const rearrangeCrates = (crates: string[][], instructions: string[]) => {
    instructions.forEach(instruction => {
        const fromIndex = instruction.indexOf('from');
        const toIndex = instruction.indexOf('to');

        const numCratesToMove = parseInt(instruction.slice(5, fromIndex - 1));
        const stackToMoveFrom = parseInt(instruction.slice(fromIndex + 5, toIndex - 1)) - 1;
        const stackToMoveTo = parseInt(instruction.slice(toIndex + 3)) - 1;

        for (let _ = 0; _ < numCratesToMove; _++) {
            const crateToMove = crates[stackToMoveFrom].pop();
            crates[stackToMoveTo].push(crateToMove!)
        }
    });

    return crates;
}

// Function to rearrange crates
const rearrangeCratesMultiple = (crates: string[][], instructions: string[]) => {
    instructions.forEach(instruction => {
        const fromIndex = instruction.indexOf('from');
        const toIndex = instruction.indexOf('to');

        const numCratesToMove = parseInt(instruction.slice(5, fromIndex - 1));
        const stackToMoveFrom = parseInt(instruction.slice(fromIndex + 5, toIndex - 1)) - 1;
        const stackToMoveTo = parseInt(instruction.slice(toIndex + 3)) - 1;

        const cratesToMove = crates[stackToMoveFrom].slice(-numCratesToMove);
        
        crates[stackToMoveTo] = crates[stackToMoveTo].concat(cratesToMove);
        crates[stackToMoveFrom] = crates[stackToMoveFrom].slice(0, -numCratesToMove);
    });
    
    return crates;
}

// Absolutely Painful
const calculateMessage = (data: string[]) => {
    const { startingStack, instructions } = splitArr(data);
    const unpackedArr = decompose(startingStack);
    const groupedArr = groupElements(unpackedArr);
    const transposedArr = transpose(groupedArr);

    const cratesRearranged = rearrangeCrates(transposedArr, instructions);

    let secretMessage: string = '';

    cratesRearranged.forEach(stack => secretMessage += stack.at(-1));

    console.log(`The secret message, using the CrateMover 9000, is ${secretMessage}!`);
}

// Suprisingly just as painful
const calculateMessageMultiple = (data: string[]) => {
    const { startingStack, instructions } = splitArr(data);
    const unpackedArr = decompose(startingStack);
    const groupedArr = groupElements(unpackedArr);
    const transposedArr = transpose(groupedArr);

    const cratesRearranged = rearrangeCratesMultiple(transposedArr, instructions);

    let secretMessage: string = '';

    cratesRearranged.forEach(stack => secretMessage += stack.at(-1));

    console.log(`The secret message, using the CrateMover 9001, is ${secretMessage}!`);
}

calculateMessage(crates);
calculateMessageMultiple(crates);
