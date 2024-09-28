import { useState } from "react";
import { Card } from "./Card";
import { Button } from "@/components/wg-24/ui/button";
import { IScore, Score } from "../Score";

const initialCards = [
  { id: 0, pairId: 0, isFlipped: false, isMatched: false },
  { id: 1, pairId: 0, isFlipped: false, isMatched: false },
  { id: 2, pairId: 1, isFlipped: false, isMatched: false },
  { id: 3, pairId: 1, isFlipped: false, isMatched: false },
  { id: 4, pairId: 2, isFlipped: false, isMatched: false },
  { id: 5, pairId: 2, isFlipped: false, isMatched: false },
  { id: 6, pairId: 3, isFlipped: false, isMatched: false },
  { id: 7, pairId: 3, isFlipped: false, isMatched: false },
  { id: 8, pairId: 4, isFlipped: false, isMatched: false },
  { id: 9, pairId: 4, isFlipped: false, isMatched: false },
  { id: 10, pairId: 5, isFlipped: false, isMatched: false },
  { id: 11, pairId: 5, isFlipped: false, isMatched: false },
  { id: 12, pairId: 6, isFlipped: false, isMatched: false },
  { id: 13, pairId: 6, isFlipped: false, isMatched: false },
  { id: 14, pairId: 7, isFlipped: false, isMatched: false },
  { id: 15, pairId: 7, isFlipped: false, isMatched: false },
  { id: 16, pairId: 8, isFlipped: false, isMatched: false },
  { id: 17, pairId: 8, isFlipped: false, isMatched: false },
  { id: 18, pairId: 9, isFlipped: false, isMatched: false },
  { id: 19, pairId: 9, isFlipped: false, isMatched: false },
  { id: 20, pairId: 10, isFlipped: false, isMatched: false },
  { id: 21, pairId: 10, isFlipped: false, isMatched: false },
  { id: 22, pairId: 11, isFlipped: false, isMatched: false },
  { id: 23, pairId: 11, isFlipped: false, isMatched: false },
  { id: 24, pairId: 12, isFlipped: false, isMatched: false },
  { id: 25, pairId: 12, isFlipped: false, isMatched: false },
  { id: 26, pairId: 13, isFlipped: false, isMatched: false },
  { id: 27, pairId: 13, isFlipped: false, isMatched: false },
  { id: 28, pairId: 14, isFlipped: false, isMatched: false },
  { id: 29, pairId: 14, isFlipped: false, isMatched: false },
].sort(() => Math.random() - 0.5);

interface IMemoryBoard {
  name?: string;
  players: [string, string];
  onGameComplete: (playerScores: IScore[]) => void;
}

export const MemoryBoard = ({ players, onGameComplete }: IMemoryBoard) => {
  const [scores, setScores] = useState([0, 0]);
  const [cards, setCards] = useState(() => initialCards);
  const [canFlip, setCanFlip] = useState(true);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);

  const handleCardClick = (id: number) => {
    const clickedCardIndex = cards.findIndex((card) => card.id === id);

    // If the card is already matched or flipped, ignore the click
    if (
      !canFlip ||
      cards[clickedCardIndex].isMatched ||
      cards[clickedCardIndex].isFlipped
    ) {
      return;
    }

    // Flip the card
    const newCards = [...cards];
    newCards[clickedCardIndex].isFlipped = true;
    setCards(newCards);
    setFlippedCards((prev) => [...prev, id]);

    // Check for a match if two cards are flipped
    if (flippedCards.length === 1) {
      const firstCardIndex = cards.findIndex(
        (card) => card.id === flippedCards[0]
      );
      const secondCardIndex = clickedCardIndex;

      setCanFlip(false);
      // Delay to allow users to see the cards before checking match
      setTimeout(() => {
        if (
          newCards[firstCardIndex].pairId === newCards[secondCardIndex].pairId
        ) {
          // Cards match
          newCards[firstCardIndex].isMatched = true;
          newCards[secondCardIndex].isMatched = true;
          setScores([scores[0] + 1000, scores[1]]);
        } else {
          // Cards do not match
          newCards[firstCardIndex].isFlipped = false;
          newCards[secondCardIndex].isFlipped = false;
        }
        setCards(newCards);
        setFlippedCards([]);
        setCanFlip(true);
      }, 1000);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex flex-wrap justify-center gap-2">
        {cards.map((card) => (
          <Card
            key={card.id}
            {...card}
            onClick={() => handleCardClick(card.id)}
          />
        ))}
      </div>
      <div className="flex items-end justify-between w-full gap-2 m-auto">
        <Score player={players[0]} score={scores[0]} />
        <Button
          className="bg-green-700 hover:bg-green-500"
          onClick={() =>
            onGameComplete(
              scores.map((s, i) => ({ score: s, player: players[i] }))
            )
          }
        >
          Complete
        </Button>
        <Score player={players[0]} score={scores[1]} />
      </div>
    </div>
  );
};
