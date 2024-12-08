import { useEffect, useState } from "react";
import { Card } from "./Card";
import { IScore, Score } from "../Score";
import { IPlayer } from "../cards/types";

const initialCards = [
  {
    id: 0,
    pairId: 0,
    isFlipped: false,
    isMatched: false,
    img: "/games/memory/meatclub.png",
  },
  {
    id: 1,
    pairId: 0,
    isFlipped: false,
    isMatched: false,
    img: "/games/memory/meatclub.png",
  },
  {
    id: 2,
    pairId: 1,
    isFlipped: false,
    isMatched: false,
    img: "/games/memory/mod.png",
  },
  {
    id: 3,
    pairId: 1,
    isFlipped: false,
    isMatched: false,
    img: "/games/memory/mod.png",
  },
  {
    id: 4,
    pairId: 2,
    isFlipped: false,
    isMatched: false,
    img: "/games/memory/curling.png",
  },
  {
    id: 5,
    pairId: 2,
    isFlipped: false,
    isMatched: false,
    img: "/games/memory/curling.png",
  },
  {
    id: 6,
    pairId: 3,
    isFlipped: false,
    isMatched: false,
    img: "/games/memory/drinks.png",
  },
  {
    id: 7,
    pairId: 3,
    isFlipped: false,
    isMatched: false,
    img: "/games/memory/drinks.png",
  },
  {
    id: 8,
    pairId: 4,
    isFlipped: false,
    isMatched: false,
    img: "/games/memory/icebath.png",
  },
  {
    id: 9,
    pairId: 4,
    isFlipped: false,
    isMatched: false,
    img: "/games/memory/icebath.png",
  },
  {
    id: 10,
    pairId: 5,
    isFlipped: false,
    isMatched: false,
    img: "/games/memory/chug.png",
  },
  {
    id: 11,
    pairId: 5,
    isFlipped: false,
    isMatched: false,
    img: "/games/memory/chug.png",
  },
  {
    id: 12,
    pairId: 6,
    isFlipped: false,
    isMatched: false,
    img: "/games/memory/driving.png",
  },
  {
    id: 13,
    pairId: 6,
    isFlipped: false,
    isMatched: false,
    img: "/games/memory/driving.png",
  },
  {
    id: 14,
    pairId: 7,
    isFlipped: false,
    isMatched: false,
    img: "/games/memory/lan.png",
  },
  {
    id: 15,
    pairId: 7,
    isFlipped: false,
    isMatched: false,
    img: "/games/memory/lan.png",
  },
  {
    id: 16,
    pairId: 8,
    isFlipped: false,
    isMatched: false,
    img: "/games/memory/vanlife.png",
  },
  {
    id: 17,
    pairId: 8,
    isFlipped: false,
    isMatched: false,
    img: "/games/memory/vanlife.png",
  },
  {
    id: 18,
    pairId: 9,
    isFlipped: false,
    isMatched: false,
    img: "/games/memory/poolboys.png",
  },
  {
    id: 19,
    pairId: 9,
    isFlipped: false,
    isMatched: false,
    img: "/games/memory/poolboys.png",
  },
  {
    id: 20,
    pairId: 10,
    isFlipped: false,
    isMatched: false,
    img: "/games/memory/archer.png",
  },
  {
    id: 21,
    pairId: 10,
    isFlipped: false,
    isMatched: false,
    img: "/games/memory/archer.png",
  },
].sort(() => Math.random() - 0.5);

interface IMemoryBoard {
  name?: string;
  players: IPlayer[][];
  onGameComplete: (playerScores: IScore[]) => void;
}

export const MemoryBoard = ({ players, onGameComplete }: IMemoryBoard) => {
  const [turn, setTurn] = useState(0);
  const [scores, setScores] = useState([0, 0]);
  const [cards, setCards] = useState(() => initialCards);
  const [winner, setWinner] = useState("");
  const [canFlip, setCanFlip] = useState(true);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  useEffect(() => {
    if (winner) {
      setTimeout(() => {
        onGameComplete(
          scores.map((s, i) => ({ score: s, player: players[i][0] }))
        );
      }, 2000);
    }
  }, [winner]);

  const handleKeyDown = (event: KeyboardEvent) => {
    const gridWidth = 6; // Number of cards in a row
    let newIndex = activeCardIndex;

    switch (event.key) {
      case "w": // Move up
        newIndex = (activeCardIndex - gridWidth + cards.length) % cards.length;
        break;
      case "s": // Move down
        newIndex = (activeCardIndex + gridWidth) % cards.length;
        break;
      case "a": // Move left
        newIndex = (activeCardIndex - 1 + cards.length) % cards.length;
        break;
      case "d": // Move right
        newIndex = (activeCardIndex + 1) % cards.length;
        break;
      case "Enter": // Flip the card
        handleCardClick(cards[activeCardIndex].id);
        break;
      default:
        return; // Ignore other keys
    }

    setActiveCardIndex(newIndex);
    event.preventDefault();
  };

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
          setScores([
            scores[0] + (turn === 0 ? 1 : 0),
            scores[1] + (turn === 1 ? 1 : 0),
          ]);
        } else {
          // Cards do not match
          newCards[firstCardIndex].isFlipped = false;
          newCards[secondCardIndex].isFlipped = false;
          setTurn(turn === 0 ? 1 : 0);
        }
        setFlippedCards(flippedCards.slice(0, flippedCards.length - 2));
        setCards(newCards);
        setCanFlip(true);
      }, 1000);
    }
  };

  useEffect(() => {
    if (cards.filter((c) => !c.isMatched).length === 0) {
      setTimeout(() => {
        setWinner((scores[0] > scores[1] ? players[0][0] : players[1][0]).name);
      }, 1500);
    }
  }, [cards, scores]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeCardIndex, canFlip]);

  if (!players || players.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center h-full gap-4">
      {winner ? (
        <h1 className="mx-auto -translate-y-[10vh]">The winner is {winner}!</h1>
      ) : (
        <>
          <div className="grid justify-center grid-cols-6 gap-2 m-auto">
            {cards.map((card, index) => (
              <Card
                key={card.id}
                {...card}
                onClick={() => handleCardClick(card.id)}
                isActive={index === activeCardIndex}
              />
            ))}
          </div>
          <div className="flex items-end justify-between w-full gap-2 m-auto">
            {players[0].length !== 0 && (
              <Score
                player={players[0][0]}
                score={scores[0]}
                isActive={turn === 0}
              />
            )}
            {/* <Button
          className="bg-green-700 hover:bg-green-500"
          onClick={() =>
          onGameComplete(
            scores.map((s, i) => ({ score: s, player: players[i] }))
            )
            }
            >
            Complete
            </Button> */}
            {players[1].length !== 0 && (
              <Score
                player={players[1][0]}
                score={scores[1]}
                isActive={turn === 1}
                isRight={true}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};
