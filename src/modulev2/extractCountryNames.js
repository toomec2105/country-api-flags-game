export function extractElementsProperties(chosenOptions, elementsArray, property) {
    const names = [];
    if (Array.isArray(chosenOptions) && Array.isArray(elementsArray)) {
        for (let i = 0; i < chosenOptions.length; i++) {
            names[i] = elementsArray[chosenOptions[i]].property;
        }
        return names;
    } else {
        throw Error("chosenOptions or elementsArray is not an array.");
    }
}