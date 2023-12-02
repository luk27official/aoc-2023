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
const solutionId = "02";
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
    let total = 0;
    for (let y = 0; y < input.length; y++) {
        const oneGame = input[y];
        const splitOneGame = oneGame.split(" ");
        const gameId = splitOneGame[1].replace(":", "");
        const cubes = {
            "red": [],
            "green": [],
            "blue": []
        };
        let reset = false;
        let wrong = false;
        for (let i = 2; i < splitOneGame.length - 1; i++) {
            if (!Number.isNaN(splitOneGame[i])) {
                let row = splitOneGame[i + 1].replace(",", "");
                if (row.indexOf(";") != -1)
                    reset = true;
                row = row.replace(";", "");
                if (row === "red")
                    cubes.red.push(Number(splitOneGame[i]));
                if (row === "blue")
                    cubes.blue.push(Number(splitOneGame[i]));
                if (row === "green")
                    cubes.green.push(Number(splitOneGame[i]));
            }
            // if (cubes.red > 12 || cubes.green > 13 || cubes.blue > 14) {
            // wrong = true;
            // }
            // if (reset) {
            //     cubes.red = 0;
            //     cubes.green = 0;
            //     cubes.blue = 0;
            //     reset = false;
            // }
        }
        console.log(cubes);
        if (!wrong) {
            total += (Math.max(...cubes.blue) * Math.max(...cubes.red) * Math.max(...cubes.green));
        }
    }
    const output = total;
    writeOutput([output.toString()], realInput);
    console.log(output);
    //if (compareTestFiles()) console.log("OK");
    //else console.log("Test input wrong");
};
solve();
