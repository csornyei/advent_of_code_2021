
/**
 * Generate a two dimensional n*m sized array filled with 0s
 * @param {number} width
 * @param {number} height
 */
function generateMap(width, height) {
    const map = Array.apply(null, new Array(height)).map(() => new Array(width).fill(0));
    return map
}

/**
 * Decide if line is vertical or horizontal
 * @param {number[]} start  start coordinates for the line
 * @param {number[]} end    end coordinates for the line
 * @returns {"horizontal"|"vertical"|"diagonal"}
 */
function checkLineType(start, end) {
    const [x1, y1] = start;
    const [x2, y2] = end;

    if (x1 === x2) {
        return "vertical";
    }
    if (y1 === y2) {
        return "horizontal";
    }
    return "diagonal";
}

/**
 * Orders coordinates for lines correctly
 * @param {number[]} firstCoords    first two coordinates
 * @param {number[]} secondCoords   second two coordinates
 * @returns {number[][]}            `[start, end]` coordinates
 */
function getStartAndEnd(firstCoords, secondCoords) {
    const lineType = checkLineType(firstCoords, secondCoords);
    const [x1, y1] = firstCoords;
    const [x2, y2] = secondCoords;
    switch (lineType) {
        case "horizontal":
            if (x2 < x1) {
                return [secondCoords, firstCoords];
            } else {
                return [firstCoords, secondCoords];
            }
        case "diagonal":
        case "vertical":
            if (y2 < y1) {
                return [secondCoords, firstCoords];
            } else {
                return [firstCoords, secondCoords];
            }
    }
}

/**
 * Get the coordinates where a vertical line is going through
 * @param {number[]} start  start coordinates of the line
 * @param {number[]} end    end coordinates of the line
 * @returns {number[][]}
 */
function getVerticalLineCoords(start, end) {
    const [x1, y1] = start;
    const [_, y2] = end;
    const coords = [];
    for (let index = y1; index <= y2; index++) {
        coords.push([x1, index]);
    }
    return coords;
}

/**
 * Get the coordinates where a horizontal line is going through
 * @param {number[]} start  start coordinates of the line
 * @param {number[]} end    end coordinates of the line
 * @returns {number[][]}
 */
function getHorizontalLineCoords(start, end) {
    const [x1, y1] = start;
    const [x2] = end;
    const coords = [];
    for (let index = x1; index <= x2; index++) {
        coords.push([index, y1]);
    }
    return coords;
}

/**
 * Get the coordinates where a diagonal line is going through
 * @param {number[]} start  start coordinates of the line
 * @param {number[]} end    end coordinates of the line
 * @returns {number[][]}
 */
function getDiagonalLineCoords(start, end) {
    const [x1, y1] = start;
    const [x2, y2] = end;
    const coords = [];
    for (let index = 0; index <= y2 - y1; index++) {
        if (x1 > x2) {
            coords.push([x1 - index, y1 + index]);
        } else {
            coords.push([x1 + index, y1 + index]);
        }
    }
    return coords;
}

/**
 * Get the coordinates where a line is going through
 * @param {number[]} start  start coordinates of the line
 * @param {number[]} end    end coordinates of the line
 * @returns {number[][]}
 */
function getLineCoords(start, end) {
    const lineType = checkLineType(start, end);
    [start, end] = getStartAndEnd(start, end);
    switch (lineType) {
        case "vertical":
            return getVerticalLineCoords(start, end);
        case "horizontal":
            return getHorizontalLineCoords(start, end);
        case "diagonal":
            return getDiagonalLineCoords(start, end);
    };
}

/**
 * Fill map with line
 * @param {number[][]} map  two dimensional array to fill
 * @param {number[]} start  start coordinates for the line
 * @param {number[]} end    end coordinates for the line
 * @returns {number[][]}    map with the line added
 */
function addCoordToMap(map, coords) {
    const [x, y] = coords;
    map[y][x] += 1;
    return map;
}

/**
 * Print map to the console for testing
 * @param {number[][]} map  the map to print
 */
function printMap(map) {
    map.forEach(row => {
        console.log(row.join(""));
    })
}

/**
 * Calculate dangerous points on the map where the value is 2 or above
 * @param {number[][]} map  the map
 * @returns {number}    Count of points where the value is 2 or higher
 */
function getPointsFromMap(map) {
    const points = map.reduce((prev, current) => {
        const pointsInRow = current.reduce((prev, current) => {
            if (current >= 2) return prev + 1;
            return prev;
        }, 0);
        return prev + pointsInRow;
    }, 0);
    return points;
}

function parseInputsToCoords(input) {
    let maxWidth = -1;
    let maxHeight = -1;
    const coords = input.map(row => {
        return row.split("->").map(coords => {
            const [x, y] = coords.trim().split(",").map(coord => parseInt(coord));
            if (x > maxWidth) maxWidth = x;
            if (y > maxHeight) maxHeight = y;
            return [x, y];
        });
    });
    return { coords, maxWidth, maxHeight };
}

/**
 * Solution for the first task
 * @param {string[]} input  inputs in the format x1,y1 -> x2,y2
 */
function firstSolution(input) {
    const { coords, maxWidth, maxHeight } = parseInputsToCoords(input);
    let map = generateMap(maxWidth + 1, maxHeight + 1);
    coords.forEach(coord => {
        const [start, end] = coord;
        if (checkLineType(start, end) !== "diagonal") {
            getLineCoords(start, end).forEach(c => {
                map = addCoordToMap(map, c);
            })
        }
    });
    const points = getPointsFromMap(map);
    console.log("Dangerous Points: ", points);
}

function secondSolution(input) {
    const { coords, maxWidth, maxHeight } = parseInputsToCoords(input);
    let map = generateMap(maxWidth + 1, maxHeight + 1);
    coords.forEach(coord => {
        const [start, end] = coord;
        getLineCoords(start, end).forEach(c => {
            map = addCoordToMap(map, c);
        })
    });
    const points = getPointsFromMap(map);
    console.log("Dangerous Points: ", points);
}

module.exports = {
    a: firstSolution,
    b: secondSolution
};