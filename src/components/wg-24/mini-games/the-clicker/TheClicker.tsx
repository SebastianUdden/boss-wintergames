import { Button } from "@/components/wg-24/ui/button";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Scores } from "../Scores";
import { provideScoresOnWinner } from "../Winner";
import { IMiniGameBase } from "../MiniGame";
import { ClickTimer } from "./ClickTimer";
import { GameState } from "../gameState";
import { ClickButton } from "./ClickButton";

const getRandomPosition = () => {
  const isTopHalf = Math.random() > 0.5;
  const isLeftHalf = Math.random() > 0.5;
  const top = isTopHalf ? "top-16" : "bottom-16";
  const left = isLeftHalf ? "left-16" : "right-16";
  return `${top} ${left}`;
};

type Multiplier = "x2" | "x3" | "x5" | undefined;

interface TheClickerProps extends IMiniGameBase {
  initialTime?: number;
}

export const TheClicker = ({
  players,
  initialTime = 3000,
  onGameComplete,
}: TheClickerProps) => {
  const [turn, setTurn] = useState<0 | 1>(0);
  const [gameState, setGameState] = useState<GameState>("ready");
  const [winner, setWinner] = useState<string | undefined>(); // Track the winner
  const [p1Score, setP1Score] = useState(0);
  const [p2Score, setP2Score] = useState(0);
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [multiplier, setMultiplier] = useState(1);
  const [showTimeBonus, setShowTimeBonus] = useState(false);
  const [showMultiplier, setShowMultiplier] = useState<Multiplier>(undefined);
  const [secondaryButtonPosition, setSecondaryButtonPosition] = useState(
    getRandomPosition()
  );

  const startGame = () => {
    setGameState("active");
    setMultiplier(1);
    setTimeLeft(initialTime);
  };

  const handleClick = () => {
    if (turn === 0) {
      setP1Score((prev) => prev + 1 * multiplier);
    } else {
      setP2Score((prev) => prev + 1 * multiplier);
    }
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
    setTimeout(() => setMultiplier(1), 5000);
  };

  useEffect(() => {
    if (gameState === "ready") return;
    if (gameState === "active") {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = ""; // Re-enable scrolling
    }
    if (turn === 0 && timeLeft === 0) {
      setGameState("next");
      setTurn(1);
      setTimeout(() => {
        setGameState("ready");
      }, 3000);
    } else if (gameState !== "next" && turn === 1 && timeLeft === 0) {
      const winnerIndex = p1Score > p2Score ? 0 : 1;
      setWinner(players[winnerIndex][0].name);
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

    return () => {
      clearInterval(timer);
      document.body.style.overflow = "";
    };
  }, [timeLeft, gameState, turn, showMultiplier, showTimeBonus]);

  useEffect(() => {
    provideScoresOnWinner({ onGameComplete, players, winner });
  }, [winner, players]);

  const hasTime = timeLeft > 0;
  const showX2 = hasTime && showMultiplier === "x2";
  const showX3 = hasTime && showMultiplier === "x3";
  const showX5 = hasTime && showMultiplier === "x5";
  const showPlus5 = hasTime && showTimeBonus;

  return (
    <div className="flex flex-col items-center justify-start h-full">
      <h1 className="mb-2">Finger Walz</h1>

      <div className="relative flex flex-col w-full h-full max-h-[70vh] max-w-[70vh] mt-6 bg-gray-800 rounded-xl items-center justify-center gap-6">
        <ClickTimer timeLeft={timeLeft} />
        {(gameState === "ready" || gameState === "next") && (
          <Button
            className="p-10 text-3xl text-white bg-blue-500 rounded-full outline-none select-none hover:bg-blue-600"
            onClick={startGame}
            disabled={gameState === "next"}
          >
            {players[turn][0].name}, ye may begin{" "}
            {gameState === "next" ? "shortly" : ""}!
          </Button>
        )}
        {(gameState === "active" || gameState === "finished") && (
          <ClickButton
            handleClick={handleClick}
            gameState={gameState}
            multiplier={multiplier}
            p1Score={p1Score}
            p2Score={p2Score}
            turn={turn}
          />
        )}
        {gameState === "finished" && winner && (
          <p className="absolute text-3xl text-center select-none bottom-28">
            {winner} triumphed
            <br />
            over the waves o’ time
            <br />
            and sunk yer scallywag foe!
            <br /> The sea sings yer name!
          </p>
        )}
        {gameState === "active" && (
          <>
            {showX2 && (
              <Button
                className={cn(
                  "absolute bg-blue-400 text-3xl select-none",
                  secondaryButtonPosition
                )}
                onClick={() => handleMultiplierClick(2)}
              >
                x2
              </Button>
            )}
            {showX3 && (
              <Button
                className={cn(
                  "absolute bg-teal-500 text-3xl select-none",
                  secondaryButtonPosition
                )}
                onClick={() => handleMultiplierClick(3)}
              >
                x3
              </Button>
            )}
            {showX5 && (
              <Button
                className={cn(
                  "absolute bg-red-600 text-3xl select-none",
                  secondaryButtonPosition
                )}
                onClick={() => handleMultiplierClick(5)}
              >
                x5
              </Button>
            )}
            {showPlus5 && (
              <Button
                className={cn(
                  "absolute bg-yellow-600 text-3xl select-none",
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
      <div className="w-full mt-4">
        <Scores
          players={players}
          scores={[p1Score, p2Score]}
          turn={turn}
          winner={winner}
        />
      </div>
    </div>
  );
};
