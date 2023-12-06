import { loadInput, writeOutput, compareTestFiles } from "../template/utils";

const solve = (realInput: boolean, solutionId: string, expected: number) => {
    let input: string[] = loadInput(solutionId, realInput);

    const times: string[] = [];
    const distances: string[] = [];

    let parseTimes = true;

    for (const line of input) {
        const split = line.split(" ").filter((e) => e !== "" && e.indexOf(":") === -1);
        if (parseTimes) {
            split.forEach((e) => times.push(e));
            parseTimes = false;
        }
        else {
            split.forEach((e) => distances.push(e));
        }
    }

    const raceLen = Number(times.join(""));
    const dist = Number(distances.join(""));
    const fin = [];
    for (let i = 1; i < raceLen + 1; i++) {
        fin.push(i * (raceLen - i));
    }

    const final = [];
    final.push(fin.filter((e) => e > dist));

    let prod = 1;
    for (const fin of final) {
        prod *= fin.length;
    }
    const output = prod;

    console.log(output);

    if (Number(output) === expected) {
        console.log("OK");
    } else {
        console.error("Wrong");
    }
};

solve(true, "06", 71503);