/**
 * @typedef {Object} ValidationResult
 * @property {boolean} result
 * @property {string|null} corrupted
 */

/**
 * Validate brackets in the row, for the first task it only check
 * if all opening bracket has closing bracket
 * @param {String} row
 * @returns {ValidationResult}
 */
function validateRowForCorruption(row) {
    const bracketTypes = {
        "(": ")",
        "[": "]",
        "{": "}",
        "<": ">"
    };
    const brackets = row.split("");
    const openerBrackets = [];
    for (const bracket of brackets) {
        if (Object.keys(bracketTypes).indexOf(bracket) !== -1) {
            openerBrackets.push(bracket);
        } else {
            const lastOpener = openerBrackets.pop();
            if (bracketTypes[lastOpener] !== bracket) {
                return {
                    result: false,
                    corrupted: bracket
                };
            }
        }
    }
    return {
        result: true,
        corrupted: null
    };
}

/**
 * Get the closing brackets for the row
 * The input should be checked first to not include corrupted rows
 * @param {string} row
 * @returns {string} closing brackets
 */
function getClosingCharacters(row) {
    const bracketTypes = {
        "(": ")",
        "[": "]",
        "{": "}",
        "<": ">"
    };
    const brackets = row.split("");
    const openerBrackets = [];
    for (const bracket of brackets) {
        if (Object.keys(bracketTypes).indexOf(bracket) !== -1) {
            openerBrackets.push(bracket);
        } else {
            openerBrackets.pop();
        }
    }
    return openerBrackets.map(opener => bracketTypes[opener]).join("");
}

/**
 * Calculate points for closing brackets
 * @param {string} closers
 * @returns {number}
 */
function getCloserPoint(closers) {
    const points = {
        ")": 1,
        "]": 2,
        "}": 3,
        ">": 4
    };
    let result = 0;
    closers.split("").reverse().forEach(bracket => {
        result *= 5;
        result += points[bracket];
    });
    return result;
}

/**
 * Solution for the first task
 * @param {string[]} input
 */
function firstSolution(input) {
    const corruptedCharacters = [];
    input.forEach(row => {
        const { result, corrupted } = validateRowForCorruption(row);
        if (!result) {
            corruptedCharacters.push(corrupted);
        }
    });
    const characterPoints = {
        ")": 3,
        "]": 57,
        "}": 1197,
        ">": 25137,
    }
    const corruptedPoint = corruptedCharacters.reduce(
        (prev, current) => (prev + characterPoints[current]),
        0
    );
    console.log(corruptedPoint);
}

/**
 * Solution for the first task
 * @param {string[]} input
 */
function secondSolution(input) {
    const incompleteRows = input.filter(row => {
        const { result } = validateRowForCorruption(row);
        return result
    });

    const closers = incompleteRows.map(row => getClosingCharacters(row));

    const points = closers.map(closer => getCloserPoint(closer)).sort((a, b) => a - b);

    console.log(points[Math.floor(points.length / 2)]);
}

module.exports = {
    a: firstSolution,
    b: secondSolution
}