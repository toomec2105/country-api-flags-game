import { Player } from "../src/module-game/player-module-v2";

console.log("-------starting player-spec.js---------");

describe('Player module test', function () {
    let product;
    let player1;
    beforeEach(function () {
        player1 = new Player(1);
    });


    it('when created player has id', function () {
        product = player1.getId();
        expect(product).toEqual(1);
    });

    it('player can change his score', function () {
        player1.setScore(3);
        product = player1.getScore();
        expect(product).toEqual(3);
    });

    it('when negative score throw an error', function () {
        expect(function () {
            player1.setScore(-3);
        }).toThrow(new Error("Score cannot be negative"));
    });

});