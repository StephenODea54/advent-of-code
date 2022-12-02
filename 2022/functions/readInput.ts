import { readFileSync } from "fs";

const readInput = (filename: string) => readFileSync(filename, 'utf-8').split('\n');

export default readInput;
