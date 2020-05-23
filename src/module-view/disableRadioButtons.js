// maby maby sth like disableButtons(btn1, btn2);
export function disableRadioButtons(buttonsArray) {

    if (Array.isArray(buttonsArray)) {
        let i;
        for (i = 0; i < buttonsArray.length; i++) {
            buttonsArray[i].disabled = true;
        }
    } else {
        throw Error("Argument must be an Array.");

    }

}
