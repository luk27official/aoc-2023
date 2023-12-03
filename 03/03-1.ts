import { loadInput, writeOutput, compareTestFiles } from "../template/utils";

const solve = (realInput: boolean, solutionId: string, expected: number) => {
    let input: string[] = loadInput(solutionId, realInput);

    type Num = {
        row: number;
        col: number;
        colLast: number;
        value: number;
    };

    let numbers: Num[] = [];
    let okNums: Num[] = [];

    for (let i = 0; i < input.length; i++) {
        const line = input[i];

        for (let y = 0; y < line.length; y++) {
            let symbol = line[y];

            let tempNum = 0;
            let firstY = y;
            while (symbol.match(/[0-9]/g)) {
                tempNum = tempNum * 10 + Number(symbol);
                symbol = line[y + 1];
                if (!symbol) break;
                y++;
            }

            if (tempNum != 0) {
                numbers.push({
                    row: i,
                    col: firstY,
                    colLast: firstY + tempNum.toString().length - 1,
                    value: tempNum
                });
            }
        }
    }


    for (let i = 0; i < input.length; i++) {
        const line = input[i];
        for (let y = 0; y < line.length; y++) {
            let symbol = line[y];

            if (symbol !== "." && !symbol.match(/[0-9]/g)) {
                // check neighboring cells - top
                const num = numbers.filter((e: Num) => e.row === i - 1 && (e.col <= y + 1) && (e.colLast >= y - 1));
                if (num) {
                    okNums.push(...num);
                }

                const numLeft = numbers.filter((e: Num) => e.row === i && e.colLast === y - 1);
                if (numLeft) {
                    okNums.push(...numLeft);
                }

                const numRight = numbers.filter((e: Num) => e.row === i && e.col === y + 1);
                if (numRight) {
                    okNums.push(...numRight);
                }

                const numBot = numbers.filter((e: Num) => e.row === i + 1 && e.col <= y + 1 && e.colLast >= y - 1);
                if (numBot) {
                    okNums.push(...numBot);
                }
            }
        }
    }

    const output = okNums.reduce(
        (accumulator, num) => accumulator + num.value,
        0,
    );

    console.log(okNums);
    console.log(numbers);

    console.log(output);
    if (Number(output) === expected) {
        console.log("OK");
    } else {
        console.error("Wrong");
    }
};

solve(true, "03", 4361);