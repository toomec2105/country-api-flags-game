export function checkIfOutOfFlags(difficultyCoutriesObj, difficulty) {
    if (difficultyCoutriesObj[difficulty].length < 2) {
        difficultyCoutriesObj[difficulty] = eval(difficulty + "FlagsImmutable").slice();
    }
}
