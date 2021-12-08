/**
 * Get back an easy number. 1, 4, 7 or 8
 * @param {string} input    A string of `abcdefg` characters which represents a number
 * @return {1|4|7|8|false}
 */
function getEasyNumber(input) {
    switch (input.length) {
        case 2:
            return 1;
        case 3:
            return 7;
        case 4:
            return 4;
        case 7:
            return 8;
        default:
            return false;
    }
}

/**
 * Solution for the first task
 * @param {string[]} input
 */
function firstSolution(input) {
    const lines = input.flatMap(row => {
        const [_, outputValue] = row.split("|");
        const outputs = outputValue.trim().split(" ");
        return outputs;
    });
    const easyNumbers = lines.filter(value => getEasyNumber(value));
    console.log(easyNumbers.length);
}

/**
 * Solution for the first task
 * @param {string[]} input
 */
function secondSolution(input) {

}

module.exports = {
    a: firstSolution,
    b: secondSolution
}