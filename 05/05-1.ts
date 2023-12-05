import { loadInput, writeOutput, compareTestFiles } from "../template/utils";

const createMap = (destStart: number, sourceStart: number, size: number, map: Range[] | undefined) => {
    if (!map) map = [];

    map.push({
        begin: sourceStart,
        end: sourceStart + size,
        beginValue: destStart
    });

    return map;
};

type Range = {
    begin: number;
    end: number;
    beginValue: number;
};

const solve = (realInput: boolean, solutionId: string, expected: number) => {
    let input: string[] = loadInput(solutionId, realInput);

    const maps: Range[][] = [];
    const initial: number[] = [];
    let currentMap = undefined;

    for (const line of input) {
        if (line.indexOf("seeds") !== -1) {
            const split = line.split(" ");
            for (const token of split) {
                if (!Number.isNaN(token)) initial.push(Number(token));
            }
            continue;
        }

        if (line == "") {
            continue;
        }

        if (line.indexOf("map") !== -1) {
            if (currentMap === undefined) continue;
            maps.push(currentMap);
            currentMap = undefined;
        }

        const split = line.split(" ");
        currentMap = createMap(Number(split[0]), Number(split[1]), Number(split[2]), currentMap);
    }

    maps.push(currentMap!);

    const fin = [];
    for (let inp of initial) {
        for (const map of maps) {
            const el = map.find((e: Range) => e.begin <= inp && e.end >= inp);
            if (el) {
                const offset = inp - el.begin;
                inp = el.beginValue + offset;
            }
        }
        fin.push(inp);
    }

    const output = Math.min(...fin.filter(e => !isNaN(e)));

    console.log(output);

    if (Number(output) === expected) {
        console.log("OK");
    } else {
        console.error("Wrong");
    }
};

solve(false, "05", 35);