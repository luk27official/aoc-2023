import * as fs from "fs";

export const loadInput = (solutionId: string, realInput: boolean) => {
    return fs.readFileSync(realInput ? `${solutionId}-input-real.txt` : `${solutionId}-input.txt`, 'utf8').toString().split("\n");
};

export const writeOutput = (solutionId: string, array: string[], real: boolean) => {
    const file = fs.createWriteStream(real ? `${solutionId}-output-real.txt` : `${solutionId}-output.txt`);
    array.forEach(value => file.write(`${value}\n`));
    file.end();
    file.on('error', function (err) {
        console.log(err);
    });
};

export const compareTestFiles = (solutionId: string) => {
    const file1 = fs.readFileSync(`${solutionId}-output.txt`);
    const file2 = fs.readFileSync(`${solutionId}-expected.txt`);

    return file1.equals(file2);
};

export const sum = <T>(array: T[], key: keyof T): number => {
    const output = array.reduce(
        (accumulator, item) => accumulator + (item[key] as number),
        0,
    );
    return output;
};