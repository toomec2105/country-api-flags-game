export function setCursorType(htmlElements, cursorType) {
    if (typeof cursorType != "string") {
        throw Error("Second argument must be a string.");
    }
    let i;
    for (i = 0; i < htmlElements.length; i++) {
        htmlElements[i].style.cursor = cursorType;
    }
}
