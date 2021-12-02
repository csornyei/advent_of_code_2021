function firstSolution(input) {
    input = input.map(n => parseInt(n));
    let increased = 0;
    for (let index = 1; index < input.length; index++) {
        const current = input[index];
        const previous = input[index - 1];
        if (current > previous) increased += 1;
    }
    console.log(increased);
}

function secondSolution(input) {
    input = input.map(n => parseInt(n));
    let increased = 0;
    const sum = (prev, current) => prev + current;
    for (let index = 3; index < input.length; index++) {
        const currentWindow = [input[index], input[index - 1], input[index - 2]].reduce(sum);
        const previousWindow = [input[index - 1], input[index - 2], input[index - 3]].reduce(sum);
        if (currentWindow > previousWindow) increased += 1;
    }
    console.log(increased);
}

module.exports = {
    a: firstSolution,
    b: secondSolution
}