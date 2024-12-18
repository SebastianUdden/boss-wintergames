import { useEffect, useState } from "react";
import { Card, ICard } from "./Card";
import { IScore, Score } from "../Score";
import { MatchedCards } from "./MatchedCards";
import { IPlayer } from "../../teams/players";
import { provideScoresOnWinner, Winner } from "../Winner";
import { IMiniGameBase } from "../MiniGame";

const initialCards2 = [
  {
    id: 0,
    pairId: 0,
    isFlipped: false,
    img: "/games/memory/meatclub.png",
    matchedBy: 0,
  },
  {
    id: 1,
    pairId: 0,
    isFlipped: false,
    img: "/games/memory/meatclub.png",
    matchedBy: 0,
  },
  {
    id: 2,
    pairId: 1,
    isFlipped: false,
    img: "/games/memory/mod.png",
    matchedBy: 0,
  },
  {
    id: 3,
    pairId: 1,
    isFlipped: false,
    img: "/games/memory/mod.png",
    matchedBy: 0,
  },
  {
    id: 4,
    pairId: 2,
    isFlipped: false,
    img: "/games/memory/curling.png",
    matchedBy: 0,
  },
  {
    id: 5,
    pairId: 2,
    isFlipped: false,
    img: "/games/memory/curling.png",
    matchedBy: 0,
  },
  {
    id: 6,
    pairId: 3,
    isFlipped: false,
    img: "/games/memory/drinks.png",
    matchedBy: 0,
  },
  {
    id: 7,
    pairId: 3,
    isFlipped: false,
    img: "/games/memory/drinks.png",
    matchedBy: 0,
  },
  {
    id: 8,
    pairId: 4,
    isFlipped: false,
    img: "/games/memory/icebath.png",
    matchedBy: 0,
  },
  {
    id: 9,
    pairId: 4,
    isFlipped: false,
    img: "/games/memory/icebath.png",
    matchedBy: 0,
  },
  {
    id: 10,
    pairId: 5,
    isFlipped: false,
    img: "/games/memory/chug.png",
    matchedBy: 0,
  },
  {
    id: 11,
    pairId: 5,
    isFlipped: false,
    img: "/games/memory/chug.png",
    matchedBy: 0,
  },
  {
    id: 12,
    pairId: 6,
    isFlipped: false,
    img: "/games/memory/driving.png",
    matchedBy: 0,
  },
  {
    id: 13,
    pairId: 6,
    isFlipped: false,
    img: "/games/memory/driving.png",
    matchedBy: 0,
  },
  {
    id: 14,
    pairId: 7,
    isFlipped: false,
    img: "/games/memory/lan.png",
    matchedBy: 0,
  },
  {
    id: 15,
    pairId: 7,
    isFlipped: false,
    img: "/games/memory/lan.png",
    matchedBy: 0,
  },
  {
    id: 16,
    pairId: 8,
    isFlipped: false,
    img: "/games/memory/vanlife.png",
    matchedBy: 0,
  },
  {
    id: 17,
    pairId: 8,
    isFlipped: false,
    img: "/games/memory/vanlife.png",
    matchedBy: 0,
  },
  {
    id: 18,
    pairId: 9,
    isFlipped: false,
    img: "/games/memory/poolboys.png",
    matchedBy: 1,
  },
  {
    id: 19,
    pairId: 9,
    isFlipped: false,
    img: "/games/memory/poolboys.png",
    matchedBy: 1,
  },
  {
    id: 20,
    pairId: 10,
    isFlipped: false,
    img: "/games/memory/archer.png",
  },
  {
    id: 21,
    pairId: 10,
    isFlipped: false,
    img: "/games/memory/archer.png",
  },
].sort(() => Math.random() - 0.5);

const initialCards: ICard[] = [
  {
    id: 0,
    pairId: 0,
    isFlipped: false,
    img: "/games/memory/meatclub.png",
  },
  {
    id: 1,
    pairId: 0,
    isFlipped: false,
    img: "/games/memory/meatclub.png",
  },
  {
    id: 2,
    pairId: 1,
    isFlipped: false,
    img: "/games/memory/mod.png",
  },
  {
    id: 3,
    pairId: 1,
    isFlipped: false,
    img: "/games/memory/mod.png",
  },
  {
    id: 4,
    pairId: 2,
    isFlipped: false,
    img: "/games/memory/curling.png",
  },
  {
    id: 5,
    pairId: 2,
    isFlipped: false,
    img: "/games/memory/curling.png",
  },
  {
    id: 6,
    pairId: 3,
    isFlipped: false,
    img: "/games/memory/drinks.png",
  },
  {
    id: 7,
    pairId: 3,
    isFlipped: false,
    img: "/games/memory/drinks.png",
  },
  {
    id: 8,
    pairId: 4,
    isFlipped: false,
    img: "/games/memory/icebath.png",
  },
  {
    id: 9,
    pairId: 4,
    isFlipped: false,
    img: "/games/memory/icebath.png",
  },
  {
    id: 10,
    pairId: 5,
    isFlipped: false,
    img: "/games/memory/chug.png",
  },
  {
    id: 11,
    pairId: 5,
    isFlipped: false,
    img: "/games/memory/chug.png",
  },
  {
    id: 12,
    pairId: 6,
    isFlipped: false,
    img: "/games/memory/driving.png",
  },
  {
    id: 13,
    pairId: 6,
    isFlipped: false,
    img: "/games/memory/driving.png",
  },
  {
    id: 14,
    pairId: 7,
    isFlipped: false,
    img: "/games/memory/lan.png",
  },
  {
    id: 15,
    pairId: 7,
    isFlipped: false,
    img: "/games/memory/lan.png",
  },
  {
    id: 16,
    pairId: 8,
    isFlipped: false,
    img: "/games/memory/vanlife.png",
  },
  {
    id: 17,
    pairId: 8,
    isFlipped: false,
    img: "/games/memory/vanlife.png",
  },
  {
    id: 18,
    pairId: 9,
    isFlipped: false,
    img: "/games/memory/poolboys.png",
  },
  {
    id: 19,
    pairId: 9,
    isFlipped: false,
    img: "/games/memory/poolboys.png",
  },
  {
    id: 20,
    pairId: 10,
    isFlipped: false,
    img: "/games/memory/archer.png",
  },
  {
    id: 21,
    pairId: 10,
    isFlipped: false,
    img: "/games/memory/archer.png",
  },
].sort(() => Math.random() - 0.5);

export const MemoryBoard = ({ players, onGameComplete }: IMiniGameBase) => {
  const [turn, setTurn] = useState<0 | 1>(0);
  const [cards, setCards] = useState(() => initialCards);
  const [scores, setScores] = useState(() => [
    initialCards.reduce((sum, c) => sum + (c.matchedBy === 0 ? 1 : 0), 0) / 2,
    initialCards.reduce((sum, c) => sum + (c.matchedBy === 1 ? 1 : 0), 0) / 2,
  ]);
  const [matchedCards, setMatchedCards] = useState<ICard[]>(
    cards.filter((c) => c.matchedBy !== undefined)
  );
  const [winner, setWinner] = useState("");
  const [canFlip, setCanFlip] = useState(true);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  useEffect(() => {
    provideScoresOnWinner({ onGameComplete, players, winner });
  }, [winner, players]);

  const handleKeyDown = (event: KeyboardEvent) => {
    const gridWidth = 6; // Number of cards in a row
    let newIndex = activeCardIndex;
    if (!canFlip) return;
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
        newIndex = (newIndex + 1) % cards.length;
        event.preventDefault();
        break;
      default:
        return; // Ignore other keys
    }

    while (
      (cards[newIndex]?.isFlipped ||
        cards[newIndex]?.matchedBy !== undefined) &&
      event.key !== "Enter"
    ) {
      switch (event.key) {
        case "w":
          newIndex = (newIndex - gridWidth + cards.length) % cards.length;
          break;
        case "s":
          newIndex = (newIndex + gridWidth) % cards.length;
          break;
        case "a":
          newIndex = (newIndex - 1 + cards.length) % cards.length;
          break;
        case "d":
          newIndex = (newIndex + 1) % cards.length;
          break;
        default:
          break;
      }
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
          newCards[firstCardIndex].matchedBy = turn;
          newCards[secondCardIndex].matchedBy = turn;

          setMatchedCards([
            ...matchedCards,
            newCards[firstCardIndex],
            newCards[secondCardIndex],
          ]);
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
    if (matchedCards.length === 22) {
      setWinner((scores[0] > scores[1] ? players[0][0] : players[1][0]).name);
    }
  }, [matchedCards, scores, players]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeCardIndex, canFlip]);

  if (!players || players.length === 0) return null;
  return (
    <div className="flex flex-col items-center justify-between h-full">
      <h1>Kraken's Recall</h1>
      <div className="grid grid-cols-[10%,1fr,10%] gap-4 w-full">
        <div className="translate-x-6">
          <MatchedCards cards={matchedCards.filter((c) => c.matchedBy === 0)} />
        </div>
        {winner ? (
          <Winner>
            {winner}'s recall
            <br />
            be tighter than the Kraken’s grip!!
          </Winner>
        ) : (
          <div className="grid h-[60vh] justify-center grid-cols-6 gap-2 m-auto justify-items-center">
            {cards.map((card, index) => (
              <Card
                key={card.id}
                index={index}
                {...card}
                isMatched={card.matchedBy === 0 || card.matchedBy === 1}
                onClick={() => handleCardClick(card.id)}
                isActive={index === activeCardIndex}
                onHover={() => setActiveCardIndex(index)}
                borderColor={
                  turn === 0 ? "ocean-blue-border" : "rusty-red-border"
                }
                canFlip={canFlip}
              />
            ))}
          </div>
        )}
        <div className="-translate-x-8">
          <MatchedCards
            isRight={true}
            cards={matchedCards.filter((c) => c.matchedBy === 1)}
          />
        </div>
      </div>
      <div className="grid grid-cols-[15%,1fr,15%] gap-4 w-full">
        <div />
        <div className="flex items-end justify-between w-full gap-2">
          {players[0].length !== 0 &&
            (!winner || players[0][0].name === winner) && (
              <Score
                players={players[0]}
                score={scores[0]}
                isActive={
                  turn === 0 && (!winner || players[0][0].name === winner)
                }
              />
            )}
          {players[1].length !== 0 &&
            (!winner || players[1][0].name === winner) && (
              <Score
                players={players[1]}
                score={scores[1]}
                isActive={turn === 1 && !winner}
                isRight={true}
              />
            )}
        </div>
        <div />
      </div>
    </div>
  );
};
