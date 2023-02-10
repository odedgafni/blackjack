import { Button } from "antd";
import { GameStatus } from "../../types/game";
import GameCard from "../Card/Card";
import "./ActionBar.scss";

interface props {
    wins: number;
    gameStatus: GameStatus;
    cardsLeft: number;
    hitMe: () => void;
    stay: () => void;
    init: (string?: string) => void;
}

const ActionBar = ({ gameStatus, hitMe, stay, init, cardsLeft, wins }: props) => {
    const disabled = gameStatus !== GameStatus.PLAYER_TURN;
    return (
        <div className="action-bar">
            {gameStatus === GameStatus.LOST ? (
                <div className="lost-message">You Lost...</div>
            ) : gameStatus === GameStatus.WON ? (
                <div className="won-message">You Won!</div>
            ) : (
                <>
                    <Button
                        className="app-btn"
                        type="primary"
                        size="large"
                        disabled={disabled}
                        onClick={hitMe}
                    >
                        Hit Me!
                    </Button>
                    <Button
                        className="app-btn"
                        type="primary"
                        size="large"
                        disabled={disabled}
                        onClick={stay}
                    >
                        Stay
                    </Button>
                </>
            )}
            <Button className="app-btn" type="default" size="large" onClick={() => init()}>
                Restart
            </Button>
            <div className="deck">
                <div>
                    <p className="text-info">Wins: {wins || 0}</p>
                    <GameCard isHidden />
                    <p className="text-info">Cards Left: {cardsLeft}</p>
                </div>
            </div>
        </div>
    );
};

export default ActionBar;
