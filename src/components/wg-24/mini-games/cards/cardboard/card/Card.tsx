import React from "react";
import { ICard, IPlayer, Phase } from "../../types";
import { CardActions } from "./CardActions";
import { CardView } from "./CardView";
import { CommonProps } from "../Cardboard";

interface CardComponentProps {
  card: ICard;
  index: number;
  player: IPlayer;
  currentPlayer: string;
  phase: Phase;
  commonProps: CommonProps;
  playCard: (props: CommonProps) => void;
  discardCard: (player: string, cardIndex: number) => void;
  playerOne: IPlayer;
  playerTwo: IPlayer;
}

export const Card: React.FC<CardComponentProps> = ({
  card,
  index,
  player,
  currentPlayer,
  phase,
  commonProps,
  playCard,
  discardCard,
  playerOne,
  playerTwo,
}) => {
  const isCurrentPlayer = currentPlayer === player.name;
  const canPlayCard = isCurrentPlayer && phase === "action";
  const canDiscardCard =
    isCurrentPlayer && phase === "discard" && player.hand.length > 5;

  const handlePlayCard = () => {
    playCard({
      ...commonProps,
      player: player.name,
      cardIndex: index,
      playerOne,
      playerTwo,
      discardCard,
    });
  };

  const handleDiscardCard = () => {
    discardCard(player.name, index);
  };

  return (
    <div className="w-[250px] flex flex-col items-center gap-2 m-2">
      <CardView {...card} />
      <CardActions
        canPlayCard={canPlayCard}
        canDiscardCard={canDiscardCard}
        onPlayCard={handlePlayCard}
        onDiscardCard={handleDiscardCard}
      />
    </div>
  );
};
