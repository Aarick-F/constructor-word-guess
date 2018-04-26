const Word = require("./word.js");
const inquirer = require("inquirer");

const wordBank = [
  "mercury", "venus", "earth",
  "mars", "jupiter", "saturn",
  "uranus", "neptune", "pluto",
  "ceres", "eris", "makemake",
  "haumea"
];

let guesses;
let pickedWords;
let word;
let pickedWord;

function init() {
  pickedWords = [];
  console.log("Hello, and welcome to Word Guess in Space!");
  console.log("------------------------------------------");
  playGame();
}

function playGame() {
  pickedWord = "";
  guesses = 9;
  if(pickedWords.length < wordBank.length) {
    pickedWord = getWord();
  } else {
    // WIN CONDITION
    console.log("You know a lot about your celestial neighborhood. Cheers!");
  }
  if(pickedWord) {
    word = new Word(pickedWord);
    word.makeLetters();
    makeGuess();
  }
}

function getWord() {
  let rand = Math.floor(Math.random() * wordBank.length);
  let randomWord = wordBank[rand];
  if(pickedWords.indexOf(randomWord) === -1) {
    pickedWords.push(randomWord);
    return randomWord;
  } else {
    getWord();
  }
}

function makeGuess() {
  let checker = [];
  inquirer.prompt([
    {
      name: "guessedLetter",
      message: word.update() + 
              "\nGuess a letter!"
    }
  ]).then(data => {
    word.letters.forEach(letter => {
      letter.checkLetter(data.guessedLetter);
      checker.push(letter.getCharacter());
    });
    if(guesses > 0 && checker.indexOf("_") !== -1) {
      makeGuess();
    } else {
      console.log("CONGRATULATIONS! YOU GOT THE WORD!");
      console.log(word.update());
      playGame();
    }
  });
}

init();
