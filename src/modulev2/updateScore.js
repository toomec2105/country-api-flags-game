import { game } from "../javascripts/index";
//must be
export function updateScore() {
    const currPlayer = game.getCurrentPlayer();
    currPlayer.setScore(currPlayer.getScore() + 1);
}
