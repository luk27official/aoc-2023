import * as fs from "fs";

const loadInput = (realInput: boolean) => {
    return fs.readFileSync(realInput ? '01-input-real.txt' : '01-input.txt', 'utf8').toString().split("\n");
};

const writeOutput = (array: string[], real: boolean) => {
    const file = fs.createWriteStream(real ? '01-output-real.txt' : '01-output.txt');
    array.forEach(value => file.write(`${value}\n`));
    file.end();
    file.on('error', function (err) {
        console.log(err);
    });
};

const compareTestFiles = () => {
    const file1 = fs.readFileSync("01-output.txt");
    const file2 = fs.readFileSync("01-expected.txt");

    return file1.equals(file2);
};

const solve01 = () => {
    const realInput = true;

    let input: string[] = loadInput(realInput);

    const digits = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

    input = input.map((e: string) => {
        const matches = e.match(/(one)|(two)|(three)|(four)|(five)|(six)|(seven)|(eight)|(nine)/g);
        if (!matches) return e;
        const match = matches[0];
        const num = digits.indexOf(match) + 1;
        const str = num.toString();
        return e.replace(match!, match[0] + str + match[match.length - 1]);
    });


    const replaceLast = (x: string, y: string, z: string) => {
        var a = x.split("");
        a[x.lastIndexOf(y)] = z;
        return a.join("");
    };

    input = input.map((e: string) => {
        const matches = e.match(/(one)|(two)|(three)|(four)|(five)|(six)|(seven)|(eight)|(nine)/g);
        if (!matches) return e;
        const match = matches[matches.length - 1];
        const num = digits.indexOf(match) + 1;
        const str = num.toString();
        return replaceLast(e, match, match[0] + str + match[match.length - 1]);
    });

    console.log(input);

    const final = input.map((e: string) => e.replace(/[a-zA-Z]*/g, "")).map((e: string) => (e[0] + e[e.length - 1]));

    console.log(final);

    const initialValue = 0;
    const f = final.reduce(
        (accumulator, currentValue) => accumulator + Number(currentValue),
        initialValue,
    );

    writeOutput([f.toString()], realInput);
    console.log(f);

    if (compareTestFiles()) console.log("OK");
    else console.log("Test input wrong");
};

solve01();