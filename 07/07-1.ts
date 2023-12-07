import { loadInput, writeOutput, compareTestFiles } from "../template/utils";

const solve = (realInput: boolean, solutionId: string, expected: number) => {
    let input: string[] = loadInput(solutionId, realInput);

    type PokerHand = {
        hand: string;
        bid: number;
        rank: number | undefined;
    };

    const pokerHands: PokerHand[] = [];

    for (const line of input) {
        const split = line.split(" ");
        pokerHands.push({
            hand: split[0],
            bid: Number(split[1]),
            rank: undefined
        });
    }

    // ranks: 5ofK, 4ofK, FH, 3ofK, TwoPair, OnePair, HC
    // so thats: 7, 6, 5, 4, 3, 2, 1
    // eval ranks
    for (const one of pokerHands) {
        const map = new Map();

        for (const entry of one.hand.split("")) {
            if (map.get(entry)) {
                map.set(entry, map.get(entry) + 1);
            }
            else map.set(entry, 1);
        }

        if (map.size === 1) {
            one.rank = 7;
        }

        else if (map.size === 2) {
            let foundFour = false;
            map.forEach((v, k) => {
                if (v === 4) foundFour = true;
            });
            if (foundFour) one.rank = 6;
            else one.rank = 5;
        }

        else if (map.size === 3) {
            let foundThree = false;
            map.forEach((v, k) => {
                if (v === 3) foundThree = true;
            });
            if (foundThree) one.rank = 4;
            else one.rank = 3;
        }

        else if (map.size === 4) {
            one.rank = 2;
        }

        else {
            one.rank = 1;
        }
    }

    const pokerHandsComparer = (a: PokerHand, b: PokerHand) => {
        let result = a.rank! - b.rank!;
        let i = 0;
        let AhandSplit = a.hand.split("").map((e) => e.replace("A", "14").replace("K", "13").replace("Q", "12")
            .replace("J", "11").replace("T", "10"));
        let BhandSplit = b.hand.split("").map((e) => e.replace("A", "14").replace("K", "13").replace("Q", "12")
            .replace("J", "11").replace("T", "10"));
        while (result === 0 && i < 5) {
            result = Number(AhandSplit[i]) - Number(BhandSplit[i]);
            i++;
        }

        return result;
    };

    pokerHands.sort((a, b) =>
        pokerHandsComparer(a, b)
    );

    let sum = 0;
    for (let i = 1; i <= pokerHands.length; i++) {
        sum += pokerHands[i - 1].bid * i;
    }

    const output = sum;

    console.log(output);
    if (Number(output) === expected) {
        console.log("OK");
    } else {
        console.error("Wrong");
    }
};

solve(true, "07", 6440);