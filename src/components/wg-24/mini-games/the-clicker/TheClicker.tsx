import { Button } from "@/components/wg-24/ui/button";
import { useState, useEffect } from "react";
import { IScore } from "../Score";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/wg-24/ui/badge";

const getRandomPosition = () => {
  const isTopHalf = Math.random() > 0.5;
  const isLeftHalf = Math.random() > 0.5;
  const top = isTopHalf ? "top-16" : "bottom-16";
  const left = isLeftHalf ? "left-16" : "right-16";
  return `${top} ${left}`;
};

const getButtonColor = (multiplier: number) => {
  if (multiplier === 5) return "bg-red-500 hover:bg-red-600";
  if (multiplier === 3) return "bg-teal-500 hover:bg-teal-600";
  if (multiplier === 2) return "bg-blue-500 hover:bg-blue-600";
  return "bg-gray-600 hover:bg-gray-700";
};

type GameState = "ready" | "active" | "finished" | "exit";
type Multiplier = "x2" | "x3" | "x5" | undefined;

interface TheClickerProps {
  player: string;
  initialTime?: number;
  onGameComplete: (playerScores: IScore[]) => void;
}

export const TheClicker = ({
  player,
  initialTime = 3000,
  onGameComplete,
}: TheClickerProps) => {
  const [gameState, setGameState] = useState<GameState>("ready");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [multiplier, setMultiplier] = useState(1);
  const [showTimeBonus, setShowTimeBonus] = useState(false);
  const [showMultiplier, setShowMultiplier] = useState<Multiplier>(undefined);
  const [secondaryButtonPosition, setSecondaryButtonPosition] = useState(
    getRandomPosition()
  );

  const startGame = () => {
    setGameState("active");
    setScore(0);
    setMultiplier(1);
    setTimeLeft(initialTime);
  };

  const handleClick = () => {
    setScore((prev) => prev + 1 * multiplier);
  };

  const handleBonusClick = () => {
    setTimeLeft((prev) => prev + 300);
    setSecondaryButtonPosition(getRandomPosition());
    setShowTimeBonus(false);
  };

  const handleMultiplierClick = (value: number) => {
    setMultiplier(value);
    setSecondaryButtonPosition(getRandomPosition());
    setShowMultiplier(undefined);
    setTimeout(() => setMultiplier(1), 5000); // Reset multiplier after 5 seconds
  };

  useEffect(() => {
    if (gameState === "ready") return;
    if (timeLeft === 0) {
      setGameState("finished");
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(prev - 1, 0));
    }, 10);

    const showRandomMultiplier =
      Math.random() < 0.02 && multiplier === 1 && showTimeBonus;
    const showRandomTimebonus =
      Math.random() < 0.002 &&
      multiplier === 1 &&
      !showMultiplier &&
      !showTimeBonus &&
      !showRandomMultiplier;
    const random = Math.random();
    if (showRandomTimebonus) setShowTimeBonus(true); // Randomly show bonus button
    if (showRandomMultiplier && random > 0.7) {
      setShowMultiplier("x5");
    }
    if (showRandomMultiplier && random > 0.3 && random < 0.7) {
      setShowMultiplier("x3");
    }
    if (showRandomMultiplier && random < 0.3) {
      setShowMultiplier("x2");
    }

    return () => clearInterval(timer);
  }, [timeLeft, gameState, showMultiplier, showTimeBonus]);

  const hasTime = timeLeft > 0;
  const showX2 = hasTime && showMultiplier === "x2";
  const showX3 = hasTime && showMultiplier === "x3";
  const showX5 = hasTime && showMultiplier === "x5";
  const showPlus5 = hasTime && showTimeBonus;

  return (
    <div className="flex flex-col p-4">
      <h2 className="text-2xl font-bold">The Clicker</h2>
      <Badge className="bg-pink-500 hover:bg-pink-600 w-fit">{player}</Badge>
      <p
        className="w-56 px-10 py-5 m-auto text-4xl text-white transition-transform duration-100 ease-out transform bg-black border border-white rounded-full"
        style={{
          transform:
            timeLeft < 2000
              ? `scale(${1 + Math.sin(timeLeft / 100) * 0.05})`
              : "",
          color: timeLeft < 1000 ? "red" : "white",
        }}
      >
        {`${String(Math.floor(timeLeft / 6000)).padStart(2, "0")}:${String(
          Math.floor((timeLeft % 6000) / 100)
        ).padStart(2, "0")}:${String(timeLeft % 100).padStart(2, "0")}`}
      </p>

      <div className="relative flex w-full max-h-[70vh] max-w-[70vh] mt-6 aspect-square bg-gray-500 rounded-xl items-center justify-center">
        {gameState === "ready" && (
          <Button
            className="p-10 text-4xl text-white bg-blue-500 rounded-full outline-none hover:bg-blue-600"
            onClick={startGame}
          >
            Click it, {player}!
          </Button>
        )}
        {(gameState === "active" || gameState === "finished") && (
          <Button
            disabled={gameState === "finished"}
            className={cn(
              "p-10 text-4xl text-white  rounded-full outline-none",
              getButtonColor(multiplier)
            )}
            onClick={handleClick}
          >
            {score}
            {multiplier === 1 ? "" : ` x${multiplier}`}
          </Button>
        )}
        {gameState === "active" && (
          <>
            {showX2 && (
              <Button
                className={cn("absolute bg-blue-400", secondaryButtonPosition)}
                onClick={() => handleMultiplierClick(2)}
              >
                x2
              </Button>
            )}
            {showX3 && (
              <Button
                className={cn("absolute bg-teal-500", secondaryButtonPosition)}
                onClick={() => handleMultiplierClick(3)}
              >
                x3
              </Button>
            )}
            {showX5 && (
              <Button
                className={cn("absolute bg-red-600", secondaryButtonPosition)}
                onClick={() => handleMultiplierClick(5)}
              >
                x5
              </Button>
            )}
            {showPlus5 && (
              <Button
                className={cn(
                  "absolute bg-yellow-400",
                  secondaryButtonPosition
                )}
                onClick={handleBonusClick}
              >
                +3s
              </Button>
            )}
          </>
        )}
      </div>
      {gameState === "finished" && (
        <Button
          className="p-10 m-auto mt-6 text-4xl text-white bg-green-500 rounded-full hover:bg-green-600"
          onClick={() => {
            onGameComplete([{ score, player }]);
          }}
        >
          Complete
        </Button>
      )}
    </div>
  );
};
