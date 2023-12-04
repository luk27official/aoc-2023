import { loadInput, writeOutput, compareTestFiles } from "../template/utils";

const solve = (realInput: boolean, solutionId: string, expected: number) => {
    let input: string[] = loadInput(solutionId, realInput);

    type Card = {
        id: number;
        winning: number[];
        all: number[];
        instances: number;
    };

    const cards: Card[] = [];

    for (const card of input) {
        const cardSplit = card.split(" ");
        const cardId = Number(cardSplit.find((e) => e.indexOf(":") !== -1)!.replace(":", ""));
        let w = [];
        let n = [];
        let winning = true;
        for (let i = 2; i < cardSplit.length; i++) {
            const symbol = cardSplit[i];
            if (symbol === "|") {
                winning = false;
                continue;
            }
            if (symbol === "") continue;

            if (winning) w.push(Number(symbol));
            else n.push(Number(symbol));
        }

        cards.push({
            id: cardId,
            winning: w,
            all: n,
            instances: 1
        });
    }

    const intersect = (a: number[], b: number[]) => {
        return a.filter(Set.prototype.has, new Set(b));
    };

    for (const w of cards) {
        const is = intersect(w.winning, w.all);
        if (is.length === 0) continue;
        const value = is.length;
        for (let y = 0; y < w.instances; y++) {
            for (let i = 1; i <= value; i++) {
                const card = cards.find((e: Card) => e.id === i + w.id);
                if (card) card.instances++;
            }
        }
    }

    const output = cards.reduce(
        (accumulator, cd) => accumulator + cd.instances,
        0,
    );

    console.log(output);
    if (Number(output) === expected) {
        console.log("OK");
    } else {
        console.error("Wrong");
    }
};

solve(true, "04", 30);