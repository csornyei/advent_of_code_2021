/**
 * Print grid
 * @param {number[][]} grid
 */
function printGrid(grid) {
    console.log(grid.map(row => row.join("")).join("\n"));
}

/**
 * Get coordinates for adjacent points
 * @param {number[]} coordinates - coordinates for starting point in the format of [row, col]
 * @param {number} width - width of the map
 * @param {number} height - height of the map
 * @returns {number[][]} adjacent coordinates in the format of [row, col][]
 */
function getAdjacentCoordinates(coordinates, width, height) {
    const [rowIdx, cellIdx] = coordinates;

    if (rowIdx === 0) {
        if (cellIdx === 0) {
            return [
                [rowIdx + 1, cellIdx],
                [rowIdx, cellIdx + 1],
                [rowIdx + 1, cellIdx + 1]
            ];
        } else if (cellIdx === width - 1) {
            return [
                [rowIdx + 1, cellIdx],
                [rowIdx, cellIdx - 1],
                [rowIdx + 1, cellIdx - 1]
            ];
        } else {
            return [
                [rowIdx + 1, cellIdx],
                [rowIdx, cellIdx - 1],
                [rowIdx, cellIdx + 1],
                [rowIdx + 1, cellIdx - 1],
                [rowIdx + 1, cellIdx + 1],
            ];
        }
    }
    else if (rowIdx === height - 1) {
        if (cellIdx === 0) {
            return [
                [rowIdx - 1, cellIdx],
                [rowIdx, cellIdx + 1],
                [rowIdx - 1, cellIdx + 1],
            ]
        } else if (cellIdx === width - 1) {
            return [
                [rowIdx - 1, cellIdx],
                [rowIdx, cellIdx - 1],
                [rowIdx - 1, cellIdx - 1]
            ];
        } else {
            return [
                [rowIdx - 1, cellIdx],
                [rowIdx, cellIdx - 1],
                [rowIdx, cellIdx + 1],
                [rowIdx - 1, cellIdx - 1],
                [rowIdx - 1, cellIdx + 1],
            ]
        }
    }
    else if (cellIdx === 0) {
        return [
            [rowIdx + 1, cellIdx],
            [rowIdx - 1, cellIdx],
            [rowIdx, cellIdx + 1],
            [rowIdx + 1, cellIdx + 1],
            [rowIdx - 1, cellIdx + 1],
        ]
    } else if (cellIdx === width - 1) {
        return [
            [rowIdx + 1, cellIdx],
            [rowIdx, cellIdx - 1],
            [rowIdx - 1, cellIdx],
            [rowIdx + 1, cellIdx - 1],
            [rowIdx - 1, cellIdx - 1],
        ]
    } else {
        return [
            [rowIdx + 1, cellIdx],
            [rowIdx - 1, cellIdx],
            [rowIdx, cellIdx - 1],
            [rowIdx, cellIdx + 1],
            [rowIdx + 1, cellIdx + 1],
            [rowIdx + 1, cellIdx - 1],
            [rowIdx - 1, cellIdx + 1],
            [rowIdx - 1, cellIdx - 1],
        ];
    }
}

/**
 * Increase adjacent energy level
 * @param {number[][]} grid
 * @param {number} rowIdx
 * @param {number} cellIdx
 * @returns {number}
 */
function increaseAdjacent(grid, rowIdx, cellIdx) {
    let flashes = 0;
    const adjacents = getAdjacentCoordinates([rowIdx, cellIdx], grid[0].length, grid.length);
    adjacents.forEach(([row, col]) => {
        if (grid[row][col] !== 0) {
            grid[row][col] += 1;
            if (grid[row][col] >= 10) {
                grid[row][col] = 0;
                flashes += 1 + increaseAdjacent(grid, row, col);
            }
        }
    })
    return flashes;
}

/**
 * Increase energy levels by one
 * @param {number[][]} grid
 * @returns {number[][]}
 */
function increaseEnergyLevels(grid) {
    return grid.map(row => row.map(cell => cell + 1));
}

/**
 * Flash octopuses on 10 and above energy levels
 * @param {number[][]} grid
 * @returns {[number, number[][]]}
 */
function flash(grid) {
    let flashes = 0;
    grid.forEach((row, rowIdx) => {
        row.forEach((cell, cellIdx) => {
            if (cell >= 10) {
                grid[rowIdx][cellIdx] = 0;
                flashes += 1 + increaseAdjacent(grid, rowIdx, cellIdx);
            }
        })
    });
    return [flashes, grid];
}

/**
 * Calculate the energy level of the whole grid
 * @param {number[][]} grid
 * @returns {number}
 */
function gridSum(grid) {
    return grid.reduce((prevValue, currentRow) => {
        return prevValue + currentRow.reduce((prev, current) => prev + current);
    }, 0);
}

/**
 * Solution for the first task
 * @param {string[]} input
 */
function firstSolution(input) {
    let octopusGrid = input.map(row => row.split("").map(n => parseInt(n)));
    let simulationStep = 0;
    let flashes = 0;
    while (simulationStep < 100) {
        octopusGrid = increaseEnergyLevels(octopusGrid);
        const result = flash(octopusGrid);
        flashes += result[0];
        octopusGrid = result[1];
        simulationStep += 1;
    }

    console.log("First solution: \n\n");
    printGrid(octopusGrid);
    console.log(flashes);
    console.log("\n\n----------------------");
}

/**
 * Solution for the first task
 * @param {string[]} input
 */
function secondSolution(input) {
    let octopusGrid = input.map(row => row.split("").map(n => parseInt(n)));
    let simulationStep = 0;
    let allFlashed = false;
    while (!allFlashed) {
        octopusGrid = increaseEnergyLevels(octopusGrid);
        const [_, newGrid] = flash(octopusGrid);
        octopusGrid = newGrid;
        const gridValue = gridSum(octopusGrid);
        if (gridValue === 0) {
            allFlashed = true;
        }
        simulationStep += 1;
    }
    console.log("Second task result: ", simulationStep);
}

module.exports = {
    a: firstSolution,
    b: secondSolution
}