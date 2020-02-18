export const Player = (playerId) => {
    // 1
    const id = playerId;
    let score;


    const getId = () => {
        return id;
    }
  
    const getScore = () => {
        return score;
    }
    // 2 3 
    const setScore = (playerScore) => {
        if (playerScore < 0) {
            throw new Error("Score cannot be negative");
        }
        score = playerScore;
    }

    const toString = () => {
        return "id: " + id + ", score: " + score;
    };

    return {
        toString,
        getId,
        getScore,
        setScore
    };
}