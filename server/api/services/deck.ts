import { Card, CardColor } from "../types";
import { sleep } from "../utils";

class DeckService {
    private getWeight(value: string): number {
        return ["J", "Q", "K"].includes(value) ? 10 : value === "A" ? 11 : Number(value);
    }

    async newDeck() {
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
                weight: this.getWeight(value),
            }))
        );
        // mimic an actual request (just for the feel)
        await sleep(300);
        return deck;
    }
}

export default new DeckService();
