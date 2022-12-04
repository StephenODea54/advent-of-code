import readInput from "../functions/readInput";

const pairs = readInput('inputs.txt');

// Function that returns the upper and lower bounds of each assignment
// and converts it to a numeric value
const getNumericAssignments = (data: string[]) => {
    const pairsClean: number[] = [];

    data.forEach(pair => {
        pair.split(',').forEach(section => {
            section.split('-').forEach(indvSection => {
                pairsClean.push(parseInt(indvSection));
            });
        });
    });

    return pairsClean;
}

// Function to count total number of subsets and overlaps
const countSubsetsAndOverlaps = (data: string[]) => {
    let totalSubsets = 0;
    let totalOverlaps = 0;

    const pairsClean = getNumericAssignments(data);
    
    // Check if RHS is contained in LHS and vice-versa
    for (let i = 0; i < pairsClean.length; i += 4) {
        if (pairsClean[i] <= pairsClean[i+3] && pairsClean[i+2] <= pairsClean[i+1]) {
            totalOverlaps ++;

            if ((pairsClean[i+2] >= pairsClean[i] && pairsClean[i+3] <= pairsClean[i+1]) ||
                (pairsClean[i] >= pairsClean[i+2] && pairsClean[i+1] <= pairsClean[i+3])) {
                    totalSubsets++;
                }
        }

    }

    console.log(`The total number of pairs where one range fully contains the other is ${totalSubsets}!`);
    console.log(`The total number of elves with overlapping assignments is ${totalOverlaps}!`);
}

countSubsetsAndOverlaps(pairs);
