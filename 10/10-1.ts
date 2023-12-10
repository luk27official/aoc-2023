import { loadInput, writeOutput, compareTestFiles } from "../template/utils";

const solve = (realInput: boolean, solutionId: string, expected: number) => {
    let input: string[] = loadInput(solutionId, realInput);
    let parsedInput: NodeDir[][] = [];
    const distances: number[][] = Array.from({ length: input[0].length }, () => Array(input[0].length).fill(-1));

    type NodeDir = {
        left: boolean;
        right: boolean;
        up: boolean;
        down: boolean;
    };

    const m = {
        "-": [true, true, false, false],
        "|": [false, false, true, true],
        "L": [false, true, true, false],
        "J": [true, false, true, false],
        "7": [true, false, false, true],
        "F": [false, true, false, true],
        ".": [false, false, false, false],
        "S": [true, false, false, true], // !! THIS NEEDS TO BE SET ACCORDINGLY !! (it could be done with parsing, but whatever, im too lazy)
    };

    const map = new Map(Object.entries(m));

    for (let i = 0; i < input.length; i++) {
        parsedInput.push([]);
        for (let y = 0; y < input[i].length; y++) {
            const dirs = map.get(input[i][y])!;
            parsedInput[i].push({
                left: dirs[0],
                right: dirs[1],
                up: dirs[2],
                down: dirs[3]
            });
        }
    }

    let sx = 0, sy = 0;

    // find the starting point
    for (let i = 0; i < input.length; i++) {
        for (let y = 0; y < input[i].length; y++) {
            if (input[i][y] === "S") {
                sx = i;
                sy = y;
            }
        }
    }

    const seen: number[][] = [];
    const q = [parsedInput[sx][sy]];
    const qd = [0];
    const qt = [[sx, sy]];

    // simple BFS that finds the nearest distances...
    while (q.length > 0) {
        let current = q.shift();
        let currentIdx = qd.shift();
        let pos = qt.shift();

        if (current === undefined || currentIdx === undefined || pos === undefined) {
            break;
        }

        sx = pos[0];
        sy = pos[1];

        if (input[sx][sy] === ".") continue;
        if (seen.find((e) => e[0] === sx && e[1] === sy)) continue;

        distances[sx][sy] = currentIdx;

        if (current.left && sy - 1 >= 0) {
            q.push(parsedInput[sx][sy - 1]);
            qd.push(currentIdx + 1);
            qt.push([sx, sy - 1]);
        }
        if (current.right && sy + 1 < parsedInput[sx].length) {
            q.push(parsedInput[sx][sy + 1]);
            qd.push(currentIdx + 1);
            qt.push([sx, sy + 1]);
        }
        if (current.up && sx - 1 >= 0) {
            q.push(parsedInput[sx - 1][sy]);
            qd.push(currentIdx + 1);
            qt.push([sx - 1, sy]);
        }
        if (current.down && sx + 1 < parsedInput.length) {
            q.push(parsedInput[sx + 1][sy]);
            qd.push(currentIdx + 1);
            qt.push([sx + 1, sy]);
        }

        seen.push([sx, sy]);
    }

    const output = Math.max(...distances.map((dist) => Math.max(...dist)));
    console.log(output);

    if (Number(output) === expected) {
        console.log("OK");
    } else {
        console.error("Wrong");
    }
};

solve(true, "10", 8);