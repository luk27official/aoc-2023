import { loadInput, writeOutput, compareTestFiles } from "../template/utils";

function levenshteinDistance(s1: string, s2: string): number {
    const len1 = s1.length;
    const len2 = s2.length;

    const matrix: number[][] = [];

    // Initialize the matrix
    for (let i = 0; i <= len1; i++) {
        matrix[i] = [];
        matrix[i][0] = i;
    }

    for (let j = 0; j <= len2; j++) {
        matrix[0][j] = j;
    }

    // Fill the matrix
    for (let i = 1; i <= len1; i++) {
        for (let j = 1; j <= len2; j++) {
            const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
            matrix[i][j] = Math.min(
                matrix[i - 1][j] + 1,
                matrix[i][j - 1] + 1,
                matrix[i - 1][j - 1] + cost
            );
        }
    }

    // Return the Levenshtein distance
    return matrix[len1][len2];
}

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

    for (const matrix of matrices) {
        const matrixHashesHorizontal: string[] = [];
        const matrixHashesVertical: string[] = [];

        for (let i = 0; i < matrix.length; i++) {
            matrixHashesHorizontal.push(matrix[i].join(""));
        }

        const transposed = matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]));

        for (let i = 0; i < transposed.length; i++) {
            matrixHashesVertical.push(transposed[i].join(""));
        }

        // TODO
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

solve(false, "13", 400);