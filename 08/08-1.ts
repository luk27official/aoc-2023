import { loadInput, writeOutput, compareTestFiles } from "../template/utils";

const solve = (realInput: boolean, solutionId: string, expected: number) => {
    let input: string[] = loadInput(solutionId, realInput);

    let LRseq = "";

    type Node = {
        name: string;
        left: string;
        right: string;
    };

    const nodes: Node[] = [];

    for (const line of input) {
        if (line === "") continue;
        if (line.indexOf("=") === -1) {
            LRseq = line;
            continue;
        }
        const split = line.split("=");
        const splitRight = split[1].split(",");
        nodes.push({
            name: split[0].replaceAll(" ", ""),
            left: splitRight[0].replaceAll("(", "").replaceAll(" ", ""),
            right: splitRight[1].replaceAll(")", "").replaceAll(" ", ""),
        });
    }

    let current = nodes.find((node) => node.name === "AAA")!;
    let i = 0;
    let total = 0;
    while (current.name !== "ZZZ") {
        if (LRseq[i] === "L") current = nodes.find((node) => node.name === current.left)!;
        else if (LRseq[i] === "R") current = nodes.find((node) => node.name === current.right)!;

        if (i < LRseq.length - 1) i++;
        else i = 0;
        total++;
    }

    const output = total;

    console.log(output);
    if (Number(output) === expected) {
        console.log("OK");
    } else {
        console.error("Wrong");
    }
};

solve(true, "08", 6);