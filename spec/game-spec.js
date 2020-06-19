import { Game } from "../src/module-game/game-module-v2"

console.log("-------starting game-spec.js---------");

describe('Game module test', function () {
    let game;
    let actual;
    
    beforeEach(function () {
        game = new Game("Name", 2);
    });

    it('when created game has name', function () {
        actual = game.getGameName();
        expect(actual).toEqual("Name");
    });

    it('when created game has numberOfTurns', function () {
        actual = game.getNoOfTurns();
        expect(actual).toEqual(2);
    });

    it('when created game has an empty array of players', function () {
        actual = game.getNoOfPlayers();
        expect(actual).toBeDefined();
        expect(actual).toEqual(0);
    });

    it('when increment turn current turn increases by 1', function () {
        //arrange
        let initialTurn = game.getCurrentTurn();

        //assert
        expect(initialTurn).toEqual(1);

        game.incrementTurn();
        actual = game.getCurrentTurn();
        expect(actual).toEqual(2);
    });

    it('when exceed turn limit throw an error', function () {
        //arrange
        game.setNoOfTurns(2);

        //assert
        actual = game.getCurrentTurn();
        expect(actual).toEqual(1);

        // act
        game.incrementTurn();

        //assert
        expect(function () {
            game.incrementTurn();
        }).toThrow(new Error("Current turn can not be larger than total number of turns."));
    });


});


