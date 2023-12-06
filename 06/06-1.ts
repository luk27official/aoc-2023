import { loadInput, writeOutput, compareTestFiles } from "../template/utils";

const solve = (realInput: boolean, solutionId: string, expected: number) => {
    let input: string[] = loadInput(solutionId, realInput);

    const table: number[][] = [];
    // rows represent the number of seconds held
    // cols represent the total duration of the race

    const times: number[] = [];
    const distances: number[] = [];

    let parseTimes = true;

    for (const line of input) {
        const split = line.split(" ").filter((e) => e !== "" && e.indexOf(":") === -1);
        if (parseTimes) {
            split.forEach((e) => times.push(Number(e)));
            parseTimes = false;
        }
        else {
            split.forEach((e) => distances.push(Number(e)));
        }
    }

    const maxTime = Math.max(...times) + 1;
    for (let i = 0; i < maxTime; i++) {
        table.push([0]);
        if (i == 0) {
            for (let y = 0; y < maxTime; y++) {
                table[0].push(0); //never starts
            }
            continue;
        }

        for (let timeWait = 1; timeWait < maxTime; timeWait++) {
            table[i].push(timeWait * (i - timeWait));
        }
    }

    const final = [];

    for (let i = 0; i < distances.length; i++) {
        final.push(table[times[i]].filter((e) => e > distances[i]));
    }

    //console.table(table);
    console.log(final);
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

solve(true, "06", 288);