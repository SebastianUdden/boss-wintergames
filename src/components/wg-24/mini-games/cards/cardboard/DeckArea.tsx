import React from "react";
import { ICard, Phase } from "../types";
import { CommonProps } from "./Cardboard";

interface DeckAreaProps {
  deck: ICard[];
  discardPile: ICard[];
  currentPlayer: "Player One" | "Player Two";
  phase: Phase;
  drawCard: (props: CommonProps) => void;
  commonProps: CommonProps;
}

export const DeckArea: React.FC<DeckAreaProps> = ({
  deck,
  discardPile,
  currentPlayer,
  phase,
  drawCard,
  commonProps,
}) => {
  return (
    <div style={{ textAlign: "center", margin: "20px" }}>
      <h2>Deck</h2>
      <p>Cards Remaining: {deck.length}</p>
      {phase === "draw" && (
        <button
          onClick={() =>
            drawCard({
              ...commonProps,
              player: currentPlayer,
            })
          }
        >
          Draw Card
        </button>
      )}
      <div style={{ marginTop: "20px" }}>
        <h2>Discard Pile</h2>
        {discardPile.length > 0 ? (
          <div
            style={{
              border: "1px solid gray",
              padding: "5px",
              display: "inline-block",
            }}
          >
            <p>{discardPile[0].type}</p>
            <p>Value: {discardPile[0].value}</p>
          </div>
        ) : (
          <p>Empty</p>
        )}
      </div>
    </div>
  );
};
