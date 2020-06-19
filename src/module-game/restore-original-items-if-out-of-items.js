export function restoreOriginalItemsIfOutOfItems(difficultyCoutriesObj, difficulty, itemsArrCoreName) {
    if (difficultyCoutriesObj[difficulty].length < 2) {
        difficultyCoutriesObj[difficulty] = eval(difficulty + itemsArrCoreName).slice();
    }
}
