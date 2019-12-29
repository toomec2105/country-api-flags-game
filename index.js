// set constants for number of options, country array
// vars: options(array which keeps indexes), correctAnswer(index), userAnswer(index),   
 // https://restcountries.eu/
const NUMBER_OF_OPTIONS = 3;
const API_URL = "https://restcountries.eu/rest/v2/all"
let countryArray;
let options = [];
let correctAnswer;
let userAnswer;
let flagImg = document.getElementById("flag");
let first = document.getElementById("1opt");
let second = document.getElementById("2opt");
let third = document.getElementById("3opt");
console.log("starting the program");
init();

async function init(){
    countryArray = await getArray();
            console.log("Store the countries");
    options = generateOptions();
             console.log("corretct option: " + correctAnswer);
    correctAnswer = options[generateCorrectAnswer(options)];
            console.log("Extract the name and flag url");
    let countryNames = extractCountryNames();
    let flag = extractFlag(correctAnswer);
            console.log("Render the 3 options(radio buttons)");
    setCountryNamesOnBtns(countryNames);
    setFlagSrc(flag);
}



async function getArray() {
    console.log("Get array of country data from API");
    try {
        let response = await fetch(API_URL);
        let countryArray = await response.json();
        console.log(countryArray);
        return countryArray;
    } catch (error) {
        console.log(error);
    }
}

/**
 * Returns a random number between min (inclusive) and max(exclusive)
 */
function getRandomInt(min, max) {
    let maxExclusive = true;   
    min = Math.ceil(min);
    max = maxExclusive ? Math.floor(max) - 1  :  Math.floor(max);
    let random = Math.floor(Math.random() * (max - min + 1)) + min;
    //debugger;
    return random;
}
console.log(getRandomInt(0,2));


function generateOptions(){

    console.log("Get 3 random country indexes: ");
    let opt1 = getRandomInt(0, countryArray.length);
    let opt2 = getRandomInt(0, countryArray.length);
    let opt3 = getRandomInt(0, countryArray.length);
    console.log(opt1 + ", " + opt2 + ", " + opt3);
    return [opt1, opt2, opt3];
}

function generateCorrectAnswer(options){
    console.log("otions.length: " + options.length);
    console.log("Choose random index out of options: ");
    let index = getRandomInt(0, options.length);
    console.log(index);
    return index;
}

function extractFlag(correctAnswer){
    console.log(countryArray[correctAnswer].flag);
    return countryArray[correctAnswer].flag;
}
function extractCountryNames(){
    let names = [];
    let countryNmb;
for(let i = 0; i < options.length; i++){
    countryNmb = options[i];
    names[i] = countryArray[countryNmb].name;
}
console.log(names);
return names;
}

function setCountryNamesOnBtns(countryNames){
    first.innerText = countryNames[0];
    second.innerText = countryNames[1];
    third.innerText = countryNames[2];
}

function setFlagSrc(flag){
    flagImg.src = flag;
}