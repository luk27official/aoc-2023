import { loadInput, writeOutput, compareTestFiles } from "../template/utils";

const solve = (realInput: boolean, solutionId: string, expected: number) => {
    let input: string[] = loadInput(solutionId, realInput);

    const ids: number[][] = [];

    type PointLoc = {
        value: number;
        x: number;
        y: number;
    };

    const points: PointLoc[] = [];

    let i = 1;
    for (const line of input) {
        const lineList: number[] = [];
        for (const char of line) {
            if (char === "#") {
                lineList.push(i);
                i++;
            }
            else lineList.push(0);
        }
        ids.push(lineList);
    }

    const horizontalHolesToFill: number[] = [];
    for (let i = 0; i < ids.length; i++) {
        if (ids[i].filter((e) => e === 0).length === ids[i].length) {
            horizontalHolesToFill.push(i);
        }
    }

    const verticalHolesToFill = [];
    for (let i = 0; i < ids[0].length; i++) {
        if (ids.filter((e) => e[i] === 0).length === ids.length) {
            verticalHolesToFill.push(i);
        }
    }

    for (let i = 0; i < ids.length; i++) {
        for (let y = 0; y < ids[i].length; y++) {
            if (ids[i][y] !== 0) {
                points.push({
                    value: ids[i][y],
                    x: i,
                    y: y
                });
            }
        }
    }

    let sum = 0;
    const maximal = Math.max(...ids.map((e) => Math.max(...e)));
    const stepSize = 1000000 - 1;

    for (let i = 1; i <= maximal; i++) {
        for (let j = i + 1; j <= maximal; j++) {
            const pt1 = points.find((e) => e.value === i)!;
            const pt2 = points.find((e) => e.value === j)!;

            const manhattanDist = Math.abs(pt1.x - pt2.x) + Math.abs(pt1.y - pt2.y)
                + stepSize * horizontalHolesToFill.filter((e: number) => Math.max(pt1.x, pt2.x) > e && e > Math.min(pt1.x, pt2.x)).length
                + stepSize * verticalHolesToFill.filter((e: number) => Math.max(pt1.y, pt2.y) > e && e > Math.min(pt1.y, pt2.y)).length;
            sum += manhattanDist;
        }
    }

    const output = sum;
    console.log(output);

    if (Number(output) === expected) {
        console.log("OK");
    } else {
        console.error("Wrong");
    }
};

solve(true, "11", 8410);