/**
 * Get back an easy number. 1, 4, 7 or 8
 * @param {string} input    A string of `abcdefg` characters which represents a number
 * @return {1|4|7|8|false}
 */
function getEasyNumber(input) {
    switch (input.length) {
        case 2:
            return 1;
        case 3:
            return 7;
        case 4:
            return 4;
        case 7:
            return 8;
        default:
            return false;
    }
}

/**
 * Parse the input strings to bits
     * @param {String} str
     * @returns {String}
     */
function strToBits(str) {
    const bits = "".padStart(7, "0").split("");
    str.split("").forEach((char) => {
        bits[char.charCodeAt() - "a".charCodeAt()] = 1;
    });
    return bits.join("");
}

/**
 * Get how many 1-s in the bit, it shows the original string's length
 * @param {String} bits
 * @returns {Number}
 */
function bitLength(bits) {
    return bits.split("").reduce((prev, curr) => parseInt(curr) + prev, 0);
}

/**
 * Bitwise XOR for the bits in string format
 * @param {String} a
 * @param {String} b
 * @returns {String}
 */
function xor(a, b) {
    const aNumber = parseInt(a, 2);
    const bNumber = parseInt(b, 2);
    const xorValue = aNumber ^ bNumber;
    return xorValue.toString(2).padStart(7, "0");
}

/**
 * Bitwise AND for the bits in string format
 * @param {String} a
 * @param {String} b
 * @returns {String}
 */
function and(a, b) {
    const aNumber = parseInt(a, 2);
    const bNumber = parseInt(b, 2);
    const andValue = aNumber & bNumber;
    return andValue.toString(2).padStart(7, "0");
}

/**
 * Bitwise OR for the bits in string format
 * @param {String} a
 * @param {String} b
 * @returns {String}
 */
function or(a, b) {
    const aNumber = parseInt(a, 2);
    const bNumber = parseInt(b, 2);
    const orValue = aNumber | bNumber;
    return orValue.toString(2).padStart(7, "0");
}

/**
 * Bitwise NOT for the bits in string format
 * @param {String} a
 * @returns {String}
 */
function not(a) {
    return a
        .split("")
        .map((bit) => {
            if (bit === "1") return "0";
            else return "1";
        })
        .join("");
}

/**
 * @typedef ParsedInput
 * @property {string[]} inputValues Values before the |
 * @property {string[]} outputValues Values after the |
 * @property {string[]} uniqueValues Unique values from both side of the |
 */

/**
 * Parse the input and get the input values, the output values and the unique values
 * @param {string[]} input
 * @returns {ParsedInput}
 */
function parseInput(input) {
    const [inputValues, outputValues] = input.split("|").map((parts) => {
        return parts
            .trim()
            .split(" ")
            .map((word) => word.split("").sort().join(""))
            .join(" ");
    });

    const uniqueValues = [
        ...new Set([...inputValues.split(" "), ...outputValues.split(" ")]),
    ];

    return { inputValues, outputValues, uniqueValues };
}

/**
 * Solution for the first task
 * @param {string[]} input
 */
function firstSolution(input) {
    const lines = input.flatMap(row => {
        const [_, outputValue] = row.split("|");
        const outputs = outputValue.trim().split(" ");
        return outputs;
    });
    const easyNumbers = lines.filter(value => getEasyNumber(value));
    console.log(easyNumbers.length);
}

/**
 * Solution for the first task
 * @param {string[]} input
 */
function secondSolution(input) {
    let sum = 0;
    input.forEach((row) => {
        const { outputValues, uniqueValues } = parseInput(row);
        if (uniqueValues.length < 10) {
            throw new Error("Not all digit are in the input!");
        }
        if (uniqueValues.length > 10) {
            throw new Error("There are too many values for digits!");
        }
        const numbers = {
            0: "",
            1: "",
            2: "",
            3: "",
            4: "",
            5: "",
            6: "",
            7: "",
            8: "",
            9: "",
        };
        const segments = {
            a: "",
            b: "",
            c: "",
            d: "",
            e: "",
            f: "",
            g: "",
        };
        const bitValues = uniqueValues.map((val) => {
            const bits = strToBits(val);
            switch (bitLength(bits)) {
                case 2:
                    numbers[1] = bits;
                    break;
                case 3:
                    numbers[7] = bits;
                    break;
                case 4:
                    numbers[4] = bits;
                    break;
                case 7:
                    numbers[8] = bits;
            }
            return bits;
        });

        segments["a"] = xor(numbers[1], numbers[7]);

        const [numberThree] = bitValues.filter((bits) => {
            if (bitLength(bits) !== 5) return false;
            const xorredValue = xor(numbers[1], xor(segments["a"], bits));
            if (bitLength(xorredValue) !== 2) return false;
            return true;
        });
        numbers[3] = numberThree;

        segments["d"] = and(numbers[3], xor(numbers[4], numbers[1]));
        segments["b"] = xor(segments["d"], xor(numbers[4], numbers[1]));
        numbers[9] = or(numbers[3], segments["b"]);
        segments["e"] = xor(numbers[8], numbers[9]);

        const [numberZero] = bitValues.filter((bits) => {
            if (bitLength(bits) !== 6) return false;
            const xorredValue = xor(bits, xor(numbers[8]));
            if (xorredValue !== segments["d"]) return false;
            return true;
        });
        numbers[0] = numberZero;

        const [numberFive] = bitValues.filter((bits) => {
            if (bitLength(bits) !== 5) return false;
            const andValue = and(bits, segments["b"]);
            if (andValue !== segments["b"]) return false;
            return true;
        });
        numbers[5] = numberFive;

        segments["c"] = not(or(numbers[5], segments["e"]));
        segments["f"] = xor(numbers[1], segments["c"]);
        numbers[6] = or(numbers[5], segments["e"]);
        numbers[2] = or(xor(numbers[3], segments["f"]), segments["e"]);

        const outputSum = parseInt(outputValues
            .split(" ")
            .map((val) => {
                const bits = strToBits(val);
                const [number] = Object.entries(numbers).find(
                    ([num, numberBits]) => bits === numberBits
                );
                return number;
            })
            .join(""));
        sum += outputSum;
    });

    console.log(sum);

}

module.exports = {
    a: firstSolution,
    b: secondSolution
}