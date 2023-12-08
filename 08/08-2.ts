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

    let seqLeft: boolean[] = [];
    for (const char of LRseq) {
        if (char === "L") seqLeft.push(true);
        else seqLeft.push(false);
    }

    let leftMap = new Map();
    let rightMap = new Map();
    for (const node of nodes) {
        leftMap.set(node.name, nodes.find((n) => n.name === node.left)!);
        rightMap.set(node.name, nodes.find((n) => n.name === node.right)!);
    }

    let currentNodes = nodes.filter((node) => node.name.endsWith("A"));
    let total = 0;
    let i = 0;
    const cycles: number[][] = Array.from({ length: currentNodes.length }, () => []);
    const finalCycles: number[] = Array(currentNodes.length).fill(0);

    while (finalCycles.filter((fc) => fc !== 0).length != currentNodes.length || total === 0) {
        for (let y = 0; y < currentNodes.length; y++) {
            if (cycles[y].length === 2) {
                finalCycles[y] = cycles[y][1] - cycles[y][0];
                continue;
            }

            if (LRseq[i] === "L") currentNodes[y] = leftMap.get(currentNodes[y].name);
            else if (LRseq[i] === "R") currentNodes[y] = rightMap.get(currentNodes[y].name);

            if (currentNodes[y].name.endsWith("Z")) {
                cycles[y].push(total);
                continue;
            }
        }
        i = (i + 1) % LRseq.length;
        total++;
    }

    const gcd = (a: number, b: number): number => a ? gcd(b % a, a) : b;
    const lcm = (a: number, b: number) => a * b / gcd(a, b);

    const output = finalCycles.reduce(lcm);

    console.log(output);
    if (Number(output) === expected) {
        console.log("OK");
    } else {
        console.error("Wrong");
    }
};

solve(true, "08", 6);