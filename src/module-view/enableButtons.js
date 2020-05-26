export function enableButtons(buttonsArray) {
    if (Array.isArray(buttonsArray)) {
        let i;
        for (i = 0; i < buttonsArray.length; i++) {
            buttonsArray[i].disabled = false;
        }
    }
    else {
        throw Error("Argument must be an Array.");
    }
}
