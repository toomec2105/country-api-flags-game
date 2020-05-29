// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"module-game/player-module-v2.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Player = Player;

function Player(playerId) {
  // 1
  const id = playerId;
  let score = 0;

  this.getId = () => {
    return id;
  };

  this.getScore = () => {
    return Number(score);
  }; // 2 3 


  this.setScore = playerScore => {
    if (playerScore < 0) {
      throw new Error("Score cannot be negative");
    }

    score = Number(playerScore);
  };

  this.toString = () => {
    return "id: " + id + ", score: " + score;
  };
}
},{}],"module-game/game-module-v2.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Game = Game;

var _playerModuleV = require("./player-module-v2");

function Game(gameName, numberOfTurns) {
  const name = gameName;
  let noOfTurns = numberOfTurns;
  let currentPlayer = undefined;
  let players = [];
  let currentTurn = 1;

  this.getGameName = () => {
    return name;
  };

  this.addPlayer = player => {
    players.push(player);
  };

  this.removePlayer = player => {
    let initialLength = players.length;
    players = players.filter(p => p.id !== player.id);

    if (initialLength === players.length) {
      throw new Error("Cannot remove the player. Player not found.");
    }
  };

  this.getNoOfPlayers = () => {
    return players.length;
  };

  this.setNoOfTurns = numberOfTurns => {
    noOfTurns = numberOfTurns;
  };

  this.getNoOfTurns = () => {
    return noOfTurns;
  };

  this.incrementTurn = () => {
    if (currentTurn < noOfTurns) {
      currentTurn++;
    } else {
      throw new Error("Current turn can not be larger than total number of turns.");
    }
  };

  this.resetCurrentTurn = () => {
    currentTurn = 1;
  };

  this.getCurrentTurn = () => {
    return currentTurn;
  };

  this.getCurrentPlayer = () => {
    return currentPlayer;
  };

  this.setCurrentPlayer = player => {
    currentPlayer = player;
  };

  this.getWinners = () => {
    const result = _isDrawInternal();

    const winners = [];
    players.forEach(p => {
      if (p === result.highestScore) {
        winners.push(p);
      }
    });
    return winners;
  };

  this.isDraw = () => {
    let result = this._isDrawInternal();

    return result.frequency > 1 ? true : false;
  };

  this._isDrawInternal = () => {
    let highestScore = 0;
    let map = new Map();
    players.forEach(p => {
      const currScore = p.getScore();
      highestScore = currScore > highestScore ? currScore : highestScore; //let frequency = map.get(currScore);
      // if frequency is null/undefined/0/"" the next line is false

      if (map.has(currScore)) {
        map.set(currScore, map.get(currScore) + 1);
      } else {
        map.set(currScore, 1);
      }
    });
    return {
      highestScore: highestScore,
      frequency: map.get(highestScore)
    };
  };

  this.toString = () => {
    return "name: " + name + ", noOfTurns: " + noOfTurns + ", currTurn: " + currentTurn + ", currPlayer: " + currentPlayer + "\nplayers: " + players.toString();
  };
}
},{"./player-module-v2":"module-game/player-module-v2.js"}],"module-universal/api-data-fetcher.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAPIDataAsJsObjects = getAPIDataAsJsObjects;

async function getAPIDataAsJsObjects(url) {
  try {
    const response = await fetch(url);
    const countryArray = await response.json(); //console.log(countryArray);

    return countryArray;
  } catch (error) {
    console.log(error);
  }
}
},{}],"module-universal/get-random-int.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRandomInt = getRandomInt;

/**
 * Returns a random number between min (inclusive) and max(exclusive)
 */
function getRandomInt(min, max) {
  const maxExclusive = true;
  min = Math.ceil(min);
  max = maxExclusive ? Math.floor(max) - 1 : Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
  ;
}
},{}],"module-view/btn-utills.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setRadioButtons = setRadioButtons;

function setRadioButtons(buttonsArray, property, isDisabled) {
  if (typeof isDisabled != "boolean") {
    throw Error("Third argument must be a boolean.");
  }

  if (Array.isArray(buttonsArray)) {
    let i;

    switch (property) {
      case "disabled":
        for (i = 0; i < buttonsArray.length; i++) {
          buttonsArray[i][property] = isDisabled;
        }

        break;

      case "checked":
        for (i = 0; i < buttonsArray.length; i++) {
          buttonsArray[i][property] = isDisabled;
        }

        break;

      default:
        throw Error("Second argument for setRadioButtons function must be equal to checked or disabled");
    }
  } else {
    throw Error("First argument must be an Array.");
  }
}
},{}],"module-country-api/extract-country-names.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extractElementsProperties = extractElementsProperties;
exports.getLevelItemsArrMap = getLevelItemsArrMap;

function extractElementsProperties(chosenOptions, elementsArray, property) {
  const names = [];

  if (Array.isArray(chosenOptions) && Array.isArray(elementsArray)) {
    for (let i = 0; i < chosenOptions.length; i++) {
      names[i] = elementsArray[chosenOptions[i]].property;
    }

    return names;
  } else {
    throw Error("chosenOptions or elementsArray is not an array.");
  }
}

function getLevelItemsArrMap(easyItemsMutable, mediumItemsMutable, hardItemsMutable, masterItemsMutable) {
  if (Array.isArray(easyItemsMutable) && Array.isArray(mediumItemsMutable) && Array.isArray(hardItemsMutable) && Array.isArray(masterItemsMutable)) {
    let levelItemsArrMap = {
      easy: easyItemsMutable,
      medium: mediumItemsMutable,
      hard: hardItemsMutable,
      master: masterItemsMutable
    };
    return levelItemsArrMap;
  } else {
    throw Error("All arguments to getLevelItemsArrMap() must be arrays.");
  }
}
},{}],"module-game/update-score.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateScore = updateScore;

function updateScore(game) {
  const currPlayer = game.getCurrentPlayer();
  currPlayer.setScore(currPlayer.getScore() + 1);
}
},{}],"module-view/render-result.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderResult = renderResult;

// xxx
function renderResult(msg, htmlElem) {
  htmlElem.innerHTML = msg;
}
},{}],"module-universal/array-utilities/shuffle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shuffle = shuffle;

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}
},{}],"module-view/get-user-answer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserAnswer = getUserAnswer;

function getUserAnswer(buttons) {
  let userAnswer = "";

  for (let i = 0; i < buttons.length; i++) {
    if (buttons[i].checked) {
      userAnswer = buttons[i].value;
    }
  }

  return userAnswer;
}
},{}],"module-universal/array-utilities/hasDuplicates.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasDuplicates = hasDuplicates;

function hasDuplicates(array) {
  if (new Set(array).size !== array.length) {
    throw Error("Your Array: " + array + " has duplicates.");
  }
}
},{}],"module-country-api/immutable-arrays.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEasyArray = getEasyArray;
exports.getMediumArray = getMediumArray;
exports.getHardArray = getHardArray;
exports.getMasterArray = getMasterArray;

var _hasDuplicates = require("../module-universal/array-utilities/hasDuplicates");

function getEasyArray() {
  let easyArray = ["Korea (Republic of)", "Netherlands", "Indonesia", "Mayotte", "Antarctica", "Israel", "Canada", "Switzerland", "Brazil", "Japan", "United Kingdom of Great Britain and Northern Ireland", "Sweden", "Turkey", "Germany", "United States of America", "Spain", "Cyprus", "Slovakia", "Greece", "Austria", "Croatia", "Italy", "Denmark", "Russian Federation", "Poland", "France", "China", "Uruguay", "Belgium", "Czech Republic", "Ukraine", "Holy See", "Norway", "Portugal", "Sudan", "Finland", "Nepal", "New Zeland", "Iceland", "United States Minor Outlying Islands"];
  (0, _hasDuplicates.hasDuplicates)(easyArray);
  return easyArray;
}

function getMediumArray() {
  let mediumArray = ["Australia", "Puerto Rico", "Korea (Democratic People's Republic of)", "Mexico", "Macedonia (the former Yugoslav Republic of)", "Saint Martin (French part)", "Malta", "Luxembourg", "Ireland", "Bulgaria", "Republic of Kosovo", "Iraq", "India", "Egypt", "Chile", "Mongolia", "Lithuania", "Montenegro", "Viet Nam", "Jamaica", "Slovenia", "Albania", "Hungary", "Belarus", "Estonia", "Romania", "Saudi Arabia", "Nicaragua", "Venezuela (Bolivarian Republic of)", "Syrian Arab Republic", "Serbia", "Hong Kong", "Argentina"];
  (0, _hasDuplicates.hasDuplicates)(mediumArray);
  return mediumArray;
}

function getHardArray() {
  let hardArray = ["Tunisia", "Liechtenstein", "Bosnia and Herzegovina", "Greenland", "Kenya", "Georgia", "Thailand", "Panama", "Jersey", "Bhutan", "Cambodia", "Tobago", "Kuwait", "Haiti", "Algieria", "Lebanon", "Sri Lanka", "Libya", "Colombia", "Ecuador", "Paraguay", "Afghanistan", "San Marino", "Sudan", "Andora", "Senegal", "Somalia", "Turkmenistan", "Pakistan", "Iran", "Peru", "Cuba", "Honduras", "Jordan", "Uzbekistan", "South Georgia and the South Sandwich Islands", "Papua New Guinea", "Cook Islands", "Virgin Islands (British)", "Heard Island and McDonald Islands", "Western Sahara", "Åland Islands", "French Southern Territories", "Nigeria"];
  (0, _hasDuplicates.hasDuplicates)(hardArray);
  return hardArray;
}

function getMasterArray(easyArray, mediumArray, hardArray, countryArray) {
  let j = 0;
  let masterArray = [];
  let currCountry;

  for (let i = 0; i < countryArray.length; i++) {
    currCountry = countryArray[i].name;

    if (!easyArray.includes(currCountry) && !mediumArray.includes(currCountry) && !hardArray.includes(currCountry)) {
      masterArray[j] = currCountry;
      j++;
    }
  }

  (0, _hasDuplicates.hasDuplicates)(masterArray);
  return masterArray;
}
},{"../module-universal/array-utilities/hasDuplicates":"module-universal/array-utilities/hasDuplicates.js"}],"module-view/set-cursor-type.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setCursorType = setCursorType;

function setCursorType(htmlElements, cursorType) {
  if (typeof cursorType != "string") {
    throw Error("Second argument must be a string.");
  }

  let i;

  for (i = 0; i < htmlElements.length; i++) {
    htmlElements[i].style.cursor = cursorType;
  }
}
},{}],"module-persistence/persistence.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Persistence = Persistence;

function Persistence() {
  this.get = key => {
    return localStorage.getItem(key);
  };

  this.put = (key, value) => {
    localStorage.setItem(key, value);
  };
}
},{}],"javascripts/index.js":[function(require,module,exports) {
"use strict";

var _playerModuleV = require("../module-game/player-module-v2");

var _gameModuleV = require("../module-game/game-module-v2");

var _apiDataFetcher = require("../module-universal/api-data-fetcher");

var _getRandomInt = require("../module-universal/get-random-int");

var _btnUtills = require("../module-view/btn-utills");

var _extractCountryNames = require("../module-country-api/extract-country-names");

var _updateScore = require("../module-game/update-score");

var _renderResult = require("../module-view/render-result");

var _shuffle = require("../module-universal/array-utilities/shuffle");

var _getUserAnswer = require("../module-view/get-user-answer");

var _immutableArrays = require("../module-country-api/immutable-arrays");

var _setCursorType = require("../module-view/set-cursor-type");

var _persistence = require("../module-persistence/persistence");

/* eslint no-console: 1 */

/* ----------------------- HTML elements -------------------------- */
const flagImg = document.getElementById("flag");
const first = document.querySelector("#options .option:nth-of-type(1) label");
const second = document.querySelector("#options .option:nth-of-type(2) label");
const third = document.querySelector("#options .option:nth-of-type(3) label");
const topRadioButton = document.getElementById("choice1");
const middleRadioButton = document.getElementById("choice2");
const bottomRadioButton = document.getElementById("choice3");
const answer = document.getElementById("answer");
const result = document.getElementById("result");
const form = document.querySelector("form");
const player1Score = document.querySelector("#rightScore");
const player2Score = document.querySelector("#leftScore");
const opt = document.querySelector("#settings");
const player1MatchScore = document.querySelector("#p1MatchScore");
const player2MatchScore = document.querySelector("#p2MatchScore");
const resetBtn = document.querySelector("#resetBtn");
const optionsPage = document.querySelector("#optionsPage");
const gamePage = document.querySelector("#gamePage");
const levelChoice = document.querySelector("#level-select");
const radioBtns = document.querySelectorAll("input[type=radio]");
const cursorStuff = document.querySelectorAll(".pointer");
const playBtn = document.querySelector("#play");
const next = document.getElementById("nextBtn");
const nextDiv = document.getElementById("nextBtnDiv");
/* -----------------------  other variables  -------------------------- */

const API_URL = "https://restcountries.eu/rest/v2/all";
const player1 = new _playerModuleV.Player(1);
const player2 = new _playerModuleV.Player(2);
let opt2;
let opt3;
let countryArray;
let options = [];
let correctAnswer;
let nextFlagAllowed = false;
let difficulty = "medium";
let indexOfAnswer = 0;
let masterFlagsImmutable = [];
const persistence = new _persistence.Persistence();
const easyFlagsImmutable = (0, _immutableArrays.getEasyArray)();
const mediumFlagsImmutable = (0, _immutableArrays.getMediumArray)();
const hardFlagsImmutable = (0, _immutableArrays.getHardArray)();
const level_ItemsArr_Map = (0, _extractCountryNames.getLevelItemsArrMap)(easyFlagsImmutable.slice(), mediumFlagsImmutable.slice(), hardFlagsImmutable.slice(), masterFlagsImmutable.slice());
const devMode = false;
let flagsPerMatch;

if (devMode == true) {
  flagsPerMatch = 3;
} else {
  flagsPerMatch = Math.round((mediumFlagsImmutable.length - 1) / 2);
}

let game = new _gameModuleV.Game("Flag game", flagsPerMatch);
/* -----------------------  logic  -------------------------- */

init();
/* -------------------------- Event listeners ---------------------------- */

levelChoice.addEventListener("change", function () {
  difficulty = levelChoice.value;
  flagsPerMatch = setQuestionNumber();
  const currPlayerWhenChangeLVL = game.getCurrentPlayer();
  game = new _gameModuleV.Game("Flag game", flagsPerMatch);
  game.setCurrentPlayer(currPlayerWhenChangeLVL);
  renderCurrentMatchScore();
  reset();
});
form.addEventListener("change", function (event) {
  nextFlagAllowed = true;
  next.classList.remove("invisible");
  next.classList.add("visible");
  (0, _btnUtills.setRadioButtons)([topRadioButton, middleRadioButton, bottomRadioButton], "disabled", true);
  const userAnswer = (0, _getUserAnswer.getUserAnswer)(radioBtns);
  renderAnswer(Number(userAnswer) === correctAnswer);
  changeTurn();
  renderCurrentMatchScore();
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
  countryArray = await (0, _apiDataFetcher.getAPIDataAsJsObjects)(API_URL);
  masterFlagsImmutable = (0, _immutableArrays.getMasterArray)(easyFlagsImmutable, mediumFlagsImmutable, hardFlagsImmutable, countryArray);
  setupPlayers();
  reset(); // view

  renderTottalMatches();
  (0, _setCursorType.setCursorType)(cursorStuff, "pointer");
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
  nextDiv.classList.remove("normalMargin");
  nextDiv.classList.add("bigMargin");
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
  result.innerHTML = "";
  answer.innerHTML = "";
  options = generateOptionsAsIndexes(level_ItemsArr_Map); // np 56, 78, 134

  correctAnswer = options[0]; // 56

  (0, _shuffle.shuffle)(options);
  renderCountryNamesOnBtns((0, _extractCountryNames.extractElementsProperties)(options, countryArray, "name"));
  setFlagUrl(extractFlag(correctAnswer));
  const optionsRadioButtons = [topRadioButton, middleRadioButton, bottomRadioButton];
  (0, _btnUtills.setRadioButtons)(optionsRadioButtons, "disabled", false);
  (0, _btnUtills.setRadioButtons)(optionsRadioButtons, "checked", false);
}
/* ------------------------------ heplers ----------------------------- */


function checkIfOutOfFlags(difficultyCoutriesObj) {
  if (difficultyCoutriesObj[difficulty].length < 2) {
    difficultyCoutriesObj[difficulty] = eval(difficulty + "FlagsImmutable").slice();
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

function renderCurrentMatchScore() {
  player1Score.innerHTML = player1.getScore() + "/" + game.getNoOfTurns();
  player2Score.innerHTML = "  :  " + player2.getScore() + "/" + game.getNoOfTurns();
}

function renderTottalMatches() {
  player1MatchScore.innerHTML = persistence.get("player1");
  player2MatchScore.innerHTML = "  :  " + persistence.get("player2");
}

function generateOtherCountries() {
  opt2 = (0, _getRandomInt.getRandomInt)(0, countryArray.length);
  opt3 = (0, _getRandomInt.getRandomInt)(0, countryArray.length);
}

function generateOptionsAsIndexes(difficultyCountriesObj) {
  generateOtherCountries();
  checkIfOutOfFlags(difficultyCountriesObj);
  const mutableArray = difficultyCountriesObj[difficulty];
  const randomIndex = (0, _getRandomInt.getRandomInt)(0, mutableArray.length);
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
    result.innerHTML = "It is a draw!!!! No more " + difficulty + " flags availeble for this level. Play again with the same flags or change difficulty in the options.";
  } else {
    if (player1.getScore() > player2.getScore()) {
      renderCurrentMatchEndMsg("player1");
    } else {
      renderCurrentMatchEndMsg("player2");
    }
  }
}

function renderCurrentMatchEndMsg(winner) {
  const score = persistence.get(winner);
  persistence.put(winner, Number(score) + 1); // We persist only total matches, not current score

  result.innerHTML = "player " + (winner === "player1" ? "one" : "two") + " has won. " + "No more " + difficulty + " flags availeble for this level. Play again with the same flags or change difficulty in the options.";
}

const setQuestionNumber = () => Math.round((eval(difficulty + "FlagsImmutable").length - 1) / 2);

function renderAnswer(userGuessed) {
  if (userGuessed) {
    answer.classList.remove("red");
    answer.classList.add("green");
    (0, _renderResult.renderResult)("Correct!", answer);
    (0, _updateScore.updateScore)(game);
  } else {
    answer.classList.remove("green");
    answer.classList.add("red");
    (0, _renderResult.renderResult)("Inncorect! Correct answer is " + countryArray[correctAnswer].name, answer);
  }
}
},{"../module-game/player-module-v2":"module-game/player-module-v2.js","../module-game/game-module-v2":"module-game/game-module-v2.js","../module-universal/api-data-fetcher":"module-universal/api-data-fetcher.js","../module-universal/get-random-int":"module-universal/get-random-int.js","../module-view/btn-utills":"module-view/btn-utills.js","../module-country-api/extract-country-names":"module-country-api/extract-country-names.js","../module-game/update-score":"module-game/update-score.js","../module-view/render-result":"module-view/render-result.js","../module-universal/array-utilities/shuffle":"module-universal/array-utilities/shuffle.js","../module-view/get-user-answer":"module-view/get-user-answer.js","../module-country-api/immutable-arrays":"module-country-api/immutable-arrays.js","../module-view/set-cursor-type":"module-view/set-cursor-type.js","../module-persistence/persistence":"module-persistence/persistence.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "46159" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","javascripts/index.js"], null)
//# sourceMappingURL=/javascripts.ea2fe77b.js.map