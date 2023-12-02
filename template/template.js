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
const solutionId = "01";
const loadInput = (realInput) => {
    return fs.readFileSync(realInput ? `${solutionId}-input-real.txt` : `${solutionId}-input.txt`, 'utf8').toString().split("\n");
};
const writeOutput = (array, real) => {
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
    let input = loadInput(realInput);
    const output = input;
    writeOutput([output.toString()], realInput);
    console.log(output);
    if (compareTestFiles())
        console.log("OK");
    else
        console.log("Test input wrong");
};
solve();
