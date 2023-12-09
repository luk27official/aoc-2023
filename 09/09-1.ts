import { loadInput, writeOutput, compareTestFiles } from "../template/utils";

const solve = (realInput: boolean, solutionId: string, expected: number) => {
    let input: string[] = loadInput(solutionId, realInput);

    const seqs: Sequence[] = [];

    type Sequence = {
        id: number;
        history: number[][];
    };

    let i = 0;
    for (const line of input) {
        seqs.push({
            id: i,
            history: [line.split(" ").map((e) => Number(e))]
        });
        i++;
    }

    for (const seq of seqs) {
        let run = 0;
        while (seq.history[run].find((e) => e !== 0)) {
            const newSeq = [];
            for (let y = 0; y < seq.history[run].length - 1; y++) {
                newSeq.push(seq.history[run][y + 1] - seq.history[run][y]);
            }
            seq.history.push(newSeq);
            run++;
        }
    }

    const final = [];

    for (const seq of seqs) {
        seq.history[seq.history.length - 1].push(0);
        for (let i = seq.history.length - 2; i >= 0; i--) {
            const lower = seq.history[i + 1];
            seq.history[i].push(lower[lower.length - 1] + seq.history[i][seq.history[i].length - 1]);
        }
        final.push(seq.history[0][seq.history[0].length - 1]);
    }

    const initialValue = 0;
    const output = final.reduce(
        (accumulator, currentValue) => accumulator + Number(currentValue),
        initialValue,
    );

    console.log(output);
    if (Number(output) === expected) {
        console.log("OK");
    } else {
        console.error("Wrong");
    }
};

solve(true, "09", 114);