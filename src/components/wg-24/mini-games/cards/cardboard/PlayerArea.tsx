// PlayerArea.tsx

import React from "react";
import { IPlayer, Phase } from "../types";
import { Hand } from "./Hand";
import { cn } from "@/lib/utils";

interface PlayerAreaProps {
  player: IPlayer;
  currentPlayer: "Player One" | "Player Two";
  phase: Phase;
  commonProps: any;
  playCard: (props: any) => void;
  discardCard: (player: "Player One" | "Player Two", cardIndex: number) => void;
  playerOne: IPlayer;
  playerTwo: IPlayer;
}

export const PlayerArea: React.FC<PlayerAreaProps> = ({
  player,
  currentPlayer,
  phase,
  commonProps,
  playCard,
  discardCard,
  playerOne,
  playerTwo,
}) => {
  // Determine if this player is the current player
  const isCurrentPlayer = player.name === currentPlayer;

  return (
    <div
      className={cn("border p-4 rounded-xl", {
        "border-gray-900 bg-gray-900": isCurrentPlayer,
        "border-gray-900": !isCurrentPlayer,
      })}
    >
      <h2 className="text-xl font-bold">{player.name}</h2>
      <p className="mb-2">Health: {player.health}</p>
      <div>
        <h3 className="text-lg font-semibold">Hand:</h3>
        <Hand
          hand={player.hand}
          player={player}
          currentPlayer={currentPlayer}
          phase={phase}
          commonProps={commonProps}
          playCard={playCard}
          discardCard={discardCard}
          playerOne={playerOne}
          playerTwo={playerTwo}
        />
      </div>
    </div>
  );
};
