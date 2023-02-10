import { Spin } from "antd";
import { useEffect, useRef, useState } from "react";
import { last as _last, range as _range } from "lodash";
import { getNewDeck } from "../../api/cards-service";
import { Card } from "../../types/cards";
import { GameStatus } from "../../types/game";
import Player from "../../components/Player/Player";
import Welcome from "../Welcome/Welcome";
import ActionBar from "../../components/ActionBar/ActionBar";
import useDeck from "../../hooks/useDeck";
import "./Game.scss";

const Game = (): JSX.Element => {
    const wins = useRef(0);
    const [userName, setUsername] = useState<string>("");
    const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.LOADING);
    const [playerCards, setPlayerCards] = useState<Card[]>([]);
    const [dealerCards, setDealersCards] = useState<Card[]>([]);
    const { deck, drawCards } = useDeck([]);

    // recursive calculation of cards score -> if bigger than 21 change ace weight to 1
    const calculateWithAces = (score: number, aces: Card[]): number => {
        if (!aces.length || score <= 21) return score;
        if (score > 21) {
            aces.pop();
            score -= 10;
        }
        return calculateWithAces(score, aces);
    };

    // sum cards weight
    const totalScore = (cards: Card[]) => {
        const score = cards.reduce((acc, curr) => acc + curr.weight, 0);
        const aces = cards.filter((card) => card.value === "A");
        return calculateWithAces(score, aces);
    };

    // triggeres each change in status or cards
    useEffect(() => {
        if (gameStatus !== GameStatus.DEALER_TURN) return;

        // if dealer busted
        if (totalScore(dealerCards) > 21) {
            wins.current += 1;
            setGameStatus(GameStatus.WON);
            return;
        }
        // if dealer hand is higher
        if (totalScore(dealerCards) >= totalScore(playerCards)) {
            setGameStatus(GameStatus.LOST);
            return;
        }
        // if dealer hand is not higher and cannot draw over 18 (is this correct?)
        if (totalScore(dealerCards) > 17) {
            wins.current += 1;
            setGameStatus(GameStatus.WON);
            return;
        }
        // keep drawing if player has higher hand and dealer is less than 18
        const timeOut = setTimeout(() => {
            const cards = drawCards(1);
            setDealersCards((prevCards) => [...prevCards, ...cards]);
        }, 1000);

        return () => {
            clearTimeout(timeOut);
        };
    }, [dealerCards, gameStatus]);

    // start the game - set inital data
    const init = async (userName?: string) => {
        setGameStatus(GameStatus.LOADING);
        userName && setUsername((prev) => userName || prev);

        deck.current = await getNewDeck();

        setPlayerCards(drawCards(2));
        setDealersCards(drawCards(2));
        setGameStatus(GameStatus.PLAYER_TURN);
    };

    const hitMe = () => {
        const cards = drawCards(1);
        setPlayerCards((prevCards) => [...prevCards, ...cards]);
        if (totalScore([...playerCards, ...cards]) > 21) setGameStatus(GameStatus.LOST);
    };

    const stay = () => {
        setGameStatus(GameStatus.DEALER_TURN);
    };

    if (!userName) return <Welcome init={init} />;

    if (gameStatus === GameStatus.LOADING) return <Spin className="spinner" size="large" />;

    return (
        <div className="game-container">
            <Player
                cards={dealerCards}
                gameStatus={gameStatus}
                totalScore={totalScore(dealerCards)}
            />
            <ActionBar
                wins={wins.current}
                gameStatus={gameStatus}
                init={init}
                stay={stay}
                hitMe={hitMe}
                cardsLeft={deck.current.length}
            />
            <Player
                userName={userName}
                cards={playerCards}
                gameStatus={gameStatus}
                totalScore={totalScore(playerCards)}
            />
        </div>
    );
};

export default Game;
