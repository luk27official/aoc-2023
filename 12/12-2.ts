import { loadInput, writeOutput, compareTestFiles } from "../template/utils";

const solve = (realInput: boolean, solutionId: string, expected: number) => {
    let input: string[] = loadInput(solutionId, realInput);

    const stringSeq1: string[] = [];
    const numHashInString1: number[][] = [];

    for (const line of input) {
        const split = line.split(" ");

        stringSeq1.push(split[0] + "?" + split[0] + "?" + split[0] + "?" + split[0] + "?" + split[0]);
        const lst = split[1].split(",").map((e) => Number(e));
        numHashInString1.push([...lst, ...lst, ...lst, ...lst, ...lst]);
    }

    const map = new Map();
    // TODO...

    const evaluateSeq = (inp: string, numHashInString: number[]) => {
        let findDot = null;
        //const nm = numHashInString;
        const nm = [...numHashInString];
        let currentNumHash = nm.shift();
        let i = 0;

        while (i < inp.length) {
            // console.log(i, inp[i], findDot);
            if (currentNumHash === undefined) {
                findDot = true;
            }
            if (inp[i] === "." || inp[i] === "?") {
                if (findDot === false) {
                    return false;
                }
                if (findDot) {
                    findDot = null;
                }
            }
            if (inp[i] === "#") {
                if (findDot) {
                    map.set(inp + numHashInString.join(","), false);
                    return false;
                }
                if (currentNumHash && currentNumHash - 1 > 0) {
                    findDot = false;
                    currentNumHash--;
                }
                else if (currentNumHash) {
                    findDot = true;
                    currentNumHash = nm.shift();
                    if (!currentNumHash) findDot = null;
                }
            }
            i++;
        }
        if (currentNumHash) {
            return false;
        }
        return true;
    };

    const generateSeq = (inp: string, numHashInString: number[], numberHashes: number, i: number, totalI: number) => {
        const initialValue = 0;
        const sumHashes = numHashInString.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            initialValue,
        );

        if (numberHashes > sumHashes) return;
        else if (evaluateSeq(inp, numHashInString)) {
            //console.log(inp);
            totals[totalI][i]++;
        }
        else {
            const idx = inp.indexOf("?");
            if (idx === -1) return;
            generateSeq(inp.replace("?", "#"), numHashInString, numberHashes + 1, i, totalI);
            generateSeq(inp.replace("?", "."), numHashInString, numberHashes, i, totalI);
        }
    };

    let totals: number[][] = [];
    let total1 = Array(stringSeq1.length).fill(0);
    totals.push(total1);

    for (let i = 0; i < stringSeq1.length; i++) {
        generateSeq(stringSeq1[i], numHashInString1[i], stringSeq1[i].split("").filter((e) => e === "#").length, i, 0);
    }

    const initialValue = 0;
    const output = totals[0].reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        initialValue,
    );

    console.log(output);

    if (Number(output) === expected) {
        console.log("OK");
    } else {
        console.error("Wrong");
    }
};

solve(false, "12", 525152);