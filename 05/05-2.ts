import { loadInput, writeOutput, compareTestFiles } from "../template/utils";

const createMap = (destStart: number, sourceStart: number, size: number, map: Range[] | undefined) => {
    if (!map) map = [];
    map.push({
        begin: sourceStart,
        end: sourceStart + size - 1,
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

    let maps: Range[][] = [];
    let initial: number[] = [];
    let currentMap = undefined;

    for (const line of input) {
        if (line.indexOf("seeds") !== -1) {
            line.split(" ").forEach((token) => { if (!Number.isNaN(token)) initial.push(Number(token)); });
            continue;
        }
        if (line === "") continue;
        if (line.indexOf("map") !== -1) {
            if (currentMap === undefined) continue;
            maps.push(currentMap);
            currentMap = undefined;
            continue;
        }

        const split = line.split(" ");
        currentMap = createMap(Number(split[0]), Number(split[1]), Number(split[2]), currentMap);
    }

    maps.push(currentMap!);
    initial = initial.filter((e) => !isNaN(e));

    const fin = [];

    let idx = 0;
    for (let y = 0; y < initial.length; y += 2) {
        let inp = initial[y];
        let size = initial[y + 1];
        for (let i = inp; i < inp + size; i++) {
            let z = i;
            for (const map of maps) {
                const el = map.find((e: Range) => e.begin <= z && e.end >= z);
                if (el) {
                    const offset = z - el.begin;
                    z = el.beginValue + offset;
                }
            }
            if (fin.length - 1 < idx) fin.push(z);
            if (fin[idx] > z) fin[idx] = z;
        }
        idx++;
    }

    const output = Math.min(...fin.filter(e => !isNaN(e)));
    console.log(output);

    if (Number(output) === expected) {
        console.log("OK");
    } else {
        console.error("Wrong");
    }
};

solve(false, "05", 46);