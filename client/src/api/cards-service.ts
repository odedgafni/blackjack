import { shuffle as _shuffle } from "lodash";
import { Card, CardColor } from "../types/cards";

const sleep = async (ms: number) => new Promise((r) => setTimeout(r, ms));

const getWeight = (value: string): number =>
    ["J", "Q", "K"].includes(value) ? 10 : value === "A" ? 11 : Number(value);

export const shuffleDeck = (deck: Card[]): Card[] => _shuffle(deck);

export const getNewDeck = async (): Promise<Card[]> => {
    const suits = [
        { suit: "♦️", color: CardColor.RED },
        { suit: "♥️", color: CardColor.RED },
        { suit: "♣️", color: CardColor.BLACK },
        { suit: "♠️", color: CardColor.BLACK },
    ];
    const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

    const deck: Card[] = suits.flatMap(({ suit, color }) =>
        values.map((value) => ({
            value,
            color,
            suit,
            weight: getWeight(value),
        }))
    );
    await sleep(300);
    return shuffleDeck(deck);
};
