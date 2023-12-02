import { loadInput, writeOutput, compareTestFiles } from "./utils";

const solve = (realInput: boolean, solutionId: string) => {
    let input: string[] = loadInput(solutionId, realInput);

    const output = input;

    writeOutput(solutionId, [output.toString()], realInput);
    console.log(output);

    if (compareTestFiles(solutionId)) console.log("OK");
    else console.log("Test input wrong");
};

solve(false, "01");