const { spawn } = require("child_process");

const currentDate = new Date(Date.now());

if (currentDate.getMonth() + 1 !== 12) {
    console.log("Dev mode only works in December");
    process.exit(0);
}

const dev = spawn("node", ["index.js", `--day=${currentDate.getDate()}`]);

dev.stdout.on('data', data => {
    console.log(data.toString());
});

dev.on("exit", code => {
    console.log(`Exited with code ${code}`);
})