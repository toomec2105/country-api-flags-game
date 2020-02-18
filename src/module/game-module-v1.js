import { Player } from "./player-module-v1";



export const Game = (gameName, numberOfTurns) => {

    // the state    
    // 1 2
    const name = gameName;
    let noOfTurns = numberOfTurns;

    let currentPlayer = undefined;
    let players = [];
    let currentTurn = 1;

    const getGameName = () => {
        return name;
    }

    const addPlayer = (player) => {
        players.push(player);
    }

    const removePlayer = (player) => {
        let initialLength = players.length;
        players = players.filter(p => p.id !== player.id);

        if (initialLength === players.length) {
            throw new Error("Cannot remove the player. Player not found.");
        }
    }

    // 3
    const getNoOfPlayers = () => {
        return players.length;
    }

    const setNoOfTurns = (numberOfTurns) => {
        noOfTurns = numberOfTurns;
    }

    const getNoOfTurns = () => {
        return noOfTurns;
    }
    // 4
    const incrementTurn = () => {
        if (currentTurn < noOfTurns) {
            currentTurn++;
        } else {
            throw new Error("Current turn can not be larger than total number of turns.");
        }
    }
    // 4? 
    const getCurrentTurn = () => {
        return currentTurn;
    }

    const getCurrentPlayer = () => {
        return currentPlayer;
    }

    const setCurrentPlayer = (player) => {
        currentPlayer = player;
    }

    const getWinners = () => {
        const result = _isDrawInternal();
        const winners = [];

        players.forEach(p => {
            if (p === result.highestScore) {
                winners.push(p);
            }
        });
        return winners;

    }

    const isDraw = () => {
        let result = _isDrawInternal();
        return result.frequency > 1 ? true : false;
    }

    const _isDrawInternal = () => {
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

    const toString = () => {
        return "name: " + name + ", noOfTurns: " + noOfTurns + ", currTurn: " + currentTurn + ", currPlayer: " + currentPlayer +
            "\nplayers: " + players.toString();
    }


    return {
        toString,
        isDraw,
        getWinners,
        setCurrentPlayer,
        getCurrentPlayer,
        getCurrentTurn,
        incrementTurn,
        getNoOfTurns,
        setNoOfTurns,
        getNoOfPlayers,
        removePlayer,
        addPlayer,
        getGameName
    }
} 