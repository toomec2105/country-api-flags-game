import { Player } from "./player-module-v2";



export function Game(gameName, numberOfTurns) {
    const name = gameName;
    let noOfTurns = numberOfTurns;

    let currentPlayer = undefined;
    let players = [];
    let currentTurn = 1;

    this.getGameName = () => {
        return name;
    }

    this.addPlayer = (player) => {
        players.push(player);
    }

    this.removePlayer = (player) => {
        let initialLength = players.length;
        players = players.filter(p => p.id !== player.id);

        if (initialLength === players.length) {
            throw new Error("Cannot remove the player. Player not found.");
        }
    }

    this.getNoOfPlayers = () => {
        return players.length;
    }

    this.setNoOfTurns = (numberOfTurns) => {
        noOfTurns = numberOfTurns;
    }

    this.getNoOfTurns = () => {
        return noOfTurns;
    }
    
    this.incrementTurn = () => {
        if (currentTurn < noOfTurns) {
            currentTurn++;
        } else {
            throw new Error("Current turn can not be larger than total number of turns.");
        }
    }

    this.resetCurrentTurn = () => {
        currentTurn = 1;
    }

    this.getCurrentTurn = () => {
        return currentTurn;
    }

    this.getCurrentPlayer = () => {
        return currentPlayer;
    }

    this.setCurrentPlayer = (player) => {
        currentPlayer = player;
    }
    
    this.getWinners = () => {
        const result = _isDrawInternal();
        const winners = [];

        players.forEach(p => {
            if (p === result.highestScore) {
                winners.push(p);
            }
        });
        return winners;

    }

    this.isDraw = () => {
        let result = this._isDrawInternal();
        return result.frequency > 1 ? true : false;
    }

    this._isDrawInternal = () => {
        let highestScore = 0;
        let map = new Map();

        players.forEach(p => {
            const currScore = p.getScore();
            highestScore = currScore > highestScore ? currScore : highestScore;
            //let frequency = map.get(currScore);
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

    }

    this.toString = () => {
        return "name: " + name + ", noOfTurns: " + noOfTurns + ", currTurn: " + currentTurn + ", currPlayer: " + currentPlayer +
            "\nplayers: " + players.toString();
    }
} 