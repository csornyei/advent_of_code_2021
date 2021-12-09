/**
 * @param {Number[][]} heightMap
 */
function printhHeightMap(heightMap) {
    const strHeightMap = heightMap.map(row => row.join("")).join("\n");
    console.log(strHeightMap)
}

/**
 * Calculate if `point` is the lowest point compared to the other provided points
 * @param {Number} point
 * @param {...Number} compared
 * @returns {Boolean}
 */
function isLowestPoint(point, ...compared) {
    for (const c of compared) {
        if (c <= point) {
            return false
        }
    }
    return true;
}

/**
 * Calculate risk by adding 1 to each height and sum them
 * @param {Number[]} heights
 * @returns {Number}
 */
function calculateRisk(heights) {
    return heights.map(n => n + 1).reduce((prev, current) => prev + current);
}

/**
 * Get coordinates for adjacent points
 * @param {Number[]} coordinates - coordinates for starting point in the format of [row, col]
 * @param {Number} width - width of the map
 * @param {Number} height - height of the map
 * @returns {Number[][]} adjacent coordinates in the format of [row, col][]
 */
function getAdjacentCoordinates(coordinates, width, height) {
    const [rowIdx, cellIdx] = coordinates;

    if (rowIdx === 0) {
        if (cellIdx === 0) {
            return [[rowIdx + 1, cellIdx], [rowIdx, cellIdx + 1]]
        } else if (cellIdx === width - 1) {
            return [[rowIdx + 1, cellIdx], [rowIdx, cellIdx - 1]];
        } else {
            return [
                [rowIdx + 1, cellIdx],
                [rowIdx, cellIdx - 1],
                [rowIdx, cellIdx + 1]
            ];
        }
    }
    else if (rowIdx === height - 1) {
        if (cellIdx === 0) {
            return [
                [rowIdx - 1, cellIdx], [rowIdx, cellIdx + 1]
            ]
        } else if (cellIdx === width - 1) {
            return [[rowIdx - 1, cellIdx], [rowIdx, cellIdx - 1]];
        } else {
            return [
                [rowIdx - 1, cellIdx],
                [rowIdx, cellIdx - 1],
                [rowIdx, cellIdx + 1]
            ]
        }
    }
    else if (cellIdx === 0) {
        return [
            [rowIdx + 1, cellIdx],
            [rowIdx - 1, cellIdx],
            [rowIdx, cellIdx + 1]
        ]
    } else if (cellIdx === width - 1) {
        return [
            [rowIdx + 1, cellIdx],
            [rowIdx, cellIdx - 1],
            [rowIdx - 1, cellIdx]
        ]
    } else {
        return [
            [rowIdx + 1, cellIdx],
            [rowIdx - 1, cellIdx],
            [rowIdx, cellIdx - 1],
            [rowIdx, cellIdx + 1]
        ];
    }
}

/**
 * Parse coordinates to string in order to store them in an object
 * @param {Number[]} coordinates - coordinates in format of [row, col]
 * @returns {String}
 */
function coordsToString(coordinates) {
    return coordinates.join(",");
}

/**
 * Find area in map which is bordered by 9s
 * @param {Number[]} coordinates - start coordinates in format of [row, col]
 * @param {Number[][]} map - the map which contains the location
 * @returns {Map<String, Number>} coordinates around (and including) the start coordinates which is bordered by 9s
 */
function findBasin(coordinates, map) {
    const checked = new Map();
    checked.set(coordsToString(coordinates), map[coordinates[0]][coordinates[1]]);
    const width = map[0].length;
    const height = map.length;
    const toCheck = [...getAdjacentCoordinates(coordinates, width, height)];
    while (toCheck.length > 0) {
        const coord = toCheck.pop();
        if (!checked.has(coordsToString(coord))) {
            if (map[coord[0]][coord[1]] !== 9) {
                const adjacents = getAdjacentCoordinates(coord, width, height);
                adjacents.forEach(adj => {
                    if (!checked.has(coordsToString(coord))) {
                        toCheck.push(adj);
                    }
                });
                checked.set(coordsToString(coord), map[coord[0]][coord[1]]);
            } else {
                checked.set(coordsToString(coord), 9);
            }
        }
    }
    return checked;
}

/**
 * Solution for the first task
 * @param {string[]} input
 */
function firstSolution(input) {
    const heightMap = input.map(row => {
        return row.split("").map(n => parseInt(n))
    });
    const width = heightMap[0].length;
    const height = heightMap.length;

    const lowPoints = [];

    heightMap.forEach((row, rowIdx) => {
        row.forEach((num, cellIdx) => {
            const adjCoords = getAdjacentCoordinates([rowIdx, cellIdx], width, height);
            const adjValues = [];
            adjCoords.forEach(([adjRow, adjCol]) => {
                adjValues.push(heightMap[adjRow][adjCol]);
            })
            if (isLowestPoint(num, ...adjValues)) {
                lowPoints.push(num);
            }
        })
    });
    console.log(calculateRisk(lowPoints));
}

/**
 * Solution for the first task
 * @param {string[]} input
 */
function secondSolution(input) {
    const heightMap = input.map(row => {
        return row.split("").map(n => parseInt(n))
    });
    const width = heightMap[0].length;
    const height = heightMap.length;

    const lowPoints = [];

    heightMap.forEach((row, rowIdx) => {
        row.forEach((num, cellIdx) => {
            const adjCoords = getAdjacentCoordinates([rowIdx, cellIdx], width, height);
            const adjValues = [];
            adjCoords.forEach(([adjRow, adjCol]) => {
                adjValues.push(heightMap[adjRow][adjCol]);
            })
            if (isLowestPoint(num, ...adjValues)) {
                lowPoints.push([rowIdx, cellIdx]);
            }
        })
    });

    let basinLenghts = [];
    lowPoints.forEach(lp => {
        const basin = findBasin(lp, heightMap);
        const points = [];
        basin.forEach((val, key) => {
            if (val !== 9) {
                points.push(key);
            }
        });
        basinLenghts.push(points.length);
    });
    basinLenghts = basinLenghts.sort((a, b) => b - a);
    console.log(basinLenghts[0] * basinLenghts[1] * basinLenghts[2]);
}

module.exports = {
    a: firstSolution,
    b: secondSolution
}