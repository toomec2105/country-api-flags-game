import { allFlags, difficulty } from "../javascripts/index";
/* ------------------------------ heplers ----------------------------- */
export function checkIfOutOfFlags() {
    if (allFlags[difficulty].length < 2) {
        allFlags[difficulty] = eval(difficulty + "FlagsImmutable").slice();
    }
}
