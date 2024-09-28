// Cards.tsx

import React, { useState, useEffect } from "react";
import { Cardboard } from "./cardboard/Cardboard";
import { drawCard } from "./drawCard";
import { playCard } from "./playCard";
import { cardTypes } from "./cards";
import { CardsView } from "./CardsView";

// Define card types
type CardType = "Attack" | "Heal";

interface Card {
  id: number;
  type: CardType;
  value: number;
}

interface Player {
  name: string;
  health: number;
  hand: Card[];
}

type Phase = "draw" | "action" | "discard";

export const CardsGame: React.FC = () => {
  // Initialize game state
  const [deck, setDeck] = useState<Card[]>([]);
  const [viewCards, setViewCards] = useState(true);
  const [discardPile, setDiscardPile] = useState<Card[]>([]);
  const [playerOne, setPlayerOne] = useState<Player>({
    name: "Player One",
    health: 10,
    hand: [],
  });
  const [playerTwo, setPlayerTwo] = useState<Player>({
    name: "Player Two",
    health: 10,
    hand: [],
  });
  const [currentPlayer, setCurrentPlayer] = useState<
    "Player One" | "Player Two"
  >("Player One");
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [phase, setPhase] = useState<Phase>("draw"); // 'draw', 'action', 'discard'

  // Generate a deck of 20 cards
  const generateDeck = (): Card[] => {
    const deck: Card[] = [];
    for (let i = 0; i < 20; i++) {
      deck.push({
        id: i,
        ...cardTypes[Math.floor(Math.random() * cardTypes.length)],
      });
    }
    return deck;
  };

  // Initialize the game
  useEffect(() => {
    const newDeck = generateDeck();
    setDeck(newDeck);

    // Deal 5 cards to each player
    const playerOneHand = newDeck.slice(0, 5);
    const playerTwoHand = newDeck.slice(5, 10);
    setPlayerOne((prev) => ({ ...prev, hand: playerOneHand }));
    setPlayerTwo((prev) => ({ ...prev, hand: playerTwoHand }));

    // Remove dealt cards from the deck
    setDeck(newDeck.slice(10));
  }, []);

  // Function to discard a card
  const discardCard = (
    player: "Player One" | "Player Two",
    cardIndex: number
  ) => {
    let discardedCard: Card;
    if (player === "Player One") {
      setPlayerOne((prev) => {
        const newHand = [...prev.hand];
        [discardedCard] = newHand.splice(cardIndex, 1);
        return { ...prev, hand: newHand };
      });
    } else {
      setPlayerTwo((prev) => {
        const newHand = [...prev.hand];
        [discardedCard] = newHand.splice(cardIndex, 1);
        return { ...prev, hand: newHand };
      });
    }

    // Add the discarded card to the discard pile
    setDiscardPile((prev) => [discardedCard, ...prev]);
    endDiscardPhase();
  };

  const endDrawPhase = () => {
    setPhase("action");
  };

  const endActionPhase = () => {
    setPhase("discard");
  };

  const endDiscardPhase = () => {
    setPhase("draw");
    setCurrentPlayer((prev) =>
      prev === "Player One" ? "Player Two" : "Player One"
    );
  };

  return (
    <>
      <button
        className="fixed z-10 right-5 bottom-5"
        onClick={() => setViewCards(!viewCards)}
      >
        {viewCards ? "Hide" : "Show"} cards
      </button>
      {viewCards ? (
        <CardsView />
      ) : (
        <Cardboard
          gameOver={gameOver}
          playerOne={playerOne}
          playerTwo={playerTwo}
          deck={deck}
          discardPile={discardPile}
          currentPlayer={currentPlayer}
          phase={phase}
          setDeck={setDeck}
          setPlayerOne={setPlayerOne}
          setPlayerTwo={setPlayerTwo}
          setGameOver={setGameOver}
          drawCard={drawCard}
          playCard={playCard}
          discardCard={discardCard}
          endActionPhase={endActionPhase}
          endDrawPhase={endDrawPhase}
        />
      )}
    </>
  );
};
