// maby maby sth like disableButtons(btn1, btn2);
export function toggleRadioButtons(buttonsArray, isDisabled) {
    if (typeof isDisabled != "boolean"){
        throw Error("Second argument must be a boolean.");
      }
    if (Array.isArray(buttonsArray)) {
        let i;
        for (i = 0; i < buttonsArray.length; i++) {
            buttonsArray[i].disabled = isDisabled;
        }
    } else {
        throw Error("Argument must be an Array.");

    }

}
