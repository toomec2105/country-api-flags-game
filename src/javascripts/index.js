import { Player } from "../modulev2/player-module-v2";
import { Game } from "../modulev2/game-module-v2";
// set constants for number of options, country array
// vars: options(array which keeps indexes), correctAnswer(index), userAnswer(index),   


/* ----------------------- HTML elements -------------------------- */
let flagImg = document.getElementById("flag");
let first = document.querySelector("#options .option:nth-of-type(1) label");
let second = document.querySelector("#options .option:nth-of-type(2) label");
let third = document.querySelector("#options .option:nth-of-type(3) label");
let firstInput = document.getElementById("choice1");
let secondInput = document.getElementById("choice2");
let thirdInput = document.getElementById("choice3");
let firstCircle = document.getElementById("circleOne");
let secondCircle = document.getElementById("circleTwo");
let thirdCircle = document.getElementById("circleThree");
let answer = document.getElementById("answer");
let form = document.querySelector("form");
let p1Score = document.querySelector("#rightScore");
let p2Score = document.querySelector("#leftScore");

let p1MatchScore = document.querySelector("#p1MatchScore");
let p2MatchScore = document.querySelector("#p2MatchScore");
let resetBtn = document.querySelector("#resetBtn");
let levelNumber = document.querySelector("#levelNumber");
let matchNumber = document.querySelector("#matchNumber");
let playersNumber = document.querySelector("#playersNumber");

let radioBtns = document.querySelectorAll("input[type=radio]");
// other variables 
const NUMBER_OF_OPTIONS = 3;
let gameNumber = 1;
const API_URL = "https://restcountries.eu/rest/v2/all"
let countryArray;
let options = [];
let correctAnswer;
let next = document.getElementById("nextBtn");
let userAnswer;
let flagsPerMatch = 2;
let nextFlagAllowed = false;
let level = 1;
let game = new Game("Flag game", flagsPerMatch);
let difficulty = "easy";
let easyFlags = ["Poland", "Netherlands", "Indonesia", "Saudi Arabia", "Mayotte", "Antarctica", "Israel", "Canada", "Switzerland", "Brazil", "Japan", "United Kingdom of Great Britain and Northern Ireland", "Sweden","Turkey", "Germany", "United States of America", "Spain", "United Kingdom", "Cyprus","Greece", "Austria", "Croatia", "Italy", "Russian Federation","Ireland", "Poland", "France", "China", "Norway","Portugal"];
let mediumFlags = ["Mexico", "Georgia", "Bosnia and Herzegovina", "Macedonia (the former Yugoslav Republic of)", "Saint Martin (French part)", "Malta", "Luxembourg", "Bulgaria", "Tunisia", "Republic of Kosovo", "Iraq", "India", "Egypt","Chile", "Uruguay", "Belgium", "Mongolia", "Greenland", "Lithuania","Montenegro", "Holy See", "Viet Nam", "Slovakia", "Slovenia", "Albania", "Hungary", "Czech Republic", "Denmark", "Macedonia", "Belarus", "Ukraine", "Estonia", "Lithuana", "Luxenbourg", "Latvia", "Romania"];

const player1 = new Player(1);
const player2 = new Player(2);
game.addPlayer(player1);
game.addPlayer(player2);
game.setCurrentPlayer(player1);
init();
initGame();
p1Score.classList.add("activePlayer");



if (localStorage.getItem("player1") === null) {
    localStorage.setItem('player1', Number(0));
    localStorage.setItem('player2', Number(0));
    
    renderScores()
} else {
    renderScores()
}
/* -------------------------- Event listeners ---------------------------- */
form.addEventListener("change", function (event) {
    nextFlagAllowed = true;
    next.classList.remove("invisible");
    disableRadioButtons();
    let userAnswer = getUserAnswer();
    renderAnswer(Number(userAnswer) === correctAnswer);
    changeTurn();
    gameNumber++;
    renderScores();
    event.preventDefault();
}, false);

next.addEventListener("click", function () {
    if (nextFlagAllowed) {
        reset();
        nextFlagAllowed = false;
        next.classList.add("invisible");
    }
});

resetBtn.addEventListener("click", function () {
    
    game.resetCurrentTurn();
    localStorage.setItem('player1', Number(0));
    localStorage.setItem('player2', Number(0));
    p1Score.classList.add("activePlayer");
    p2Score.classList.remove("activePlayer");
    game.setCurrentPlayer(player1);
    player1.setScore(0);
    player2.setScore(0);
    renderScores();
});


function getUserAnswer() {
    let userAnswer = "";
    for (var i = 0; i < radioBtns.length; i++) {
        if (radioBtns[i].checked) {

            userAnswer = radioBtns[i].value;

        }
    }
    

    return userAnswer;
}

function disableRadioButtons() {
    firstInput.disabled = true;
    secondInput.disabled = true;
    thirdInput.disabled = true;
}

function renderAnswer(userGuessed) {
    if (userGuessed) {
        answer.classList.remove("red");
        answer.classList.add("green");
        renderResult("Correct!");
        updateScore();
    }
    else {
        answer.classList.remove("green");
        answer.classList.add("red");
        renderResult("Inncorect! Correct answer is " + countryArray[correctAnswer].name);
    }
}

/* ------------------------------ main methods --------------------------- */

async function init() {
    countryArray = await requestCountryData();
    reset();
}

function initGame() {
    console.log("Init game");


}
function initNewMatch() {
    answer.classList.remove("red");
    answer.classList.remove("green");
    if (game.isDraw()) {
        answer.innerHTML = "There is a draw!!!!";

    }
    else {
        if (player1.getScore() > player2.getScore()) {
            let score = localStorage.getItem("player1");
            localStorage.setItem("player1", Number(score) + 1);
            answer.innerHTML = "player one has won.";

        }
        else {
            let score = localStorage.getItem("player2");
            localStorage.setItem("player2", Number(score) + 1);
            answer.innerHTML = "player two has won.";
        }
    }
    p1Score.classList.add("activePlayer");
    p2Score.classList.remove("activePlayer");
    player1.setScore(0);
    player2.setScore(0);
    renderScores();
}
function updateScore() {
    console.log("Updating score");
    let currPlayer = game.getCurrentPlayer();
    currPlayer.setScore(currPlayer.getScore() + 1);
    console.log("increasing player score and rendering");
}

function changeTurn() {
    if (game.getCurrentTurn() < game.getNoOfTurns()) {
        game.incrementTurn();
    } else {
        if (game.getCurrentPlayer().getId() === player1.getId()) {
            p1Score.classList.remove("activePlayer");
            p2Score.classList.add("activePlayer");
            game.setCurrentPlayer(player2);

        } else {
            game.setCurrentPlayer(player1);
            initNewMatch();
        }
        game.resetCurrentTurn();

    }
}

async function reset() {

    answer.innerHTML = "";
    options = generateOptionsAsIndexes(); // 56, 78, 134
    correctAnswer = options[0]; // 56
    shuffle(options);
    renderCountryNamesOnBtns(extractCountryNames());
    setFlagUrl(extractFlag(correctAnswer));
    firstInput.disabled = false;
    secondInput.disabled = false;
    thirdInput.disabled = false;
    firstInput.checked = false;
    secondInput.checked = false;
    thirdInput.checked = false;
}

function generateOptionsAsIndexes() {
    let opt1 = getRandomInt(0, countryArray.length);
    let opt2 = getRandomInt(0, countryArray.length);
    let opt3 = getRandomInt(0, countryArray.length);
    
    while(opt1 === opt2){
        opt2 = getRandomInt(0, countryArray.length);
    }
    while(opt1 === opt3){
        opt3 = getRandomInt(0, countryArray.length);
    }
    while(opt3 === opt2){
        opt2 = getRandomInt(0, countryArray.length);
    }
    while(isCountryHardEnough(opt1) === false){
        opt1 = getRandomInt(0, countryArray.length);
    }
    return [opt1, opt2, opt3];
}

/* ------------------------------ heplers ----------------------------- */
function isCountryHardEnough(opt){
    if(difficulty === "easy"){
        for(let i=0; i<easyFlags.length;i++){
            if(countryArray[opt].name === easyFlags[i]){
             return true;   
            }
        }
    }
    if(difficulty === "medium"){
        for(let i=0; i<mediumFlags.length;i++){
            if(countryArray[opt].name === mediumFlags[i]){
             return true;   
            }
        }
    }
    if(difficulty === "hard"){
        for(let i=0; i<easyFlags.length;i++){
            if(countryArray[opt].name === easyFlags[i]){
             return false;   
            }
        }
        for(let i=0; i<mediumFlags.length;i++){
            if(countryArray[opt].name === mediumFlags[i]){
             return false;   
            }
        }
        
        return true;
    }
    return false;
}
async function requestCountryData() {
    try {
        let response = await fetch(API_URL);
        let countryArray = await response.json();
        return countryArray;
    } catch (error) {
        console.log(error);
    }
}
function renderResult(msg) {
    answer.innerHTML = msg;
}
/**
 * Returns a random number between min (inclusive) and max(exclusive)
 */
function getRandomInt(min, max) {
    let maxExclusive = true;
    min = Math.ceil(min);
    max = maxExclusive ? Math.floor(max) - 1 : Math.floor(max);
    let random = Math.floor(Math.random() * (max - min + 1)) + min;
    return random;
}

function renderCountryNamesOnBtns(countryNames) {
/*     first.innerText = countryArray[options[0]].name;
    second.innerText = countryArray[options[1]].name;
    third.innerText = countryArray[options[2]].name; */
    first.innerText = countryArray[options[0]].name;
    second.innerText = countryArray[options[1]].name;
    third.innerText = countryArray[options[2]].name;
    firstInput.value = options[0];
    secondInput.value = options[1];
    thirdInput.value = options[2];
}

function setFlagUrl(flag) {
    flagImg.src = flag;
}

function extractCountryNames() {
    let names = [];
    let countryNmb;
    for (let i = 0; i < options.length; i++) {
        countryNmb = options[i];
        names[i] = countryArray[countryNmb].name;
    }
    return names;
}

function extractFlag(correctAnswer) {
    return countryArray[correctAnswer].flag;
}
function shuffle(array) {

    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i);
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function renderScores() {
    p1Score.innerHTML = player1.getScore() + "/" + game.getNoOfTurns();
    p2Score.innerHTML = "  :  " + player2.getScore() + "/" + game.getNoOfTurns();
    p1MatchScore.innerHTML = localStorage.getItem("player1");
    p2MatchScore.innerHTML = "  :  " + localStorage.getItem("player2");
    levelNumber.innerHTML = level;
    matchNumber.innerHTML = flagsPerMatch;
    playersNumber.innerHTML = game.getNoOfPlayers();
}
//localStorage.getItem("player1") - match score
//player1.getScore() -- actual score game.getNoOfTurns()