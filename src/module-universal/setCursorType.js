export function setCursorType(htmlElementsArray, cursorType) {
    if (typeof cursorType != "string") {
        throw Error("Second argument must be a string.");
    }
    let i;
    for (i = 0; i < htmlElementsArray.length; i++) {
        htmlElementsArray[i].style.cursor = cursorType;
    }
}
