const fs = require("fs");

/**
 * Get fuel needed to get from one position to the other
 * @param {number} startPosition
 * @param {number} goalPosition
 * @returns {number}
 */
function getFuelAmount(startPosition, goalPosition) {
    return Math.abs(startPosition - goalPosition);
}

/**
 * Calculate required fuel for the second task
 * @param {number} startPosition
 * @param {number} goalPosition
 * @returns {number}
 */
function getSecondFuelAmount(startPosition, goalPosition) {
    let result = 0;
    const diff = Math.abs(startPosition - goalPosition);
    for (let index = 0; index <= diff; index++) {
        result += index;
    }
    return result;
}

/**
 * Calculate fuel for multiple positions
 * @param {number[]} positions
 * @param {number} goal
 * @returns {number}
 */
function getAlignmentFuel(positions, goal) {
    const fuels = positions.map(pos => getFuelAmount(pos, goal));
    const allFuel = fuels.reduce((a, b) => a + b);
    return allFuel;
}

/**
 * Solution for the first task
 * @param {string[]} input
 */
function firstSolution(input) {
    const positions = input[0].split(",").map(n => parseInt(n)).sort((a, b) => a - b);
    const min = positions[0];
    const max = positions[positions.length - 1];

    let minFuel = getAlignmentFuel(positions, min);
    for (let index = min + 1; index <= max; index++) {
        const alignmentFuel = getAlignmentFuel(positions, index)
        if (minFuel > alignmentFuel) {
            minFuel = alignmentFuel;
        }
    }

    console.log(minFuel);
}

/**
 * Solution for the first task
 * @param {string[]} input
 */
function secondSolution(input) {
    const positions = input[0].split(",").map(n => parseInt(n)).sort((a, b) => a - b);
    const min = positions[0];
    const max = positions[positions.length - 1];

    let minFuel = positions.map(pos => getSecondFuelAmount(pos, min)).reduce((a, b) => a + b);
    for (let index = min; index <= max; index++) {
        const alignmentFuel = positions.map(pos => getSecondFuelAmount(pos, index)).reduce((a, b) => a + b);
        if (minFuel > alignmentFuel) {
            minFuel = alignmentFuel;
        }
    }

    console.log(minFuel);
}

module.exports = {
    a: firstSolution,
    b: secondSolution
}