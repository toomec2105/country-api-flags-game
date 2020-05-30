/* eslint no-console: 1 */
import { Player } from "../module-game/player-module-v2";
import { Game } from "../module-game/game-module-v2";
import { getAPIDataAsJsObjects } from "../module-universal/api-data-fetcher";
import { getRandomInt } from "../module-universal/get-random-int";
import { setRadioButtons } from "../module-view/btn-utills";
import { extractElementsProperties } from "../module-country-api/extract-country-names";
import { updateScore } from "../module-game/update-score";
import { renderResult } from "../module-view/render-result";
import { shuffle } from "../module-universal/array-utilities/shuffle";
import { getUserAnswer } from "../module-view/get-user-answer";
import { getLevelItemsArrMap } from "../module-country-api/extract-country-names";
import { getEasyArray, getMediumArray, getHardArray, getMasterArray } from "../module-country-api/immutable-arrays";
import { setCursorType } from "../module-view/set-cursor-type";
import { Persistence } from "../module-persistence/persistence";

/* ----------------------- HTML elements -------------------------- */
const flagImg = document.getElementById("flag");
const firstOption = document.querySelector("#options .option:nth-of-type(1) label");
const secondOption = document.querySelector("#options .option:nth-of-type(2) label");
const thirdOption = document.querySelector("#options .option:nth-of-type(3) label");
const topRadioButton = document.getElementById("choice1");
const middleRadioButton = document.getElementById("choice2");
const bottomRadioButton = document.getElementById("choice3");
const renderedAnswer = document.getElementById("answer");
const playerResult = document.getElementById("result");
const optionsPanel = document.querySelector("form");
const player1Score = document.querySelector("#rightScore");
const player2Score = document.querySelector("#leftScore");
const optionsMenuItem = document.querySelector("#settings");
const player1MatchScore = document.querySelector("#p1MatchScore");
const player2MatchScore = document.querySelector("#p2MatchScore");
const resetBtn = document.querySelector("#resetBtn");
const optionsPage = document.querySelector("#optionsPage");
const gamePage = document.querySelector("#gamePage");
const levelChoice = document.querySelector("#level-select");
const radioBtns = document.querySelectorAll("input[type=radio]");
const cursorClassElements = document.querySelectorAll(".pointer");
const playBtn = document.querySelector("#play");
const nextQuestionBtn = document.getElementById("nextBtn");
const nextQuestionBtnContainer = document.getElementById("nextBtnDiv");

/* -----------------------  other variables  -------------------------- */
const API_URL = "https://restcountries.eu/rest/v2/all";
const player1 = new Player(1);
const player2 = new Player(2);
let opt2;
let opt3;
let countryArray;
let options = [];
let correctAnswer;
let nextFlagAllowed = false;
let difficulty = "medium";
let indexOfAnswer = 0;
let masterFlagsImmutable = [];
const persistence = new Persistence();
const easyFlagsImmutable = getEasyArray();
const mediumFlagsImmutable = getMediumArray();
const hardFlagsImmutable = getHardArray();
const level_ItemsArr_Map = getLevelItemsArrMap(easyFlagsImmutable.slice(), mediumFlagsImmutable.slice(), hardFlagsImmutable.slice(), masterFlagsImmutable.slice());
let flagsPerMatch = Math.round((mediumFlagsImmutable.length - 1) / 2);
let game = new Game("Flag game", flagsPerMatch);


/* ----------------------- devMode settings  -------------------------- */
// comment out to turn on production mode
/* const devMode = true;
if (devMode) {
    flagsPerMatch = 3;
    game = new Game("Flag game", flagsPerMatch);
}  */
/* -----------------------  logic  -------------------------- */

init();

/* -------------------------- Event listeners ---------------------------- */
levelChoice.addEventListener("change", function () {
    difficulty = levelChoice.value;
    flagsPerMatch = setQuestionNumber();
    const currPlayerWhenChangeLVL = game.getCurrentPlayer();
    game = new Game("Flag game", flagsPerMatch);
    game.setCurrentPlayer(currPlayerWhenChangeLVL);
    renderCurrentMatchScore();
    reset();
});

optionsPanel.addEventListener("change", function (event) {
    nextFlagAllowed = true;
    nextQuestionBtn.classList.remove("invisible");
    nextQuestionBtn.classList.add("visible");
    setRadioButtons([topRadioButton, middleRadioButton, bottomRadioButton], "disabled", true);
    const userAnswer = getUserAnswer(radioBtns);
    renderAnswer(Number(userAnswer) === correctAnswer);
    changeTurn();
    renderCurrentMatchScore();
    event.preventDefault();
}, false);

nextQuestionBtn.addEventListener("click", function () {
    if (nextQuestionBtnContainer.classList.contains("bigMargin") === true) {
        nextQuestionBtnContainer.classList.remove("bigMargin");
        nextQuestionBtnContainer.classList.add("normalMargin");
    }
    if (nextFlagAllowed) {
        reset();
        nextFlagAllowed = false;
        nextQuestionBtn.classList.add("invisible");
        nextQuestionBtn.classList.remove("visible");
    }
});

optionsMenuItem.addEventListener("click", function () {
    optionsPage.classList.remove("invisible");
    gamePage.classList.remove("visible");
    gamePage.classList.add("invisible");
    optionsPage.classList.add("visible");
    playBtn.classList.remove("bold");
    optionsMenuItem.classList.add("bold");
});

playBtn.addEventListener("click", function () {
    optionsMenuItem.classList.remove("bold");
    playBtn.classList.add("bold");
    gamePage.classList.remove("invisible");
    optionsPage.classList.add("invisible");
    optionsPage.classList.remove("visible");
    gamePage.classList.add("visible");
});

resetBtn.addEventListener("click", function () {
    game.resetCurrentTurn();
    persistTotalMatchesScore();

    player1Score.classList.add("activePlayer");
    player2Score.classList.remove("activePlayer");
    game.setCurrentPlayer(player1);
    player1.setScore(0);
    player2.setScore(0);
    renderTottalMatches();
    renderCurrentMatchScore();
});

/* ------------------------------ main methods --------------------------- */

async function init() {
    countryArray = await getAPIDataAsJsObjects(API_URL);
    masterFlagsImmutable = getMasterArray(easyFlagsImmutable, mediumFlagsImmutable, hardFlagsImmutable, countryArray);
    setupPlayers();
    reset();

    // view
    renderTottalMatches();
    setCursorType(cursorClassElements, "pointer");
    player1Score.classList.add("activePlayer");
    optionsPage.classList.add("invisible");
    playBtn.classList.add("bold");

    if (persistence.get("player1") === null) {
        persistTotalMatchesScore();
    }
    renderCurrentMatchScore();

    function setupPlayers() {
        game.addPlayer(player1);
        game.addPlayer(player2);
        game.setCurrentPlayer(player1);
    }
}
function persistTotalMatchesScore() {
    persistence.put("player1", Number(0));
    persistence.put("player2", Number(0));
}

function initNewMatch() {
    nextQuestionBtnContainer.classList.remove("normalMargin");
    nextQuestionBtnContainer.classList.add("bigMargin");
    renderMatchResult();
    player1Score.classList.add("activePlayer");
    player2Score.classList.remove("activePlayer");
    player1.setScore(0);
    player2.setScore(0);
    renderCurrentMatchScore();
    renderTottalMatches();
}

function changeTurn() {
    if (game.getCurrentTurn() < game.getNoOfTurns()) {
        game.incrementTurn();
    } else {
        if (game.getCurrentPlayer().getId() === player1.getId()) {
            player1Score.classList.remove("activePlayer");
            player2Score.classList.add("activePlayer");
            game.setCurrentPlayer(player2);

        } else {
            game.setCurrentPlayer(player1);
            initNewMatch();
        }
        game.resetCurrentTurn();

    }
}

async function reset() {
    playerResult.innerHTML = "";
    renderedAnswer.innerHTML = "";
    options = generateOptionsAsIndexes(level_ItemsArr_Map); // np 56, 78, 134
    correctAnswer = options[0]; // 56
    shuffle(options);
    renderCountryNamesOnBtns(extractElementsProperties(options, countryArray, "name"));
    setFlagUrl(extractFlag(correctAnswer));
    const optionsRadioButtons = [topRadioButton, middleRadioButton, bottomRadioButton];
    setRadioButtons(optionsRadioButtons, "disabled", false);
    setRadioButtons(optionsRadioButtons, "checked", false);
}
/* ------------------------------ heplers ----------------------------- */
function checkIfOutOfFlags(difficultyCoutriesObj) {
    if (difficultyCoutriesObj[difficulty].length < 2) {
        difficultyCoutriesObj[difficulty] = eval(difficulty + "FlagsImmutable").slice();
    }
}
function renderCountryNamesOnBtns() {
    firstOption.innerText = countryArray[options[0]].name;
    secondOption.innerText = countryArray[options[1]].name;
    thirdOption.innerText = countryArray[options[2]].name;
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

function renderCurrentMatchScore() {
    player1Score.innerHTML = player1.getScore() + "/" + game.getNoOfTurns();
    player2Score.innerHTML = "  :  " + player2.getScore() + "/" + game.getNoOfTurns();

}
function renderTottalMatches() {
    player1MatchScore.innerHTML = persistence.get("player1");
    player2MatchScore.innerHTML = "  :  " + persistence.get("player2");
}

function generateOtherCountries() {
    opt2 = getRandomInt(0, countryArray.length);
    opt3 = getRandomInt(0, countryArray.length);
}

function generateOptionsAsIndexes(difficultyCountriesObj) {
    generateOtherCountries();
    checkIfOutOfFlags(difficultyCountriesObj);
    const mutableArray = difficultyCountriesObj[difficulty];

    const randomIndex = getRandomInt(0, mutableArray.length);
    const opt1 = mutableArray[randomIndex];
    mutableArray.splice(randomIndex, 1);
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

function renderMatchResult() {
    if (game.isDraw()) {
        playerResult.innerHTML = "It is a draw!!!! No more " + difficulty + " flags availeble for this level. Play again with the same flags or change difficulty in the options.";
    }
    else {

        if (player1.getScore() > player2.getScore()) {
            renderCurrentMatchEndMsg("player1");
        }
        else {
            renderCurrentMatchEndMsg("player2");
        }
    }
}
function renderCurrentMatchEndMsg(winner) {
    const score = persistence.get(winner);
    persistence.put(winner, Number(score) + 1); // We persist only total matches, not current score
    playerResult.innerHTML = "player " + ((winner === "player1") ? "one" : "two") + " has won. " + "No more " + difficulty + " flags availeble for this level. Play again with the same flags or change difficulty in the options.";
}
const setQuestionNumber = () => Math.round((eval(difficulty + "FlagsImmutable").length - 1) / 2);

function renderAnswer(userGuessed) {
    if (userGuessed) {
        renderedAnswer.classList.remove("red");
        renderedAnswer.classList.add("green");
        renderResult("Correct!", renderedAnswer);
        updateScore(game);
    }
    else {
        renderedAnswer.classList.remove("green");
        renderedAnswer.classList.add("red");
        renderResult("Inncorect! Correct answer is " + countryArray[correctAnswer].name, renderedAnswer);
    }
}
