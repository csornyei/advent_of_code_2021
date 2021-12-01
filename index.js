const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const argv = yargs(hideBin(process.argv)).argv;

const solutions = require('./solutions');

if (solutions[argv.day]) {
    solutions[argv.day]()
} else if (argv.day < 1 && argv.day > 25) {
    console.log("There is no such day!");
}
else {
    console.log("There is no solution for this yet!");
}