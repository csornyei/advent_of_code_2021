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
 * Solution for the first task
 * @param {string[]} input
 */
function firstSolution(input) {
    const heightMap = input.map(row => {
        return row.split("").map(n => parseInt(n))
    });
    printhHeightMap(heightMap);
    const width = heightMap[0].length;
    const height = heightMap.length;
    console.log("Width:", width, "Height:", height);

    const lowPoints = [];

    heightMap.forEach((row, rowIdx) => {
        row.forEach((num, cellIdx) => {
            if (rowIdx === 0) {
                if (cellIdx === 0) {
                    if (isLowestPoint(num, heightMap[rowIdx + 1][cellIdx], heightMap[rowIdx][cellIdx + 1])) {
                        lowPoints.push(num);
                    }
                } else if (cellIdx === width - 1) {
                    if (isLowestPoint(num, heightMap[rowIdx + 1][cellIdx], heightMap[rowIdx][cellIdx - 1])) {
                        lowPoints.push(num);
                    }
                } else {
                    if (isLowestPoint(num,
                        heightMap[rowIdx + 1][cellIdx],
                        heightMap[rowIdx][cellIdx - 1],
                        heightMap[rowIdx][cellIdx + 1]
                    )) {
                        lowPoints.push(num);
                    }
                }
            }
            else if (rowIdx === height - 1) {
                if (cellIdx === 0) {
                    if (isLowestPoint(num, heightMap[rowIdx - 1][cellIdx], heightMap[rowIdx][cellIdx + 1])) {
                        lowPoints.push(num);
                    }
                } else if (cellIdx === width - 1) {
                    if (isLowestPoint(num, heightMap[rowIdx - 1][cellIdx], heightMap[rowIdx][cellIdx - 1])) {
                        lowPoints.push(num);
                    }
                } else {
                    if (isLowestPoint(num,
                        heightMap[rowIdx - 1][cellIdx],
                        heightMap[rowIdx][cellIdx - 1],
                        heightMap[rowIdx][cellIdx + 1]
                    )) {
                        lowPoints.push(num);
                    }
                }
            }
            else if (cellIdx === 0) {
                if (isLowestPoint(num,
                    heightMap[rowIdx + 1][cellIdx],
                    heightMap[rowIdx - 1][cellIdx],
                    heightMap[rowIdx][cellIdx + 1]
                )) {
                    lowPoints.push(num);
                }
            } else if (cellIdx === width - 1) {
                if (isLowestPoint(num,
                    heightMap[rowIdx + 1][cellIdx],
                    heightMap[rowIdx][cellIdx - 1],
                    heightMap[rowIdx - 1][cellIdx]
                )) {
                    lowPoints.push(num);
                }
            } else {
                if (isLowestPoint(num,
                    heightMap[rowIdx + 1][cellIdx],
                    heightMap[rowIdx - 1][cellIdx],
                    heightMap[rowIdx][cellIdx - 1],
                    heightMap[rowIdx][cellIdx + 1]
                )) {
                    lowPoints.push(num);
                }
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

}

module.exports = {
    a: firstSolution,
    b: secondSolution
}