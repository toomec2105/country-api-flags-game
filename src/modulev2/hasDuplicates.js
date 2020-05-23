export function hasDuplicates(array) {
    if (new Set(array).size !== array.length) {
        throw Error("Your Array: " + array + " has duplicates.");
    }
}
