const prompt = require("readline-sync");
const wordBank = require("./word-bank.json");

let roundsWon = 0;
let totalRounds = 0;
let currentRound = 1;

let gameMechanics = () => {
  console.log(
    `\n\nHello and welcome to Round ${currentRound++} of Hangman! Try not to kill the guy. \n__________________________\n\nTo play, guess a letter and press enter. \nTo exit the game, press 'CTRL + C.\n`
  );
  let answerArr = [];
  let correctGuesses = [];
  let guessedLetters = [];
  let guessesLeft = 6;

  // Individual round
  let roundMechanics = () => {
    let random = Math.floor(Math.random() * wordBank.length);
    let randomWord = wordBank[random];

    let letters = randomWord.split("");

    let numberOfRemainingLetters = randomWord.length;

    // Adding the underscores to represent word
    let findanswerArr = () => {
      letters.forEach((_, index) => {
        answerArr[index] = "_";
      });
    };

    findanswerArr();

    // Loop through while user has guesses and there are letters left to be guessed
    while (numberOfRemainingLetters > 0 && guessesLeft > 0) {
      console.log(answerArr.join(" "));

      let guessALetter = prompt.question("\nGuess a letter: ");
      let guess = guessALetter.toLowerCase()[0];

      // Make sure characters are a-z
      let aToZ = /[a-zA-Z]/.test(guess);
      // Test for special characters
      let specialCharacter = /[^a-zA-Z]/.test(guess);
      // Test for blank space
      let blankSpace = /\s/.test(guess);

      let guessMechanics = () => {
        // Only work if A-Z
        if (aToZ) {
          letters.forEach((letter, index) => {
            // If guess is a correct letter, add it in. And subtract how many letters are left from the count.
            if (guess === letter) {
              if (answerArr[index] === "_") {
                answerArr[index] = guess;
                numberOfRemainingLetters--;
              }
            }
          });
          // If no correct letter is guessed, subtract how many guesses left
          if (
            !correctGuesses.includes(guess) &&
            !letters.includes(guess) &&
            !guessedLetters.includes(guess)
          ) {
            guessesLeft--;
          }
          // If special character, tell user it can't be
        } else if (specialCharacter) {
          console.log("\nIt needs to be a letter from A-Z.");
        } else if (blankSpace) {
          console.log("\nPlease enter a letter.");
        }

        if (!guessedLetters.includes(guess)) {
          guessedLetters.push(guess);
        }
      };

      guessMechanics();

      // Builds hangman
      let hangTheMan = () => {
        if (guessesLeft === 6) {
          console.log(`\n${guessesLeft} guesses left.`);
        } else if (guessesLeft === 5) {
          console.log(`\n O \n\n\n\n`);
          console.log(`${guessesLeft} guesses left.`);
        } else if (guessesLeft === 4) {
          console.log(`\n O \n | \n | \n\n`);
          console.log(`${guessesLeft} guesses left.`);
        } else if (guessesLeft === 3) {
          console.log(`\n O \n/| \n | \n\n`);
          console.log(`${guessesLeft} guesses left.`);
        } else if (guessesLeft === 2) {
          console.log(`\n O \n/|\\ \n |\n\n`);
          console.log(`${guessesLeft} guesses left.`);
        } else if (guessesLeft === 1) {
          console.log(`\n O \n/|\\ \n |\n/\n`);
          console.log(`${guessesLeft} guesses left.`);
        } else if (guessesLeft === 0) {
          console.log(`\n O \n/|\\ \n |\n/ \\\n`);
          console.log(`${guessesLeft} guesses left.`);
        }
      };

      hangTheMan();
    }

    let afterEachRound = () => {
      // If they're out of guesses, they're out
      if (numberOfRemainingLetters > 0) {
        console.log(answerArr.join(" "));
        console.log(
          `\n\nCongrats, you killed the guy.\nThe word was: ${randomWord}.\n`
        );
      } else {
        // Otherwise, they win
        console.log(answerArr.join(" "));
        console.log(
          `\n\nThe guy gets to live!\nYou got it, it was: ${randomWord}.\n`
        );
        roundsWon++;
      }
      // Add to how many rounds they completed and tell them how many they won
      totalRounds++;
      console.log(`\n${roundsWon} rounds won out of ${totalRounds} rounds.\n`);
    };

    afterEachRound();
  };

  roundMechanics();
};

while (true) {
  gameMechanics();
}
