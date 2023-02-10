import { Card as AntCard } from "antd";
import { CardProps } from "antd/es/card";
import classNames from "classnames";
import { Card } from "../../types/cards";
import "./Card.scss";

type props = {
    card?: Card;
    isHidden?: boolean;
} & CardProps;

const GameCard = ({ card, isHidden = false, ...props }: props) => {
    return (
        <div className="card-container">
            <div className={classNames("suit", { [card?.color || ""]: card?.color })}>
                {!isHidden ? card?.suit : ""}
            </div>
            <AntCard className={classNames("card", { hidden: isHidden })} {...props}>
                <AntCard.Meta className="card-value" title={!isHidden ? card?.value : ""} />
            </AntCard>
        </div>
    );
};

export default GameCard;
