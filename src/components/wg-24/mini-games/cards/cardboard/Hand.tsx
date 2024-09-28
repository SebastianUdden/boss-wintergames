// @ts-nocheck
import React from "react";
import { ICard, IPlayer, Phase } from "../types";
import { Card } from "./card/Card";

interface HandProps {
  hand: ICard[];
  player: IPlayer;
  currentPlayer: "Player One" | "Player Two";
  phase: Phase;
  commonProps: ICard;
  playCard: (props: ICard) => void;
  discardCard: (player: "Player One" | "Player Two", cardIndex: number) => void;
  playerOne: IPlayer;
  playerTwo: IPlayer;
}

export const Hand: React.FC<HandProps> = ({
  hand,
  player,
  currentPlayer,
  phase,
  commonProps,
  playCard,
  discardCard,
  playerOne,
  playerTwo,
}) => {
  return (
    <div className="flex flex-wrap">
      {hand.map((card, index) => (
        <Card
          key={card.id}
          card={card}
          index={index}
          player={player}
          currentPlayer={currentPlayer}
          phase={phase}
          commonProps={commonProps}
          playCard={playCard}
          discardCard={discardCard}
          playerOne={playerOne}
          playerTwo={playerTwo}
        />
      ))}
    </div>
  );
};
