// @ts-nocheck
import React from "react";
import { ICard, IPlayer, Phase } from "../types";
import { PlayerArea } from "./PlayerArea";
import { DeckArea } from "./DeckArea";

export interface CommonProps {
  deck: ICard[];
  setDeck: React.Dispatch<React.SetStateAction<ICard[]>>;
  setPlayerOne: React.Dispatch<React.SetStateAction<IPlayer>>;
  setPlayerTwo: React.Dispatch<React.SetStateAction<IPlayer>>;
  setGameOver: React.Dispatch<React.SetStateAction<boolean>>;
  phase: Phase;
  endDrawPhase: () => void;
  player?: string;
  cardIndex?: number;
  playerOne?: IPlayer;
  playerTwo?: IPlayer;
  discardCard?: (
    player: "Player One" | "Player Two",
    cardIndex: number
  ) => void;
}

interface CardboardProps {
  gameOver: boolean;
  playerOne: IPlayer;
  playerTwo: IPlayer;
  deck: ICard[];
  discardPile: ICard[];
  currentPlayer: "Player One" | "Player Two";
  phase: Phase;
  setDeck: React.Dispatch<React.SetStateAction<ICard[]>>;
  setPlayerOne: React.Dispatch<React.SetStateAction<IPlayer>>;
  setPlayerTwo: React.Dispatch<React.SetStateAction<IPlayer>>;
  setGameOver: React.Dispatch<React.SetStateAction<boolean>>;
  drawCard: (props: ICard) => void;
  playCard: (props: ICard) => void;
  discardCard: (player: "Player One" | "Player Two", cardIndex: number) => void;
  endActionPhase: () => void;
  endDrawPhase: () => void;
}

export const Cardboard: React.FC<CardboardProps> = ({
  gameOver,
  playerOne,
  playerTwo,
  deck,
  discardPile,
  currentPlayer,
  phase,
  setDeck,
  setPlayerOne,
  setPlayerTwo,
  setGameOver,
  drawCard,
  playCard,
  discardCard,
  endDrawPhase,
  endActionPhase,
}) => {
  // Common properties for actions
  const commonProps: CommonProps = {
    deck,
    setDeck,
    setPlayerOne,
    setPlayerTwo,
    setGameOver,
    phase,
    endDrawPhase,
  };

  return (
    <div>
      {gameOver && (
        <div className="mb-4 text-center">
          <h1>Game Over!</h1>
          <p>
            {playerOne.health <= 0 ? playerTwo.name : playerOne.name} is the
            winner!
          </p>
        </div>
      )}
      {/* Player One Area */}
      <PlayerArea
        player={playerOne}
        currentPlayer={currentPlayer}
        phase={phase}
        commonProps={commonProps}
        playCard={playCard}
        discardCard={discardCard}
        playerOne={playerOne}
        playerTwo={playerTwo}
      />

      {/* Deck and Discard Pile */}
      <DeckArea
        deck={deck}
        discardPile={discardPile}
        currentPlayer={currentPlayer}
        phase={phase}
        drawCard={drawCard}
        commonProps={commonProps}
      />

      {/* Player Two Area */}
      <PlayerArea
        player={playerTwo}
        currentPlayer={currentPlayer}
        phase={phase}
        commonProps={commonProps}
        playCard={playCard}
        discardCard={discardCard}
        playerOne={playerOne}
        playerTwo={playerTwo}
      />

      {/* End Action Phase Button */}
      {phase === "action" && currentPlayer && (
        <div style={{ textAlign: "center", margin: "20px" }}>
          <button onClick={endActionPhase}>End Action Phase</button>
        </div>
      )}

      {/* Discard Prompt */}
      {phase === "discard" &&
        currentPlayer &&
        ((currentPlayer === "Player One" && playerOne.hand.length > 7) ||
          (currentPlayer === "Player Two" && playerTwo.hand.length > 7)) && (
          <div style={{ textAlign: "center", margin: "20px" }}>
            <p>You have more than 7 cards. Please discard one.</p>
          </div>
        )}
    </div>
  );
};
