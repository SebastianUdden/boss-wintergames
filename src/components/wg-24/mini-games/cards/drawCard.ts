// drawCard.ts

import { Dispatch, SetStateAction } from "react";
import { ICard, IPlayer, Phase } from "./types";

interface DrawCardProps {
  player: "Player One" | "Player Two";
  deck: ICard[];
  setDeck: Dispatch<SetStateAction<ICard[]>>;
  setPlayerOne: Dispatch<SetStateAction<IPlayer>>;
  setPlayerTwo: Dispatch<SetStateAction<IPlayer>>;
  phase: Phase;
  endDrawPhase: () => void;
}

export const drawCard = (props: DrawCardProps) => {
  const {
    player,
    deck,
    setDeck,
    setPlayerOne,
    setPlayerTwo,
    phase,
    endDrawPhase,
  } = props;

  if (phase !== "draw") {
    alert("You cannot draw a card at this time.");
    return;
  }

  if (deck.length === 0) {
    alert("No more cards in the deck!");
    return;
  }

  const card = deck[0];
  setDeck(deck.slice(1));

  if (player === "Player One") {
    setPlayerOne((prev) => ({ ...prev, hand: [...prev.hand, card] }));
  } else {
    setPlayerTwo((prev) => ({ ...prev, hand: [...prev.hand, card] }));
  }

  // Move to action phase after drawing a card
  endDrawPhase();
};
