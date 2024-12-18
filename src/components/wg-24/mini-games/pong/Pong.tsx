import { Button } from "@/components/wg-24/ui/button";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { IMiniGameBase } from "../MiniGame";
import { Scores } from "../Scores";
import { Plank } from "./Plank";
import { usePaddleControls } from "./usePaddleControls";
import { resetBall, useGameLoop } from "./useGameLoop";
import { Ball } from "./Ball";

export const REFERENCE_WIDTH = 500; // Standard width for normal speed
export const HORIZONTAL_SPEED = 4;
export const VERTICAL_SPEED = 3;
export const INITIAL_PADDLE_HEIGHT = 200;

type GameState = "ready" | "active" | "finished";

export const Pong = ({ players, onGameComplete }: IMiniGameBase) => {
  const [gameState, setGameState] = useState<GameState>("ready");
  const [showScore] = useState<string | undefined>();
  const [winner, setWinner] = useState("");
  const [scores, setScores] = useState([0, 0]);
  const [message, setMessage] = useState("Ready your cannons!");

  // Refs for paddles and ball positions
  const player1PaddleRef = useRef<HTMLDivElement>(null);
  const player2PaddleRef = useRef<HTMLDivElement>(null);
  const ballRef = useRef<HTMLDivElement>(null);
  const gameBoxRef = useRef<HTMLDivElement>(null);
  const ballSpeed = useRef({ x: HORIZONTAL_SPEED, y: VERTICAL_SPEED });

  const resetBall = () => {
    if (ballRef.current && gameBoxRef.current) {
      const gameBox = gameBoxRef.current.getBoundingClientRect();
      const widthRatio = gameBox.width / REFERENCE_WIDTH;

      ballRef.current.style.left = "50%";
      ballRef.current.style.top = "50%";
      ballSpeed.current = {
        x: 0,
        y: 0,
      };
      setTimeout(() => {
        ballSpeed.current = {
          x:
            (Math.random() > 0.5 ? HORIZONTAL_SPEED : -HORIZONTAL_SPEED) *
            widthRatio,
          y: Math.random() > 0.5 ? VERTICAL_SPEED : -VERTICAL_SPEED,
        };
      }, 2000);
    }
  };

  // Track paddle sizes
  const { keys, player1PaddleHeight, player2PaddleHeight, resetPaddleHeights } =
    usePaddleControls({
      gameState,
      gameBoxRef,
      initialPaddleHeight: INITIAL_PADDLE_HEIGHT,
    });

  const { t1Score, t2Score, cannonBalls, p1Charges, p2Charges } = useGameLoop({
    gameState,
    gameBoxRef,
    player1PaddleRef,
    player2PaddleRef,
    ballRef,
    ballSpeed,
    resetBall,
    keys,
  });

  useEffect(() => {
    if (cannonBalls.length > 0) {
      // console.log("GameBox:", gameBoxRef.current?.getBoundingClientRect());
      // console.log("CannonBalls:", cannonBalls);
    }
  }, [cannonBalls]);

  useEffect(() => {
    if (scores.some((s) => s > 3)) {
      setGameState("finished");
    }
  }, [scores]);

  const startGame = () => {
    setGameState("active");
    setMessage("The scourge of the seas has been sighted, fire true!");
    if (
      player1PaddleRef.current &&
      player2PaddleRef.current &&
      gameBoxRef.current
    ) {
      const gameBox = gameBoxRef.current.getBoundingClientRect();
      player1PaddleRef.current.style.top = `${
        gameBox.height - INITIAL_PADDLE_HEIGHT
      }px`;
      player2PaddleRef.current.style.top = `${
        gameBox.height - INITIAL_PADDLE_HEIGHT
      }px`;
    }
    resetBall();
  };

  const endGame = () => {
    setGameState("finished");
    setMessage("Game Over!");
    // onGameComplete(
    //   scores.map((s, i) => ({ score: s * 1000, player: players[i] }))
    // );
  };

  return (
    <div className="flex flex-col justify-between h-full p-4 bg-gray-800 rounded-lg">
      <div className="flex flex-col">
        <h1 className="mb-2">Cannons</h1>
        <p className="mb-2 text-lg">{message}</p>
        <div className="">
          {gameState === "ready" && (
            <Button
              className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-500"
              onClick={startGame}
            >
              Start Game
            </Button>
          )}
        </div>
      </div>
      <div
        ref={gameBoxRef}
        className="relative w-full mt-4 overflow-hidden bg-black h-1/2"
        style={{
          backgroundImage: `
          linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
          url('/games/cannons/ocean-stock.webp')
        `,
          backgroundSize: "cover", // Ensures the image covers the entire container
          backgroundPosition: "center", // Centers the image
          backgroundRepeat: "no-repeat", // Prevents tiling
          backgroundColor: "black", // Fallback color
        }}
      >
        {/* Player 1 Paddle */}
        <Plank
          ref={player1PaddleRef}
          paddleHeight={player1PaddleHeight}
          charges={p1Charges}
        />

        {/* Player 2 Paddle */}
        <Plank
          ref={player2PaddleRef}
          paddleHeight={player2PaddleHeight}
          position="right"
          charges={p2Charges}
        />

        <Ball
          ref={ballRef}
          showScore={false}
          gameState="active"
          overlayImage="/games/cannons/baby-kraken.png"
        />
        {cannonBalls.map((ball, index) => (
          <img
            key={index}
            src="/games/cannons/cannon-ball.png"
            className="absolute rounded-full"
            style={{
              width: "12px",
              height: "12px",
              left: `${ball.x}px`,
              top: `${ball.y}px`,
              transform: "translate(-50%, -30%)",
              zIndex: 99,
            }}
          />
        ))}

        {/* Score */}
        {showScore && (
          <p
            className={cn(
              "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl",
              showScore
            )}
          >
            Score!
          </p>
        )}
      </div>
      <div>
        <p>Player 1 Charges: {5 - p1Charges} / 5</p>
        <p>Player 2 Charges: {5 - p2Charges} / 5</p>
      </div>

      {gameState === "finished" && (
        <Button
          className="mt-4 bg-green-700 hover:bg-green-500"
          onClick={endGame}
        >
          Complete
        </Button>
      )}
      <div className="w-full mt-4">
        <Scores players={players} scores={[t1Score, t2Score]} winner={winner} />
      </div>
    </div>
  );
};
