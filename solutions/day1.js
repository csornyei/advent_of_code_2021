function firstSolution(input) {
    let increased = 0;
    for (let index = 1; index < input.length; index++) {
        const current = input[index];
        const previous = input[index - 1];
        if (current > previous) increased += 1;
    }
    console.log(increased);
}

function secondSolution(input) {
    console.log("secondSolution")
}

module.exports = {
    a: firstSolution,
    b: secondSolution
}