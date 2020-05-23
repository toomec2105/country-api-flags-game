/* eslint no-console: 1 */

import { Player } from "../module-game/player-module-v2";
import { Game } from "../module-game/game-module-v2";
import { getAPIDataAsJsObjects } from "../module-universal/api-data-fetcher";
import { getRandomInt } from "../module-universal/getRandomInt";
import { disableRadioButtons } from "../module-view/disableRadioButtons";
import { extractElementsProperties } from "../module-flags/extractCountryNames";
import { hasDuplicates } from "../module-universal/array-utilities/hasDuplicates";
import { updateScore } from "../module-game/updateScore";
import { renderResult } from "../module-view/renderResult";
import { shuffle } from "../module-universal/array-utilities/shuffle";
import { getUserAnswer } from "../module-view/getUserAnswer";

/* ----------------------- HTML elements -------------------------- */
const flagImg = document.getElementById("flag");
const first = document.querySelector("#options .option:nth-of-type(1) label");
//-------------
const second = document.querySelector("#options .option:nth-of-type(2) label");
const third = document.querySelector("#options .option:nth-of-type(3) label");
const topRadioButton = document.getElementById("choice1");
const middleRadioButton = document.getElementById("choice2");
const bottomRadioButton = document.getElementById("choice3");
const answer = document.getElementById("answer");
const result = document.getElementById("result");
const form = document.querySelector("form");
const p1Score = document.querySelector("#rightScore");
const p2Score = document.querySelector("#leftScore");
const opt = document.querySelector("#settings");
const p1MatchScore = document.querySelector("#p1MatchScore");
const p2MatchScore = document.querySelector("#p2MatchScore");
const resetBtn = document.querySelector("#resetBtn");
const optionsPage = document.querySelector("#optionsPage");
const gamePage = document.querySelector("#gamePage");
const levelChoice = document.querySelector("#level-select");
const radioBtns = document.querySelectorAll("input[type=radio]");
const playBtn = document.querySelector("#play");
const next = document.getElementById("nextBtn");
const nextDiv = document.getElementById("nextBtnDiv");
// other variables 

let opt2;
let opt3;
export const API_URL = "https://restcountries.eu/rest/v2/all";
export let countryArray;
export let options = [];
let correctAnswer;
let nextFlagAllowed = false;
let difficulty = "medium";
let indexOfAnswer = 0;
const easyFlagsImmutable = ["Korea (Republic of)", "Netherlands", "Indonesia",
    "Mayotte", "Antarctica", "Israel", "Canada", "Switzerland", "Brazil", "Japan",
    "United Kingdom of Great Britain and Northern Ireland", "Sweden", "Turkey", "Germany", "United States of America",
    "Spain", "Cyprus", "Slovakia", "Greece", "Austria", "Croatia", "Italy", "Denmark", "Russian Federation",
    "Poland", "France", "China", "Uruguay", "Belgium", "Czech Republic", "Ukraine", "Holy See", "Norway", "Portugal", "Sudan", "Finland", "Nepal", "New Zeland", "Iceland", "United States Minor Outlying Islands"];
const mediumFlagsImmutable = ["Australia", "Puerto Rico", "Korea (Democratic People's Republic of)",
    "Mexico", "Macedonia (the former Yugoslav Republic of)",
    "Saint Martin (French part)", "Malta", "Luxembourg", "Ireland", "Bulgaria", "Republic of Kosovo", "Iraq", "India",
    "Egypt", "Chile", "Mongolia", "Lithuania", "Montenegro", "Viet Nam", "Jamaica",
    "Slovenia", "Albania", "Hungary", "Belarus",
    "Estonia", "Romania", "Saudi Arabia", "Nicaragua", "Venezuela (Bolivarian Republic of)", "Syrian Arab Republic", "Serbia", "Hong Kong", "Argentina"];
const hardFlagsImmutable = ["Tunisia", "Liechtenstein", "Bosnia and Herzegovina", "Greenland", "Kenya", "Georgia", "Thailand", "Panama", "Jersey", "Bhutan", "Cambodia", "Tobago",
    "Kuwait", "Haiti", "Algieria", "Lebanon", "Sri Lanka", "Libya", "Colombia", "Ecuador", "Paraguay", "Afghanistan", "San Marino", "Sudan", "Andora", "Senegal", "Somalia",
    "Turkmenistan", "Pakistan", "Iran", "Peru", "Cuba", "Honduras", "Jordan", "Uzbekistan", "South Georgia and the South Sandwich Islands", "Papua New Guinea", "Cook Islands",
    "Virgin Islands (British)", "Heard Island and McDonald Islands", "Western Sahara", "Åland Islands", "French Southern Territories", "Nigeria"];
    hasDuplicates(easyFlagsImmutable);
    hasDuplicates(mediumFlagsImmutable);
    hasDuplicates(hardFlagsImmutable);
    


let easyFlagsMutable = easyFlagsImmutable.slice();
let mediumFlagsMutable = mediumFlagsImmutable.slice();
let hardFlagsMutable = hardFlagsImmutable.slice();
let masterFlagsMutable = [];
const masterFlagsImmutable = [];
let flagsPerMatch = Math.round((mediumFlagsImmutable.length - 1) / 2);
export let game = new Game("Flag game", flagsPerMatch);
const player1 = new Player(1);
const player2 = new Player(2);
next.style.cursor = "pointer";
resetBtn.style.cursor = "pointer";
first.style.cursor = "pointer";
second.style.cursor = "pointer";
third.style.cursor = "pointer";
playBtn.style.cursor = "pointer";
opt.style.cursor = "pointer";
levelChoice.style.cursor = "pointer";


let allFlags = {
    easy: easyFlagsMutable,
    medium: mediumFlagsMutable,
    hard: hardFlagsMutable,
    master: masterFlagsMutable
};

init();
game.addPlayer(player1);
game.addPlayer(player2);
game.setCurrentPlayer(player1);

p1Score.classList.add("activePlayer");
optionsPage.classList.add("invisible");
playBtn.classList.add("bold");

if (localStorage.getItem("player1") === null) {
    localStorage.setItem("player1", Number(0));
    localStorage.setItem("player2", Number(0));

    renderScores();
} else {
    renderScores();
}


/* -------------------------- Event listeners ---------------------------- */
levelChoice.addEventListener("change", function (event) {
    difficulty = levelChoice.value;
    flagsPerMatch = setQuestionNumber();
    const currPlayerWhenChangeLVL = game.getCurrentPlayer();
    game = new Game("Flag game", flagsPerMatch);
    game.setCurrentPlayer(currPlayerWhenChangeLVL);
    renderScores();
    reset();
});

form.addEventListener("change", function (event) {
    nextFlagAllowed = true;
    next.classList.remove("invisible");
    next.classList.add("visible");
    disableRadioButtons([topRadioButton, middleRadioButton, bottomRadioButton]);
    const userAnswer = getUserAnswer(radioBtns);
    renderAnswer(Number(userAnswer) === correctAnswer);
    changeTurn();
    renderScores();
    event.preventDefault();
}, false);

next.addEventListener("click", function () {
    if (nextDiv.classList.contains("bigMargin") === true) {
        nextDiv.classList.remove("bigMargin");
        nextDiv.classList.add("normalMargin");
    }
    if (nextFlagAllowed) {
        reset();
        nextFlagAllowed = false;
        next.classList.add("invisible");
        next.classList.remove("visible");
    }
});

opt.addEventListener("click", function () {
    optionsPage.classList.remove("invisible");
    gamePage.classList.remove("visible");
    gamePage.classList.add("invisible");
    optionsPage.classList.add("visible");
    playBtn.classList.remove("bold");
    opt.classList.add("bold");
});

playBtn.addEventListener("click", function () {
    opt.classList.remove("bold");
    playBtn.classList.add("bold");
    gamePage.classList.remove("invisible");
    optionsPage.classList.add("invisible");
    optionsPage.classList.remove("visible");
    gamePage.classList.add("visible");
});

resetBtn.addEventListener("click", function () {
    game.resetCurrentTurn();
    localStorage.setItem("player1", Number(0));
    localStorage.setItem("player2", Number(0));
    p1Score.classList.add("activePlayer");
    p2Score.classList.remove("activePlayer");
    game.setCurrentPlayer(player1);
    player1.setScore(0);
    player2.setScore(0);
    renderScores();
});

function renderAnswer(userGuessed) {
    if (userGuessed) {
        answer.classList.remove("red");
        answer.classList.add("green");
        renderResult("Correct!", answer);
        updateScore();
    }
    else {
        answer.classList.remove("green");
        answer.classList.add("red");
        renderResult("Inncorect! Correct answer is " + countryArray[correctAnswer].name, answer);
    }
}

/* ------------------------------ main methods --------------------------- */

async function init() {
    countryArray = await getAPIDataAsJsObjects(API_URL);
    createMasterFlagsArray();
    masterFlagsMutable = masterFlagsImmutable.slice();
    reset();
}
function initNewMatch() {
    nextDiv.classList.remove("normalMargin");
    nextDiv.classList.add("bigMargin");
    printMatchResult();
    p1Score.classList.add("activePlayer");
    p2Score.classList.remove("activePlayer");
    player1.setScore(0);
    player2.setScore(0);
    renderScores();
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
    result.innerHTML = "";
    answer.innerHTML = "";
    options = generateOptionsAsIndexes(); // np 56, 78, 134
    correctAnswer = options[0]; // 56
    shuffle(options);
    renderCountryNamesOnBtns(extractElementsProperties(options, countryArray, "name"));
    setFlagUrl(extractFlag(correctAnswer));
    topRadioButton.disabled = false;
    middleRadioButton.disabled = false;
    bottomRadioButton.disabled = false;
    topRadioButton.checked = false;
    middleRadioButton.checked = false;
    bottomRadioButton.checked = false;
}

/* ------------------------------ heplers ----------------------------- */
function checkIfOutOfFlags() {
    
    if(allFlags[difficulty].length < 2){
       allFlags[difficulty] = eval(difficulty + "FlagsImmutable").slice();
    }
}
function renderCountryNamesOnBtns() {
    first.innerText = countryArray[options[0]].name;
    second.innerText = countryArray[options[1]].name;
    third.innerText = countryArray[options[2]].name;
    topRadioButton.value = options[0];
    middleRadioButton.value = options[1];
    bottomRadioButton.value = options[2];
}

function setFlagUrl(flag) {
    flagImg.src = flag;
}

function extractFlag(correctAnswer) {
    return countryArray[correctAnswer].flag;
}

function renderScores() {
    p1Score.innerHTML = player1.getScore() + "/" + game.getNoOfTurns();
    p2Score.innerHTML = "  :  " + player2.getScore() + "/" + game.getNoOfTurns();
    p1MatchScore.innerHTML = localStorage.getItem("player1");
    p2MatchScore.innerHTML = "  :  " + localStorage.getItem("player2");
}

function generateOtherCountries() {
    opt2 = getRandomInt(0, countryArray.length);
    opt3 = getRandomInt(0, countryArray.length);
}

function generateOptionsAsIndexes() {
    let opt1;
    generateOtherCountries();
    checkIfOutOfFlags();
    const mutableArray = allFlags[difficulty];
   
        const index = getRandomInt(0, mutableArray.length);
        opt1 = mutableArray[index];
        mutableArray.splice(index, 1);
    
    for (let i = 0; i < countryArray.length; i++) {
        if (opt1 === countryArray[i].name) {
            indexOfAnswer = i;
        }
    }
    while (opt2 === indexOfAnswer || indexOfAnswer === opt3 || opt2 === opt3) {
        generateOtherCountries();
    }
    return [indexOfAnswer, opt2, opt3];
}

function createMasterFlagsArray() {
    let j = 0;
    let currCountry;
    for (let i = 0; i < countryArray.length; i++) {
        currCountry = countryArray[i].name;
        if (!easyFlagsImmutable.includes(currCountry) && 
        !mediumFlagsImmutable.includes(currCountry) && 
        !hardFlagsImmutable.includes(currCountry)) {
            masterFlagsImmutable[j] = currCountry;
            j++;
        }
    }
    hasDuplicates(masterFlagsImmutable);
}
function printMatchResult() {

    if (game.isDraw()) {
        result.innerHTML = "It is a draw!!!! No more " + difficulty + " flags availeble for this level. Play again with the same flags or change difficulty in the options.";
    }
    else {
        if (player1.getScore() > player2.getScore()) {
            const score = localStorage.getItem("player1");
            localStorage.setItem("player1", Number(score) + 1);
            result.innerHTML = "player one has won. No more " + difficulty + " flags availeble for this level. Play again with the same flags or change difficulty in the options.";
        }
        else {
            const score = localStorage.getItem("player2");
            localStorage.setItem("player2", Number(score) + 1);
            result.innerHTML = "player two has won. No more " + difficulty + " flags availeble for this level. Play again with the same flags or change difficulty in the options.";
        }
    }
}
const setQuestionNumber = () => Math.round((eval(difficulty + "FlagsImmutable").length - 1) / 2);

function renderAnswer(userGuessed) {
    if (userGuessed) {
        answer.classList.remove("red");
        answer.classList.add("green");
        renderResult("Correct!", answer);
        updateScore();
    }
    else {
        answer.classList.remove("green");
        answer.classList.add("red");
        renderResult("Inncorect! Correct answer is " + countryArray[correctAnswer].name, answer);
    }
}