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
})({"index.js":[function(require,module,exports) {
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
let player1Aswers = document.querySelector("#rightScore");
let player2Aswers = document.querySelector("#leftScore");
let restart = document.querySelector("#resetBtn"); // other variables 

const NUMBER_OF_OPTIONS = 3;
const API_URL = "https://restcountries.eu/rest/v2/all";
let countryArray;
let options = [];
let correctAnswer;
let next = document.getElementById("nextBtn");
let userAnswer;
let player1Score = 0;
let player2Score = 0;
let player1QuestionsAnswered = 0;
let player2QuestionsAnswered = 0;
const NO_OF_TURNS = 10;
const NO_OF_PLAYERS = 2;
renderScore();
init();
/* -------------------------- Event listeners ---------------------------- */

form.addEventListener("submit", function (event) {
  var options = new FormData(form);
  let userAnswer = "";
  firstInput.disabled = true;
  secondInput.disabled = true;
  thirdInput.disabled = true;

  for (const option of options) {
    userAnswer = option[1];
  }

  ;
  setScore(userAnswer, correctAnswer);
  renderScore();
  renderResult(Number(userAnswer) === correctAnswer ? "Correct!" : "Inncorect! Correct answer is " + countryArray[correctAnswer].name);
  event.preventDefault();

  if (player1QuestionsAnswered + player2QuestionsAnswered === 20) {}
}, false);
next.addEventListener("click", function () {
  reset();
});
restart.addEventListener("click", function () {
  resetScore();
  renderScore();
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

function setScore(userAnswer, correctAnswer) {
  if (player1QuestionsAnswered + player2QuestionsAnswered < NO_OF_TURNS * NO_OF_PLAYERS) {
    if (player1QuestionsAnswered < NO_OF_TURNS) {
      if (Number(userAnswer) === correctAnswer) {
        player1Score++;
        player1QuestionsAnswered++;
      } else {
        player1QuestionsAnswered++;
      }
    } else {
      if (Number(userAnswer) === correctAnswer) {
        player2Score++;
        player2QuestionsAnswered++;
      } else {
        player2QuestionsAnswered++;
      }
    }
  }
}

function renderScore() {
  player1Aswers.innerHTML = "player1 score: " + player1Score + "/" + player1QuestionsAnswered + "/" + NO_OF_TURNS;
  player2Aswers.innerHTML = "player2 score: " + player2Score + "/" + player2QuestionsAnswered + "/" + NO_OF_TURNS;
  console.log(player1Score);
  console.log(player1QuestionsAnswered);
}

function resetScore() {
  player1Score = 0;
  player2Score = 0;
  player1QuestionsAnswered = 0;
  player2QuestionsAnswered = 0;
}
},{}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "40127" + '/');

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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/src.e31bb0bc.js.map