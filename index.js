const fs = require("fs");
const { join } = require("path");
const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const argv = yargs(hideBin(process.argv)).argv;
const solutions = require('./solutions');

if (solutions[argv.day]) {
    let input = fs.readFileSync(join("inputs", `${argv.day}.txt`)).toString();
    input = input.split("\n");
    solutions[argv.day]["a"](input);
    solutions[argv.day]["b"](input);
} else if (argv.day < 1 && argv.day > 25) {
    console.log("There is no such day!");
}
else {
    console.log("There is no solution for this yet!");
}