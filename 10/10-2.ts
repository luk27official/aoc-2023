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
        "S": [true, false, false, true], // !! THIS NEEDS TO BE SET ACCORDINGLY !! (it could be done with parsing, but whatever)
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

    const vertices: Point[] = [];
    const maximal = Math.max(...distances.map((dist) => Math.max(...dist)));
    let curr: Point | null = null;

    type Point = {
        x: number;
        y: number;
        val: number;
    };

    for (let i = 0; i < distances.length; i++) {
        for (let y = 0; y < distances[i].length; y++) {
            if (distances[i][y] === 0) {
                curr = { x: i, y: y, val: 0 };
                vertices.push(curr);
            }
        }
    }

    if (curr === null) return;

    while (curr.val !== maximal) {
        for (let i: number = curr.x - 1; i <= curr.x + 1; i++) {
            for (let y: number = curr.y - 1; y <= curr.y + 1; y++) {
                if (distances[i] && distances[i][y] === curr.val + 1) {
                    curr = { x: i, y: y, val: curr.val + 1 };
                    vertices.push(curr);
                }
            }
        }
    }

    outer: while (curr.val !== 0) {
        for (let i: number = curr.x - 2; i <= curr.x + 2; i++) {
            for (let y: number = curr.y - 2; y <= curr.y + 2; y++) {
                if (distances[i] && distances[i][y] === curr.val - 1) {
                    if (curr.val - 1 === 0) break outer;
                    else if (!vertices.find((e) => e.x === i && e.y === y)) {
                        curr = { x: i, y: y, val: curr.val - 1 };
                        vertices.push(curr);
                    }
                    else {
                        continue;
                    }
                }
            }
        }
    }

    const isPointInsidePolygon = (point: Point, polygon: Point[]) => {
        let isInside = false;
        const n = polygon.length;

        for (let i = 0, j = n - 1; i < n; j = i++) {
            const xi = polygon[i].x;
            const yi = polygon[i].y;
            const xj = polygon[j].x;
            const yj = polygon[j].y;

            const intersect = ((yi > point.y) !== (yj > point.y)) &&
                (point.x < ((xj - xi) * (point.y - yi)) / (yj - yi) + xi);

            if (intersect) {
                isInside = !isInside;
            }
        }

        return isInside;
    };

    const final = [];

    for (let i = 0; i < distances.length; i++) {
        for (let y = 0; y < distances[i].length; y++) {
            const pt = { x: i, y: y, val: distances[i][y] };
            if (isPointInsidePolygon(pt, vertices)) {
                final.push(pt);
            }
        }
    }

    const output = final.filter((e) => e.val === -1).length;
    console.log(output);

    if (Number(output) === expected) {
        console.log("OK");
    } else {
        console.error("Wrong");
    }
};

solve(true, "10", 10);