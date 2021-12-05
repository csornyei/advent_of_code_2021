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
 * Parse input to coordinate pairs
 * Input should be formatted like x1,y1 -> x2,y2
 * @param {string[]} input  Input coordinates
 * @returns {number[][]}    Coordinates
 */
function parseInputsToCoords(input) {
    return input.map(row => (
        row.split("->").map(coords => (
            coords.trim().split(",").map(coord => parseInt(coord))
        ))
    ));
}

function firstSolution(input) {
    const coords = parseInputsToCoords(input);
    const dangerousPoints = [];
    coords.forEach(coord => {
        const [start, end] = coord;
        if (checkLineType(start, end) !== "diagonal") {
            dangerousPoints.push(...getLineCoords(start, end));
        }
    });
    const coordsMap = {};
    dangerousPoints.forEach(([x, y]) => {
        if (coordsMap.hasOwnProperty(x)) {
            if (coordsMap[x].hasOwnProperty(y)) {
                coordsMap[x][y] += 1;
            } else {
                coordsMap[x][y] = 1;
            }
        } else {
            coordsMap[x] = {
                [y]: 1
            }
        }
    });
    const points = Object.values(coordsMap).reduce((prev, yValues) => {
        return prev + Object.values(yValues).filter(v => v >= 2).length
    }, 0);
    console.log(points);
}

function secondSolution(input) {
    const coords = parseInputsToCoords(input);
    const dangerousPoints = [];
    coords.forEach(coord => {
        dangerousPoints.push(...getLineCoords(coord[0], coord[1]));
    });
    const coordsMap = {};
    dangerousPoints.forEach(([x, y]) => {
        if (coordsMap.hasOwnProperty(x)) {
            if (coordsMap[x].hasOwnProperty(y)) {
                coordsMap[x][y] += 1;
            } else {
                coordsMap[x][y] = 1;
            }
        } else {
            coordsMap[x] = {
                [y]: 1
            }
        }
    });
    const points = Object.values(coordsMap).reduce((prev, yValues) => {
        return prev + Object.values(yValues).filter(v => v >= 2).length
    }, 0);
    console.log(points);
}

module.exports = {
    a: firstSolution,
    b: secondSolution
};