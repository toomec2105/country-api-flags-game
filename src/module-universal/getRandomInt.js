/**
 * Returns a random number between min (inclusive) and max(exclusive)
 */
export function getRandomInt(min, max) {
    const maxExclusive = true;
    min = Math.ceil(min);
    max = maxExclusive ? Math.floor(max) - 1 : Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
    ;
}
