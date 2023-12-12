import { loadInput, writeOutput, compareTestFiles } from "../template/utils";

const solve = (realInput: boolean, solutionId: string, expected: number) => {
    let input: string[] = loadInput(solutionId, realInput);

    const stringSeq: string[] = [];
    const numHashInString: number[][] = [];

    for (const line of input) {
        const split = line.split(" ");
        stringSeq.push(split[0]);
        numHashInString.push(split[1].split(",").map((e) => Number(e)));
    }

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
        if (currentNumHash) return false;
        return true;
    };

    let total = Array(stringSeq.length).fill(0);
    const generateSeq = (inp: string, numHashInString: number[], numberHashes: number, i: number) => {
        const initialValue = 0;
        const sumHashes = numHashInString.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            initialValue,
        );

        if (numberHashes > sumHashes) return;
        else if (evaluateSeq(inp, numHashInString)) {
            //console.log(inp);
            total[i]++;
        }
        else {
            const idx = inp.indexOf("?");
            if (idx === -1) return;
            generateSeq(inp.replace("?", "#"), numHashInString, numberHashes + 1, i);
            generateSeq(inp.replace("?", "."), numHashInString, numberHashes, i);
        }
    };

    for (let i = 0; i < stringSeq.length; i++) {
        generateSeq(stringSeq[i], numHashInString[i], stringSeq[i].split("").filter((e) => e === "#").length, i);
    }

    const initialValue = 0;
    const sum = total.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        initialValue,
    );

    const output = sum;

    console.log(total);
    console.log(sum);
    if (Number(output) === expected) {
        console.log("OK");
    } else {
        console.error("Wrong");
    }
};

solve(false, "12", 21);