import { loadInput, writeOutput, compareTestFiles } from "../template/utils";

const solve = (realInput: boolean, solutionId: string, expected: number) => {
    let input: string[] = loadInput(solutionId, realInput);

    let total = 0;

    for (let y = 0; y < input.length; y++) {
        const oneGame = input[y];
        const splitOneGame = oneGame.split(" ");
        const gameId = splitOneGame[1].replace(":", "");
        const cubes: any = {
            "red": 0,
            "green": 0,
            "blue": 0
        };

        let reset = false;
        let wrong = false;

        for (let i = 2; i < splitOneGame.length - 1; i++) {
            if (!Number.isNaN(splitOneGame[i])) {
                let row = splitOneGame[i + 1].replace(",", "");
                if (row.indexOf(";") != -1) reset = true;
                row = row.replace(";", "");
                if (row === "red") cubes.red += (Number(splitOneGame[i]));
                if (row === "blue") cubes.blue += (Number(splitOneGame[i]));
                if (row === "green") cubes.green += (Number(splitOneGame[i]));
            }

            if (cubes.red > 12 || cubes.green > 13 || cubes.blue > 14) {
                wrong = true;
            }

            if (reset) {
                cubes.red = 0;
                cubes.green = 0;
                cubes.blue = 0;
                reset = false;
            }
        }

        console.log(cubes);

        if (!wrong) {
            total += Number(gameId);
        }
    }


    const output = total;
    console.log(output);

    if (Number(output) === expected) {
        console.log("OK");
    } else {
        console.error("Wrong");
    }
};

solve(false, "02", 8);