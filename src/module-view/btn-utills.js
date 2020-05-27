export function setRadioButtons(buttonsArray, property, isDisabled) {
    if (typeof isDisabled != "boolean"){
        throw Error("Third argument must be a boolean.");
      }
    if (Array.isArray(buttonsArray)) {
        let i;
        switch(property){
            case "disabled":
                for (i = 0; i < buttonsArray.length; i++) {
                    buttonsArray[i].property = isDisabled;
                }
                break;
            case "checked":
                for (i = 0; i < buttonsArray.length; i++) {
                    buttonsArray[i].property = isDisabled;
                }
                break;
            default:
                throw Error("Second argument for setRadioButtons function must be equal to checked or disabled");
        }
    } else {
        throw Error("First argument must be an Array.");

    }

}
