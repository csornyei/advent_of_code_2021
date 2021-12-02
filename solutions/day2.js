function firstSolution(input) {
    let horizontal = 0;
    let vertical = 0;
    input.forEach(i => {
        const [direction, amount] = i.split(" ");
        switch (direction) {
            case "forward":
                horizontal += parseInt(amount)
                break;
            case "up":
                vertical -= parseInt(amount);
                break;
            case "down":
                vertical += parseInt(amount);
                break;
            default:
                break;
        }
    });
    console.log("Horizontal", horizontal);
    console.log("Vertical", vertical);
    console.log(horizontal * vertical);
}

function secondSolution(input) {
    let horizontal = 0;
    let vertical = 0;
    let aim = 0;
    input.forEach(i => {
        const [direction, amount] = i.split(" ");
        switch (direction) {
            case "forward":
                horizontal += parseInt(amount);
                vertical += aim * parseInt(amount);
                break;
            case "up":
                aim -= parseInt(amount);
                break;
            case "down":
                aim += parseInt(amount);
                break;
            default:
                break;
        }
    });
    console.log("Horizontal", horizontal);
    console.log("Vertical", vertical);
    console.log(horizontal * vertical);
}

module.exports = {
    a: firstSolution,
    b: secondSolution
}