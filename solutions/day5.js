
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
 * @returns {"horizontal"|"vertical"|false}
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
    return false
}

/**
 * Fill map with line
 * @param {number[][]} map  two dimensional array to fill
 * @param {number[]} start  start coordinates for the line
 * @param {number[]} end    end coordinates for the line
 * @returns {number[][]}    map with the line added
 */
function addLine(map, start, end) {
    const lineType = checkLineType(start, end);
    const [x1, y1] = start;
    const [x2, y2] = end;
    if (lineType) {
        if (lineType === "vertical") {
            let startY = y1;
            let endY = y2;
            if (y2 < y1) {
                startY = y2;
                endY = y1;
            }
            for (let index = startY; index <= endY; index++) {
                map[index][start[0]] += 1;
            }
        } else {
            let startX = x1;
            let endX = x2;
            if (x2 < x1) {
                startX = x2;
                endX = x1;
            }
            for (let index = startX; index <= endX; index++) {
                map[start[1]][index] += 1;
            }
        }
    }

    return map;
}

/**
 * Print map to the console
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

/**
 * Solution for the first task
 * @param {string[]} input  inputs in the format x1,y1 -> x2,y2
 */
function firstSolution(input) {
    let maxWidth = -1;
    let maxHeight = -1;
    const coords = input.map(row => {
        return row.split("->").map(coords => {
            const [x, y] = coords.trim().split(",").map(coord => parseInt(coord));
            if (x > maxWidth) maxWidth = x;
            if (y > maxHeight) maxHeight = y;
            return [x, y];
        });
    })
    let map = generateMap(maxWidth + 1, maxHeight + 1);
    coords.forEach(coord => {
        const [start, end] = coord;
        map = addLine(map, start, end);
    });
    const points = getPointsFromMap(map);
    console.log("Dangerous Points: ", points);
}

function secondSolution(input) {
    console.log("Second Solution");
}

module.exports = {
    a: firstSolution,
    b: secondSolution
};