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

function filterByBitAtIndex(bits, index, filteringBit) {
    return bits.filter(bit => parseInt(bit.substring(index, index + 1)) === filteringBit);
}

function mostCommonBitAtIndex(index, bitsCount) {
    if (bitsCount[index]["0"] === bitsCount[index]["1"]) {
        return -1
    }
    return bitsCount[index]["0"] > bitsCount[index]["1"] ? 0 : 1;
}

function leastCommonBitAtIndex(index, bitsCount) {
    if (bitsCount[index]["0"] === bitsCount[index]["1"]) {
        return -1
    }
    return bitsCount[index]["0"] < bitsCount[index]["1"] ? 0 : 1;
}

function getOxygenGeneratorRating(input, index, getFilteringIndex) {
    const bitsCount = getBitAmount(input);
    const result = filterByBitAtIndex(input, index, getFilteringIndex(index, bitsCount));
    if (result.length === 1) {
        return result[0];
    } else if (result.length === 0 || index >= input[0].length) {
        throw new Error("No number found!");
    } else {
        return getOxygenGeneratorRating(result, index + 1, getFilteringIndex);
    }
}

function secondSolution(input) {
    const oxygenGeneratorRating = getOxygenGeneratorRating(input, 0, (index, bitsCount) => {
        const filteringIndex = mostCommonBitAtIndex(index, bitsCount);
        return filteringIndex === -1 ? 1 : filteringIndex;
    });
    const coScrubberRating = getOxygenGeneratorRating(input, 0, (index, bitsCount) => {
        const filteringIndex = leastCommonBitAtIndex(index, bitsCount);
        return filteringIndex === -1 ? 0 : filteringIndex;
    });
    console.log(parseInt(oxygenGeneratorRating, 2) * parseInt(coScrubberRating, 2));
}

module.exports = {
    a: firstSolution,
    b: secondSolution
}