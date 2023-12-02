import { loadInput, writeOutput, compareTestFiles } from "../template/utils";

const solve = (realInput: boolean, solutionId: string, expected: number) => {
    let input: string[] = loadInput(solutionId, realInput);

    let total = 0;

    for (let y = 0; y < input.length; y++) {
        const oneGame = input[y];
        const splitOneGame = oneGame.split(" ");
        const cubes: any = {
            "red": [],
            "green": [],
            "blue": []
        };

        for (let i = 2; i < splitOneGame.length - 1; i++) {
            if (!Number.isNaN(splitOneGame[i])) {
                let row = splitOneGame[i + 1].replace(",", "");
                row = row.replace(";", "");
                if (row === "red") cubes.red.push(Number(splitOneGame[i]));
                if (row === "blue") cubes.blue.push(Number(splitOneGame[i]));
                if (row === "green") cubes.green.push(Number(splitOneGame[i]));
            }
        }

        console.log(cubes);

        total += (Math.max(...cubes.blue) * Math.max(...cubes.red) * Math.max(...cubes.green));
    }


    const output = total;
    console.log(output);

    if (Number(output) === expected) {
        console.log("OK");
    } else {
        console.error("Wrong");
    }
};

solve(false, "02", 2286);