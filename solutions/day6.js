/**
 * Calculate the fish internal timers
 * @param {number[]} fishes
 * @returns {number[]}      fishes with updated timers
 */
function simulateDay(fishes) {
    const newFishes = [];
    fishes = fishes.map(fish => {
        if (fish === 0) {
            newFishes.push(8);
            return 6;
        } else {
            return fish - 1;
        }
    });
    return [...fishes, ...newFishes];
}

/**
 * Run the simulation for multiple days
 * @param {number[]} fishes original fishes
 * @param {number} days     how long the simulation should run
 * @returns {number[]}      fishes after the simulation
 */
function simulate(fishes, days) {
    for (let index = 0; index < days; index++) {
        fishes = simulateDay(fishes);
    }
    return fishes;
}

/**
 * Solution for the first task
 * @param {string[]} input
 */
function firstSolution(input) {
    const lanternfishes = input[0].split(",").map(f => parseInt(f));
    console.log(simulate(lanternfishes, 80).length);
}

/**
 * Solution for the first task
 * @param {string[]} input
 */
function secondSolution(input) {
    const lanternfishes = input[0].split(",").map(f => parseInt(f));
    const days = {};
    for (let index = 0; index < 9; index++) {
        days[index] = 0;
    }
    lanternfishes.forEach(fish => {
        days[fish] += 1;
    });
    for (let index = 0; index < 256; index++) {
        const newFishes = days[0];
        for (let index = 0; index < 8; index++) {
            days[index] = days[index + 1];
        }
        days[6] += newFishes;
        days[8] = newFishes;
    }
    const sum = Object.values(days).reduce((prev, current) => prev + current);
    console.log(sum);
}

module.exports = {
    a: firstSolution,
    b: secondSolution
}