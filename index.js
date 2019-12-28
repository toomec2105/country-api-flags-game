// set constants for number of options, country array
// vars: options(array which keeps indexes), correctAnswer(index), userAnswer(index),   
 // https://restcountries.eu/
const NUMBER_OF_OPTIONS = 3;
const API_URL = "https://restcountries.eu/rest/v2/all"
let countryArray;
let options;
let correctAnswer;
let userAnswer;

console.log("starting the program");
init();

async function init(){
    countryArray = await getArray();
    console.log("Store the countries");
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



