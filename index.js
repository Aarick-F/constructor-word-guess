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

function init() {
  guesses = 9;
  pickedWords = [];
  console.log("Hello, and welcome to Word Guess in Space!");
  console.log("------------------------------------------");
  playGame();
}

function playGame() {
  let pickedWord = "";
  let word;
  if(pickedWords.length < wordBank.length) {
    pickedWord = getWord();
  } else {
    // WIN CONDITION
  }
  if(guesses > 0 && pickedWord) {
    word = new Word(pickedWord);
    word.makeLetters();
    inquirer.prompt([
      {
        name: "guessedLetter",
        message: word.update() + 
                "\nGuess a letter!"
      }
    ]).then(data => {
      console.log(data.guessedLetter);
    });
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

init();
