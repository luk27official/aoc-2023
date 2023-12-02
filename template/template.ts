import * as fs from "fs";

const solutionId = "01";

const loadInput = (realInput: boolean) => {
    return fs.readFileSync(realInput ? `${solutionId}-input-real.txt` : `${solutionId}-input.txt`, 'utf8').toString().split("\n");
};

const writeOutput = (array: string[], real: boolean) => {
    const file = fs.createWriteStream(real ? `${solutionId}-output-real.txt` : `${solutionId}-output.txt`);
    array.forEach(value => file.write(`${value}\n`));
    file.end();
    file.on('error', function (err) {
        console.log(err);
    });
};

const compareTestFiles = () => {
    const file1 = fs.readFileSync(`${solutionId}-output.txt`);
    const file2 = fs.readFileSync(`${solutionId}-expected.txt`);

    return file1.equals(file2);
};

const solve = () => {
    const realInput = true;

    let input: string[] = loadInput(realInput);

    const output = input;

    writeOutput([output.toString()], realInput);
    console.log(output);

    if (compareTestFiles()) console.log("OK");
    else console.log("Test input wrong");
};

solve();