import classnames from "classnames";
import classNames from "classnames";
import { Card } from "../../types/cards";
import { GameStatus } from "../../types/game";
import GameCard from "../Card/Card";
import "./Player.scss";

interface props {
    userName?: string;
    cards: Card[];
    gameStatus: GameStatus;
    totalScore: number;
}

const Player = ({ userName, cards, gameStatus, totalScore }: props) => {
    const isUser = !!userName;

    const isHidden = (cardIndex: number) => {
        if (gameStatus !== GameStatus.PLAYER_TURN) return false;
        return !isUser && cardIndex !== 1;
    };

    const displayScore =
        !isUser && gameStatus === GameStatus.PLAYER_TURN
            ? totalScore - (cards[0]?.weight || 0)
            : totalScore;

    return (
        <div className="player-container">
            <div className="cards">
                {cards.map((card, index) => (
                    <GameCard
                        key={card.value + card.suit}
                        card={cards[index]}
                        isHidden={isHidden(index)}
                        hoverable={!!userName}
                    />
                ))}
            </div>
            <div className="player-name">
                {userName || "The House"}
                <b
                    className={classnames({
                        "red-color": displayScore > 21,
                        "green-color": displayScore === 21,
                    })}
                >
                    : {displayScore}
                </b>
            </div>
        </div>
    );
};

export default Player;
