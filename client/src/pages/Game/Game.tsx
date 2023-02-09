import { Spin } from "antd";
import { useCallback, useEffect, useRef, useState } from "react";
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
    const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.PLAYER_TURN);
    const [playerCards, setPlayerCards] = useState<Card[]>([]);
    const [dealerCards, setDealersCards] = useState<Card[]>([]);
    const { deck, drawCards } = useDeck(getNewDeck());

    const calculateWithAces = (score: number, aces: Card[]): number => {
        if(!aces.length || score <= 21) return score;
        if(score > 21) {
            aces.pop();
            score -= 10;
        }
        return calculateWithAces(score, aces)
    }

    const totalScore = (cards: Card[]) => {
        const score = cards.reduce((acc, curr) => acc + curr.weight, 0);
        const aces = cards.filter((card) => card.value === "A");
        return calculateWithAces(score, aces)
    };

    useEffect(() => {
        init();
    }, []);

    useEffect(() => {
        if (gameStatus !== GameStatus.DEALER_TURN) return;

        if (totalScore(dealerCards) > 21) {
            wins.current += 1
            setGameStatus(GameStatus.WON);
            return;
        }
        if (totalScore(dealerCards) >= totalScore(playerCards)) {
            setGameStatus(GameStatus.LOST);
            return;
        }
        const timeOut = setTimeout(() => {
            setDealersCards((prevCards) => [...prevCards, ...drawCards(1)]);
        }, 1000);

        return () => {
            clearTimeout(timeOut);
        };
    }, [dealerCards, gameStatus]);

    const init = async () => {
        deck.current = getNewDeck();
        setPlayerCards(drawCards(2));
        setDealersCards(drawCards(2));
        setGameStatus(GameStatus.PLAYER_TURN);
    };

    const hitMe = () => {
        const cards = drawCards(1);
        setTimeout(() => {
            setPlayerCards((prevCards) => [...prevCards, ...cards]);
            if (totalScore([...playerCards, ...cards]) > 21) setGameStatus(GameStatus.LOST);
        }, 100);
    };

    const stay = () => {
        setGameStatus(GameStatus.DEALER_TURN);
        if (totalScore(dealerCards) < totalScore(playerCards)) {
            setTimeout(() => {
                const cards = drawCards(1);
                setDealersCards((prevCards) => [...prevCards, ...cards]);
            }, 1000);
        }
    };

    if (!userName) return <Welcome setUsername={setUsername} />;

    if (!deck.current.length) return <Spin />;

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
