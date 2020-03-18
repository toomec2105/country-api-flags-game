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
})({"modulev2/player-module-v2.js":[function(require,module,exports) {
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
},{}],"modulev2/game-module-v2.js":[function(require,module,exports) {
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
},{"./player-module-v2":"modulev2/player-module-v2.js"}],"javascripts/index.js":[function(require,module,exports) {
"use strict";

var _playerModuleV = require("../modulev2/player-module-v2");

var _gameModuleV = require("../modulev2/game-module-v2");

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
let result = document.getElementById("result");
let form = document.querySelector("form");
let p1Score = document.querySelector("#rightScore");
let p2Score = document.querySelector("#leftScore");
let opt = document.querySelector("#settings");
let p1MatchScore = document.querySelector("#p1MatchScore");
let p2MatchScore = document.querySelector("#p2MatchScore");
let resetBtn = document.querySelector("#resetBtn");
let levelNumber = document.querySelector("#levelNumber");
let matchNumber = document.querySelector("#matchNumber");
let playersNumber = document.querySelector("#playersNumber");
let optionsPage = document.querySelector("#optionsPage");
let gamePage = document.querySelector("#gamePage");
let back = document.querySelector("#backToGame");
let levelChoice = document.querySelector("#level-select");
let radioBtns = document.querySelectorAll("input[type=radio]");
let playBtn = document.querySelector("#play"); // other variables 

const NUMBER_OF_OPTIONS = 3;
let gameNumber = 1;
let opt2;
let opt3;
const API_URL = "https://restcountries.eu/rest/v2/all";
let countryArray;
let options = [];
let correctAnswer;
let next = document.getElementById("nextBtn");
let userAnswer;
let flagsPerMatch = 2;
let nextFlagAllowed = false;
let level = "medium";
let game = new _gameModuleV.Game("Flag game", flagsPerMatch);
let difficulty = "medium";
let indexOfAnswer = 0;
let easyFlagsImmutable = ["Korea (Republic of)", "Australia", "Netherlands", "Indonesia", "Saudi Arabia", "Mayotte", "Antarctica", "Israel", "Canada", "Switzerland", "Brazil", "Japan", "United Kingdom of Great Britain and Northern Ireland", "Sweden", "Turkey", "Germany", "United States of America", "Spain", "Cyprus", "Greece", "Austria", "Croatia", "Italy", "Russian Federation", "Ireland", "Poland", "France", "China", "Norway", "Portugal"];
let mediumFlagsImmutable = ["Liechtenstein", "Thailand", "Puerto Rico", "Korea (Democratic People's Republic of)", "Kenya", "Mexico", "Georgia", "Bosnia and Herzegovina", "Macedonia (the former Yugoslav Republic of)", "Saint Martin (French part)", "Malta", "Luxembourg", "Bulgaria", "Tunisia", "Republic of Kosovo", "Iraq", "India", "Egypt", "Chile", "Uruguay", "Belgium", "Mongolia", "Greenland", "Lithuania", "Montenegro", "Holy See", "Viet Nam", "Slovakia", "Slovenia", "Albania", "Hungary", "Czech Republic", "Denmark", "Macedonia", "Belarus", "Ukraine", "Estonia", "Lithuana", "Luxenbourg", "Latvia", "Romania"];
let easyFlagsMutable = easyFlagsImmutable.slice();
let mediumFlagsMutable = mediumFlagsImmutable.slice();
let hardFlagsMutable = [];
let hardFlagsImmutable = [];
let currentlyUnavailableFlags = [];
const player1 = new _playerModuleV.Player(1);
const player2 = new _playerModuleV.Player(2);
game.addPlayer(player1);
game.addPlayer(player2);
game.setCurrentPlayer(player1);
init();
initGame();
p1Score.classList.add("activePlayer");
optionsPage.classList.add("invisible");
playBtn.classList.add("bold");

if (localStorage.getItem("player1") === null) {
  localStorage.setItem('player1', Number(0));
  localStorage.setItem('player2', Number(0));
  renderScores();
} else {
  renderScores();
}

let j = 0;
/* -------------------------- Event listeners ---------------------------- */

levelChoice.addEventListener("change", function (event) {
  difficulty = levelChoice.value;
  currentlyUnavailableFlags = [];
  reset();
});
form.addEventListener("change", function (event) {
  nextFlagAllowed = true;
  next.classList.remove("invisible");
  next.classList.add("visible");
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
  } else {
    answer.classList.remove("green");
    answer.classList.add("red");
    renderResult("Inncorect! Correct answer is " + countryArray[correctAnswer].name);
  }
}
/* ------------------------------ main methods --------------------------- */


async function init() {
  countryArray = await requestCountryData();

  for (let i = 0; i < countryArray.length; i++) {
    if (easyFlagsImmutable.includes(countryArray[i].name) || mediumFlagsImmutable.includes(countryArray[i].name)) {} else {
      hardFlagsImmutable[j] = countryArray[i].name;
      j++;
    }
  }

  hardFlagsMutable = hardFlagsImmutable.slice();
  reset();
}

function initGame() {
  console.log("Init game");
}

function initNewMatch() {
  if (game.isDraw()) {
    result.innerHTML = "It is a draw!!!!";
  } else {
    if (player1.getScore() > player2.getScore()) {
      let score = localStorage.getItem("player1");
      localStorage.setItem("player1", Number(score) + 1);
      result.innerHTML = "player one has won.";
    } else {
      let score = localStorage.getItem("player2");
      localStorage.setItem("player2", Number(score) + 1);
      result.innerHTML = "player two has won.";
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
  result.innerHTML = "";
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
/* ------------------------------ heplers ----------------------------- */


function isCountryHardEnough(opt) {
  if (difficulty === "easy") {
    for (let i = 0; i < easyFlagsImmutable.length; i++) {
      if (countryArray[opt].name === easyFlagsImmutable[i]) {
        return true;
      }
    }
  }

  if (difficulty === "medium") {
    for (let i = 0; i < mediumFlagsImmutable.length; i++) {
      if (countryArray[opt].name === mediumFlagsImmutable[i]) {
        return true;
      }
    }
  }

  if (difficulty === "hard") {
    for (let i = 0; i < easyFlagsImmutable.length; i++) {
      if (countryArray[opt].name === easyFlagsImmutable[i]) {
        return false;
      }
    }

    for (let i = 0; i < mediumFlagsImmutable.length; i++) {
      if (countryArray[opt].name === mediumFlagsImmutable[i]) {
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
  /* levelNumber.innerHTML = level;
  matchNumber.innerHTML = flagsPerMatch;
  playersNumber.innerHTML = game.getNoOfPlayers(); */
} //localStorage.getItem("player1") - match score
//player1.getScore() -- actual score game.getNoOfTurns()


function generateOtherCountries() {
  opt2 = getRandomInt(0, countryArray.length);
  opt3 = getRandomInt(0, countryArray.length);
}

function generateOptionsAsIndexes() {
  let opt1;
  generateOtherCountries();

  if (easyFlagsMutable.length < 1) {
    easyFlagsMutable = easyFlagsImmutable.slice();
  }

  if (mediumFlagsMutable.length < 1) {
    mediumFlagsMutable = mediumFlagsImmutable.slice();
  }

  if (hardFlagsMutable.length < 1) {
    hardFlagsMutable = hardFlagsImmutable.slice();
  }

  if (difficulty === "easy") {
    let index = getRandomInt(0, easyFlagsMutable.length);
    opt1 = easyFlagsMutable[index];
    easyFlagsMutable.splice(index, 1);
  }

  if (difficulty === "medium") {
    let index = getRandomInt(0, mediumFlagsMutable.length);
    opt1 = mediumFlagsMutable[index];
    mediumFlagsMutable.splice(index, 1);
  }

  if (difficulty === "hard") {
    let index = getRandomInt(0, hardFlagsMutable.length);
    opt1 = hardFlagsMutable[index];
    hardFlagsMutable.splice(index, 1);
  }

  for (let i = 0; i < countryArray.length; i++) {
    if (opt1 === countryArray[i].name) {
      indexOfAnswer = i;
    }
  }

  while (opt2 === indexOfAnswer || indexOfAnswer === opt3 || opt2 === opt3) {
    generateOtherCountries();
  }

  for (let i = 0; i < easyFlagsMutable.length; i++) {
    console.log(easyFlagsMutable[i]);
  }

  return [indexOfAnswer, opt2, opt3];
}
},{"../modulev2/player-module-v2":"modulev2/player-module-v2.js","../modulev2/game-module-v2":"modulev2/game-module-v2.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "46875" + '/');

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