
export function updateScore(game) {
    const currPlayer = game.getCurrentPlayer();
    currPlayer.setScore(currPlayer.getScore() + 1);
}
