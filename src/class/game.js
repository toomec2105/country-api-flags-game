export class Game {

    // the state
    constructor(name, noOfTurns) {
        this.name = name;
        this.noOfTurns = noOfTurns;

        this.currentPlayer = undefined;
        this.players = [];
        this.currentTurn = 1;
    }
    /*  initializePlayers(){
         this.players = [];
         if(!Array.isArray(arr)){
             throw new Error("Players must be an array.");
         } 
         this.players = players;
     } */

    addPlayer(player) {
      /*   
        if (!player.hasProperty("id")) {
            throw new Error("The player must have an id.");
        }
        if (!player.hasProperty("score")) {
            throw new Error("The player must have a score property.");
        } */
        this.players.push(player);
    }

    removePlayer(player) {
        let initialLength = this.players.length;
        this.players = this.players.filter(p => p.id !== player.id);
        console.log(initialLength + this.players);
        if (initialLength === this.players.length) {
            throw new Error("Cannot remove the player. Player not found.");
        }
    }

    getNoOfPlayers() {
        return this.players.length;
    }

    setNoOfTurns(noOfTurns) {
        this.noOfTurns = noOfTurns;
    }

    getNoOfTurns() {
        return this.noOfTurns;
    }

    incrementTurn() {
        if (this.currentTurn < this.noOfTurns) {
            this.currentTurn++;
        } else {
            throw new Error("Current turn can not be larger than total number of turns.");
        }
    }

    getCurrentTurn() {
        return this.currentTurn;
    }

    getCurrentPlayer() {
        return this.currentPlayer;
    }

    setCurrentPlayer(player) {
        this.currentPlayer = player;
    }

    getWinners() {
        const result = this._isDrawInternal();
        const winners = [];
          
        this.players.forEach(p => {
            if(p.score === result.highestScore){
                winners.push(p); 
            }
        });
        return winners;

    }

    isDraw() {
        let result = this._isDrawInternal();
        return result.frequency > 1 ? true : false;
    }

    _isDrawInternal() {
        let highestScore = 0;
        let map = new Map();

        this.players.forEach(p => {
            const currScore = p.score;
            highestScore = currScore > highestScore ? currScore : highestScore;
            //let frequency = map.get(currScore);
            // if frequency is null/undefined/0/"" the next line is false
            if (map.has(currScore)) {
                map.set(currScore, map.get(currScore) + 1);
            } else {
                map.set(currScore, 1);
            }
        });
        console.log(highestScore);
        console.log(map.get(highestScore));
        return {
            highestScore: highestScore,
            frequency: map.get(highestScore)
        };
        
    }

    /*   let highestScore = getWinner().score;
      let sameBestResults = 0;
      for (let i = 0; i < this.players.length; i++) {
          if (highestScore === this.players[i].score) {
              sameBestResults++;
              if (sameBestResults > 1) {
                  return true;
              }
          }
      }
      return false; */


    toString() {
        return "name: " + this.name + ", noOfTurns: " + this.noOfTurns + ", currTurn: " + this.currentTurn + ", currPlayer: " + this.currentPlayer +
            "\nplayers: " + this.players.toString();
    }
}