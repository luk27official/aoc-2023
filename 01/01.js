"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const loadInput = (realInput) => {
    return fs.readFileSync(realInput ? '01-input-real.txt' : '01-input.txt', 'utf8').toString().split("\n");
};
const writeOutput = (array, real) => {
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
    let input = loadInput(realInput);
    const digits = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
    input = input.map((e) => {
        const matches = e.match(/(one)|(two)|(three)|(four)|(five)|(six)|(seven)|(eight)|(nine)/g);
        if (!matches)
            return e;
        const match = matches[0];
        const num = digits.indexOf(match) + 1;
        const str = num.toString();
        return e.replace(match, match[0] + str + match[match.length - 1]);
    });
    const replaceLast = (x, y, z) => {
        var a = x.split("");
        a[x.lastIndexOf(y)] = z;
        return a.join("");
    };
    input = input.map((e) => {
        const matches = e.match(/(one)|(two)|(three)|(four)|(five)|(six)|(seven)|(eight)|(nine)/g);
        if (!matches)
            return e;
        const match = matches[matches.length - 1];
        const num = digits.indexOf(match) + 1;
        const str = num.toString();
        return replaceLast(e, match, match[0] + str + match[match.length - 1]);
    });
    console.log(input);
    const final = input.map((e) => e.replace(/[a-zA-Z]*/g, "")).map((e) => (e[0] + e[e.length - 1]));
    console.log(final);
    const initialValue = 0;
    const f = final.reduce((accumulator, currentValue) => accumulator + Number(currentValue), initialValue);
    writeOutput([f.toString()], realInput);
    console.log(f);
    if (compareTestFiles())
        console.log("OK");
    else
        console.log("Test input wrong");
};
solve01();
