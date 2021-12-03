function getBitAmount(bitsArr) {
    const bitsCount = {};
    bitsArr.forEach((bits) => {
        bits.split("").forEach((bit, idx) => {
            if (!bitsCount[idx]) {
                bitsCount[idx] = {
                    "0": 0,
                    "1": 0
                }
            }
            bitsCount[idx][bit] += 1;
        })
    });
    return bitsCount
}

function firstSolution(input) {
    const bitsCount = getBitAmount(input);
    const gammaBits = Object.values(bitsCount).map(bits => {
        if (bits["0"] > bits["1"]) {
            return "0"
        } else {
            return "1"
        }
    }).join("");
    const epsilonBits = gammaBits.split("").map(b => b === "0" ? "1" : "0").join("");

    console.log(parseInt(gammaBits, 2) * parseInt(epsilonBits, 2));
}

function secondSolution(input) {

}

module.exports = {
    a: firstSolution,
    b: secondSolution
}