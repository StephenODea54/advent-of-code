import readInputString from "../functions/readInputString";

const datastreamBuffer = readInputString('inputs.txt');

// Function to check if string has all different characters
const isUnique = (str: string) => new Set(str).size === str.length;

// Main Function (Part 1)
const findPacket = (str: string) => {
    let markerIndex = 0;

    for (let charIndex = 0; charIndex < str.length; charIndex++) {
        const substr = str.slice(charIndex, charIndex + 4);
        
        if (isUnique(substr)) {
            markerIndex = str.indexOf(substr) + 4;
            break;
        }
    }

    console.log(`There needs to be ${markerIndex} characters processed before the first start-of-packet marker is detected.`)
}

// Main Function (Part 2)
const findMarker = (str: string) => {
    let messageIndex = 0;

    for (let charIndex = 0; charIndex < str.length; charIndex++) {
        const substr = str.slice(charIndex, charIndex + 14);
        
        if (isUnique(substr)) {
            messageIndex = str.indexOf(substr) + 14;
            break;
        }
    }

    console.log(`There needs to be ${messageIndex} characters processed before the first start-of-message marker is detected.`)
}

findPacket(datastreamBuffer);
findMarker(datastreamBuffer);
