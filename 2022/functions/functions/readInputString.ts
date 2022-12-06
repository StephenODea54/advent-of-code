import { readFileSync } from "fs";

const readInputString = (filename: string) => readFileSync(filename, 'utf-8');

export default readInputString;
