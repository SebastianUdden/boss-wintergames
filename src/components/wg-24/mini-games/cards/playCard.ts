// playCard.ts

import { Dispatch, SetStateAction } from "react";
import { ICard, IPlayer, Phase } from "./types";

interface PlayCardProps {
  player: "Player One" | "Player Two";
  cardIndex: number;
  playerOne: IPlayer;
  playerTwo: IPlayer;
  setPlayerOne: Dispatch<SetStateAction<IPlayer>>;
  setPlayerTwo: Dispatch<SetStateAction<IPlayer>>;
  setGameOver: Dispatch<SetStateAction<boolean>>;
  phase: Phase;
  discardCard: (player: "Player One" | "Player Two", cardIndex: number) => void;
}

export const playCard = (props: PlayCardProps) => {
  const {
    player,
    cardIndex,
    playerOne,
    playerTwo,
    setPlayerOne,
    setPlayerTwo,
    setGameOver,
    phase,
    discardCard,
  } = props;

  if (phase !== "action") {
    alert("You cannot play a card at this time.");
    return;
  }

  let card: ICard;
  if (player === "Player One") {
    card = playerOne.hand[cardIndex];
  } else {
    card = playerTwo.hand[cardIndex];
  }

  if (card.type === "Attack") {
    if (player === "Player One") {
      setPlayerTwo((prev) => {
        const newHealth = prev.health - card.value;
        if (newHealth <= 0) setGameOver(true);
        return { ...prev, health: newHealth > 0 ? newHealth : 0 };
      });
    } else {
      setPlayerOne((prev) => {
        const newHealth = prev.health - card.value;
        if (newHealth <= 0) setGameOver(true);
        return { ...prev, health: newHealth > 0 ? newHealth : 0 };
      });
    }
  } else if (card.type === "Heal") {
    if (player === "Player One") {
      setPlayerOne((prev) => ({
        ...prev,
        health: prev.health + card.value,
      }));
    } else {
      setPlayerTwo((prev) => ({
        ...prev,
        health: prev.health + card.value,
      }));
    }
  }

  // Remove the played card from the player's hand
  discardCard(player, cardIndex);
};
