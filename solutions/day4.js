function getDrawnNumbers(drawnNumberRow) {
    return drawnNumberRow.split(",").map(n => parseInt(n));
}

function parseRowsToBoards(rows) {
    const filteredRows = rows.filter(row => row !== "").map(row => row.replace(/\s{2,}/g, ' ').trim());
    const boards = [
        {
            0: [],
            1: [],
            2: [],
            3: [],
            4: [],
            marked: {},
            unmarked: []
        }
    ];
    let rowIndex = 0;
    for (const row of filteredRows) {
        boards[boards.length - 1][rowIndex] = row.split(" ").map(n => {
            const num = parseInt(n.trim());
            boards[boards.length - 1].unmarked.push(num);
            return num;
        });
        if (rowIndex === 4) {
            rowIndex = 0;
            boards.push({
                0: [],
                1: [],
                2: [],
                3: [],
                4: [],
                marked: {},
                unmarked: []
            })
        } else {
            rowIndex += 1;
        }
    }
    return boards;
}

function markNumber(board, num) {
    const unmarkedIndex = board.unmarked.indexOf(num);
    if (unmarkedIndex === -1) {
        return [false, board];
    }
    let markedCoords = "";
    if (board[0].indexOf(num) !== -1) {
        markedCoords = `0,${board[0].indexOf(num)}`;
    }
    if (board[1].indexOf(num) !== -1) {
        markedCoords = `1,${board[1].indexOf(num)}`;
    }
    if (board[2].indexOf(num) !== -1) {
        markedCoords = `2,${board[2].indexOf(num)}`;
    }
    if (board[3].indexOf(num) !== -1) {
        markedCoords = `3,${board[3].indexOf(num)}`;
    }
    if (board[4].indexOf(num) !== -1) {
        markedCoords = `4,${board[4].indexOf(num)}`;
    }
    board.marked[markedCoords] = num;
    board.unmarked.splice(unmarkedIndex, 1);
    return [isWinning(board), board];
}

function collectCoords(coords, collectBy) {
    const splitCoords = coords.map(coord => coord.split(','));
    const collected = {};
    splitCoords.forEach((coord) => {
        if (Object.keys(collected).indexOf(coord[collectBy]) === -1) {
            collected[coord[collectBy]] = [coord]
        } else {
            collected[coord[collectBy]].push(coord);
        }
    });
    return collected;
}

function isWinning(board) {
    const collectedRows = collectCoords(Object.keys(board.marked), 0);
    for (const row of Object.values(collectedRows)) {
        if (row.length === 5) {
            return true;
        }
    }
    const collectedCols = collectCoords(Object.keys(board.marked), 1);
    for (const col of Object.values(collectedCols)) {
        if (col.length === 5) {
            return true;
        }
    }
    return false;
}

function getWinningBoard(drawnNumbers, boards) {
    for (let index = 0; index < drawnNumbers.length; index++) {
        const num = drawnNumbers[index]
        for (let index = 0; index < boards.length; index++) {
            const board = boards[index];
            const [win, newBoard] = markNumber(board, num);
            if (win) {
                return [num, newBoard];
            }
            boards[index] = newBoard;
        }
    }
    return [-1, null];
}

function firstSolution(input) {
    const [drawnNumbersRow, ...rows] = input;
    const drawnNumbers = getDrawnNumbers(drawnNumbersRow);
    const boards = parseRowsToBoards(rows);
    const [lastNumber, winnerBoard] = getWinningBoard(drawnNumbers, boards);
    const sum = winnerBoard.unmarked.reduce((prev, curr) => prev + curr);
    const finalScore = sum * lastNumber;
    console.log("First solution result: ", finalScore);
}

function secondSolution(input) {
    console.log("Second Solution")
}

module.exports = {
    a: firstSolution,
    b: secondSolution
}