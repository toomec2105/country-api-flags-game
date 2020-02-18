import { Player } from "../src/modulev2/player-module-v2";
import { Game } from "../src/modulev2/game-module-v2";

console.log("-------starting game-player-spec.js---------");

describe('Game module test', function () {

    let player1;
    let game;
    let product;
    let player2;

    beforeEach(function () {
        player1 = new Player(1);
        player2 = new Player(2);
        game = new Game("Name", 2);
    });


    it('when player added to game he is added to players array', function () {
        game.addPlayer(player1);
        product = game.getNoOfPlayers();
        expect(product).toEqual(1);
    });

    it('when player is removed he is removed from players array', function () {
        game.addPlayer(player1);
        game.removePlayer(player1);
        product = game.getNoOfPlayers();
        expect(product).toEqual(0);
    });

      it('the game checks if there is a draw', function () {
        game.addPlayer(player1);
        player1.setScore(2);
        game.addPlayer(player2);
        player2.setScore(2);
        product = game.isDraw();
        expect(product).toEqual(true);
    });  
});






