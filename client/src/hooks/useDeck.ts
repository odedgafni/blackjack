import { useRef, useState } from "react"
import { Card } from "../types/cards"
import { range as _range } from "lodash";

const useDeck = (newDeck: Card[]) => {
    const deck = useRef(newDeck);

    const drawCards = (number: number): Card[] => {
        return _range(number).flatMap(() => deck.current.pop() || [])
    }

    return {deck, drawCards}
}

export default useDeck;