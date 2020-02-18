import {Game} from "../game-module-v1";
import {Player} from "./player";

let game = Game("SuperGame", 10);
console.log(game.toString());

game.currentTurn = 50;
 let player1 = Player(1);
 //player1.setScore(5);
 console.log(player1.getId());

game.addPlayer(player1);
console.log(game.toString());

let player2 = Player(2);
player2.setScore(5);
game.addPlayer(player2);
console.log(game.toString());
//expect( game.getNoOfPlayers(), 2)


let player3 = Player(3);
player3.setScore(3);
game.addPlayer(player3);
console.log(game.toString());


console.log("Expected true. Actual: " + game.isDraw());
console.log("Expected 2 winners. Actual: " + game.getWinners().length);

player2.score = 10;
console.log(game.toString());
console.log("Expected false. Actual: " + game.isDraw());
console.log("Expected 1 winner. Actual: " + game.getWinners().length);    