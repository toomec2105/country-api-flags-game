parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"vyzc":[function(require,module,exports) {
"use strict";function e(e){const t=e;let r=0;this.getId=(()=>t),this.getScore=(()=>Number(r)),this.setScore=(e=>{if(e<0)throw new Error("Score cannot be negative");r=Number(e)}),this.toString=(()=>"id: "+t+", score: "+r)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.Player=e;
},{}],"szGU":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Game=r;var e=require("./player-module-v2");function r(e,r){const t=e;let n=r,s=void 0,i=[],a=1;this.getGameName=(()=>t),this.addPlayer=(e=>{i.push(e)}),this.removePlayer=(e=>{if(i.length===(i=i.filter(r=>r.id!==e.id)).length)throw new Error("Cannot remove the player. Player not found.")}),this.getNoOfPlayers=(()=>i.length),this.setNoOfTurns=(e=>{n=e}),this.getNoOfTurns=(()=>n),this.incrementTurn=(()=>{if(!(a<n))throw new Error("Current turn can not be larger than total number of turns.");a++}),this.resetCurrentTurn=(()=>{a=1}),this.getCurrentTurn=(()=>a),this.getCurrentPlayer=(()=>s),this.setCurrentPlayer=(e=>{s=e}),this.getWinners=(()=>{const e=_isDrawInternal(),r=[];return i.forEach(t=>{t===e.highestScore&&r.push(t)}),r}),this.isDraw=(()=>{return this._isDrawInternal().frequency>1}),this._isDrawInternal=(()=>{let e=0,r=new Map;return i.forEach(t=>{const n=t.getScore();e=n>e?n:e,r.has(n)?r.set(n,r.get(n)+1):r.set(n,1)}),{highestScore:e,frequency:r.get(e)}}),this.toString=(()=>"name: "+t+", noOfTurns: "+n+", currTurn: "+a+", currPlayer: "+s+"\nplayers: "+i.toString())}
},{"./player-module-v2":"vyzc"}],"CEPk":[function(require,module,exports) {
"use strict";var e=require("../modulev2/player-module-v2"),t=require("../modulev2/game-module-v2");let n=document.getElementById("flag"),r=document.querySelector("#options .option:nth-of-type(1) label"),o=document.querySelector("#options .option:nth-of-type(2) label"),l=document.querySelector("#options .option:nth-of-type(3) label"),c=document.getElementById("choice1"),a=document.getElementById("choice2"),u=document.getElementById("choice3"),i=document.getElementById("circleOne"),s=document.getElementById("circleTwo"),d=document.getElementById("circleThree"),m=document.getElementById("answer"),g=document.querySelector("form"),y=document.querySelector("#rightScore"),f=document.querySelector("#leftScore"),h=document.querySelector("#p1MatchScore"),S=document.querySelector("#p2MatchScore"),p=document.querySelector("#resetBtn"),v=document.querySelector("#levelNumber"),L=document.querySelector("#matchNumber"),I=document.querySelector("#playersNumber"),T=document.querySelectorAll("input[type=radio]");const M=3;let b=1;const w="https://restcountries.eu/rest/v2/all";let P,q,N,C=[],E=document.getElementById("nextBtn"),H=2,B=!1,k=1,O=new t.Game("Flag game",H);const x=new e.Player(1),D=new e.Player(2);function j(){let e="";for(var t=0;t<T.length;t++)T[t].checked&&(e=T[t].value);return e}function A(){c.disabled=!0,a.disabled=!0,u.disabled=!0}function F(e){e?(m.classList.remove("red"),m.classList.add("green"),X("Correct!"),J()):(m.classList.remove("green"),m.classList.add("red"),X("Inncorect! Correct answer is "+P[q].name))}async function G(){P=await W(),Q()}function U(){console.log("Init game")}function z(){if(m.classList.remove("red"),m.classList.remove("green"),O.isDraw())m.innerHTML="There is a draw!!!!";else if(x.getScore()>D.getScore()){let e=localStorage.getItem("player1");localStorage.setItem("player1",Number(e)+1),m.innerHTML="player one has won."}else{let e=localStorage.getItem("player2");localStorage.setItem("player2",Number(e)+1),m.innerHTML="player two has won."}y.classList.add("activePlayer"),f.classList.remove("activePlayer"),x.setScore(0),D.setScore(0),ne()}function J(){console.log("Updating score");let e=O.getCurrentPlayer();e.setScore(e.getScore()+1)}function K(){console.log("Change turns"),O.getCurrentTurn()<O.getNoOfTurns()?(console.log("incrementing turn"),O.incrementTurn()):(O.getCurrentPlayer().getId()===x.getId()?(console.log("swapping players"),y.classList.remove("activePlayer"),f.classList.add("activePlayer"),O.setCurrentPlayer(D)):(console.log("Current player id"+O.getCurrentPlayer().getId()),console.log("init new match"),O.setCurrentPlayer(x),z()),console.log("resetting turn to 0"),O.resetCurrentTurn())}async function Q(){m.innerHTML="",C=R(),q=C[0],te(C),Z(_()),$(ee(q)),c.disabled=!1,a.disabled=!1,u.disabled=!1,c.checked=!1,a.checked=!1,u.checked=!1}function R(){return[Y(0,P.length),Y(0,P.length),Y(0,P.length)]}function V(e){return Y(0,e.length)}async function W(){try{let t=await fetch(w);return await t.json()}catch(e){console.log(e)}}function X(e){m.innerHTML=e}function Y(e,t){return e=Math.ceil(e),t=Math.floor(t)-1,Math.floor(Math.random()*(t-e+1))+e}function Z(e){r.innerText=P[C[0]].name,o.innerText=P[C[1]].name,l.innerText=P[C[2]].name,c.value=C[0],a.value=C[1],u.value=C[2]}function $(e){n.src=e}function _(){let e,t=[];for(let n=0;n<C.length;n++)e=C[n],t[n]=P[e].name;return t}function ee(e){return P[e].flag}function te(e){for(let t=e.length-1;t>0;t--){const n=Math.floor(Math.random()*t),r=e[t];e[t]=e[n],e[n]=r}}function ne(){y.innerHTML=x.getScore()+"/"+O.getNoOfTurns(),f.innerHTML="  :  "+D.getScore()+"/"+O.getNoOfTurns(),h.innerHTML=localStorage.getItem("player1"),S.innerHTML="  :  "+localStorage.getItem("player2"),v.innerHTML=k,L.innerHTML=H,I.innerHTML=O.getNoOfPlayers()}O.addPlayer(x),O.addPlayer(D),O.setCurrentPlayer(x),G(),U(),y.classList.add("activePlayer"),null===localStorage.getItem("player1")?(localStorage.setItem("player1",Number(0)),localStorage.setItem("player2",Number(0)),ne()):ne(),g.addEventListener("change",function(e){B=!0,A();let t=j();F(Number(t)===q),K(),b++,ne(),e.preventDefault()},!1),E.addEventListener("click",function(){B&&(Q(),B=!1)}),p.addEventListener("click",function(){localStorage.setItem("player1",Number(0)),localStorage.setItem("player2",Number(0)),ne()});
},{"../modulev2/player-module-v2":"vyzc","../modulev2/game-module-v2":"szGU"}]},{},["CEPk"], null)
//# sourceMappingURL=/javascripts.07f35f5b.js.map