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


export function getLevelItemsArrMap(easyItemsMutable, mediumItemsMutable, hardItemsMutable, masterItemsMutable) {

    if (Array.isArray(easyItemsMutable) && Array.isArray(mediumItemsMutable) && Array.isArray(hardItemsMutable) && Array.isArray(masterItemsMutable)) {
        let levelItemsArrMap = {
            easy: easyItemsMutable,
            medium: mediumItemsMutable,
            hard: hardItemsMutable,
            master: masterItemsMutable
        };
        return levelItemsArrMap;
    } else {
        throw Error("All arguments to getLevelItemsArrMap() must be arrays.");
    }
    
}