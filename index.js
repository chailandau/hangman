const wordBank = require("./word-bank.json");
const prompt = require("readline-sync");

const answer = prompt.question("May I have your name?");

console.log(answer);