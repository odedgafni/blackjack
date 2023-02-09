import { shuffle as _shuffle } from "lodash";
import { Card } from "../types/cards";

const getWeight = (value: string): number =>
    ["J", "Q", "K"].includes(value) ? 10 : value === "A" ? 11 : Number(value);

export const shuffleDeck = (deck: Card[]): Card[] => _shuffle(deck);

export const getNewDeck = (): Card[] => {
    const suits = ["♦️", "♥️", "♣️", "♠️"];
    const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

    const deck: Card[] = suits.flatMap((suit) =>
        values.map((value) => {
            const weight = getWeight(value);
            return {
                value,
                suit,
                weight,
            };
        })
    );
    return shuffleDeck(deck);
};
