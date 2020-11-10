const wordBank = require("./word-bank.json");
const prompt = require("readline-sync");

// Game round counter
let gameRounds = 0;
let gameRoundsCounter = (gameRounds) => {
  gameRounds +=1;
}

// Guess counter
let guesses = 0;
let guessCounter = (guesses) => {
  guesses += 1;
}

// Choose random word
let random = Math.floor(Math.random() * wordBank.length);
let randomWord = wordBank[random];

// Build guessed word
let guessedWord = "";


// Game mechanics
const hangmanGame = (gameRounds) => {
  guesses;
  const chosenWord = randomWord;
  const gameMechanics = (guess) => {
    guessCounter();

    if (guessedWord === chosenWord) {
      return "You got it!"
    }
  }
}

const letter = prompt.question("Please guess a letter: ");
