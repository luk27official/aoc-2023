import { loadInput, writeOutput, compareTestFiles } from "../template/utils";

const solve = (realInput: boolean, solutionId: string, expected: number) => {
    let input: string[] = loadInput(solutionId, realInput);
    const matrices: string[][][] = [];

    let totalsumv = 0;
    let totalsumh = 0;

    for (const line of input) {
        if (line === "") {
            matrices.push([]);
            continue;
        }
        matrices[matrices.length - 1].push(line.split(""));
    }

    const hashCode = (str: string) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            let chr = str.charCodeAt(i);
            hash = (hash << 5) - hash + chr;
            hash |= 0;
        }
        return hash;
    };

    for (const matrix of matrices) {
        const matrixHashesHorizontal: number[] = [];
        const matrixHashesVertical: number[] = [];

        for (let i = 0; i < matrix.length; i++) {
            matrixHashesHorizontal.push(hashCode(matrix[i].join("")));
        }

        const transposed = matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]));

        for (let i = 0; i < transposed.length; i++) {
            matrixHashesVertical.push(hashCode(transposed[i].join("")));
        }

        const horIndices: number[] = [];
        matrixHashesHorizontal.forEach((e, idx) => {
            if (e === matrixHashesHorizontal[idx + 1]) horIndices.push(idx);
        });
        const horOk = [];

        for (const idx of horIndices) {
            let ok = true;
            for (let i = idx; i >= 0; i--) {
                let y = idx - i + idx + 1;
                //console.log(i, y);
                if (!matrixHashesHorizontal[i] || !matrixHashesHorizontal[y]) {
                    break;
                }
                if (matrixHashesHorizontal[i] !== matrixHashesHorizontal[y]) {
                    ok = false;
                }
            }
            if (ok) {
                horOk.push(idx + 1);
            }
        }

        const verIndices: number[] = [];
        matrixHashesVertical.forEach((e, idx) => {
            if (e === matrixHashesVertical[idx + 1]) verIndices.push(idx);
        });
        const verOk = [];

        for (const idx of verIndices) {
            let ok = true;
            for (let i = idx; i >= 0; i--) {
                let y = idx - i + idx + 1;
                if (!matrixHashesVertical[i] || !matrixHashesVertical[y]) {
                    break;
                }
                if (matrixHashesVertical[i] !== matrixHashesVertical[y]) {
                    ok = false;
                }
            }
            if (ok) {
                verOk.push(idx + 1);
            }
        }

        const initialValue = 0;
        const horSum = horOk.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            initialValue,
        );

        const verSum = verOk.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            initialValue,
        );

        totalsumh += horSum;
        totalsumv += verSum;
    }

    const output = totalsumh * 100 + totalsumv;
    console.log(output);
    if (Number(output) === expected) {
        console.log("OK");
    } else {
        console.error("Wrong");
    }
};

solve(true, "13", 405);