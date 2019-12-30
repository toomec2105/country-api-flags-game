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
// other variables 
const NUMBER_OF_OPTIONS = 3;
const API_URL = "https://restcountries.eu/rest/v2/all"
let countryArray;
let options = [];
let correctAnswer;
let next = document.getElementById("nextBtn");
let userAnswer;


init();

/* -------------------------- Event listeners ---------------------------- */
form.addEventListener("submit", function (event) {
    var options = new FormData(form);
    let userAnswer = "";
    for (const option of options) {
        userAnswer = option[1];
    };
    renderResult(Number(userAnswer) === correctAnswer
        ? "Correct!"
        : "Inncorect! Correct answer is " + countryArray[correctAnswer].name);

    event.preventDefault();
}, false);

next.addEventListener("click", function () {
    reset();
});



/* ------------------------------ main methods --------------------------- */

async function init() {
    countryArray = await requestCountryData();
    reset();
}


async function reset() {
    answer.innerHTML = "";
    options = generateOptionsAsIndexes(); // 56, 78, 134
    correctAnswer = options[0]; // 56
    shuffle(options);
    renderCountryNamesOnBtns(extractCountryNames());
    setFlagUrl(extractFlag(correctAnswer));
}

function generateOptionsAsIndexes() {
    let opt1 = getRandomInt(0, countryArray.length);
    let opt2 = getRandomInt(0, countryArray.length);
    let opt3 = getRandomInt(0, countryArray.length);
    return [opt1, opt2, opt3];
}

function generateCorrectAnswer(options) {
    let index = getRandomInt(0, options.length);
    return index;
}


/* ------------------------------ heplers ----------------------------- */
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