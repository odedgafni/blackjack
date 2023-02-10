import { shuffle as _shuffle } from "lodash";
import { Card } from "../types/cards";
import { get } from "./request";

const ENDPOINT = "/deck";

interface GetNewDeckResponse {
    success: boolean;
    deck: Card[];
}

export const getNewDeck = async (): Promise<Card[]> => {
    try {
        const { data } = await get<GetNewDeckResponse>(ENDPOINT);
        const { deck } = data;
        return _shuffle(deck);
    } catch (error) {
        console.error("Failed to get new deck", error);
        return [];
    }
};
