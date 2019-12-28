// set constants for number of options, country array
// vars: options(array which keeps indexes), correctAnswer(index), userAnswer(index),   
 // https://restcountries.eu/
const NUMBER_OF_OPTIONS = 3;
const API_URL = "https://restcountries.eu/rest/v2/all"
let countryArray;
let options = [];
let correctAnswer;
let userAnswer;

console.log("starting the program");
init();

async function init(){
    countryArray = await getArray();
    console.log("Store the countries");
    options = generateOptions();
    correctAnswer = options[generateCorrectAnswer(options)];
    console.log("corretct option: " + correctAnswer);
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
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
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
    console.log("Choose randomindex out of options: ");
    let index = getRandomInt(0, options.length);
    console.log(index);
    return index;
}